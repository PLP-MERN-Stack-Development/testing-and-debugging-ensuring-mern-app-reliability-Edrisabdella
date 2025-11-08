import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../src/server.js';
import Post from '../../../src/models/Post.js';
import User from '../../../src/models/User.js';
import { generateToken } from '../../../src/utils/auth.js';

let mongoServer;
let authToken;
let testUser;
let testPost;

// Test data
const testUserData = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

const testPostData = {
  title: 'Integration Test Post',
  content: 'This is a test post for integration testing',
  category: new mongoose.Types.ObjectId().toString()
};

describe('Posts API - Integration Tests', () => {
  beforeAll(async () => {
    // Start in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test user
    testUser = await User.create(testUserData);
    authToken = generateToken(testUser);

    // Create test post
    testPost = await Post.create({
      ...testPostData,
      author: testUser._id,
      slug: 'integration-test-post'
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clean up posts before each test (keep users)
    await Post.deleteMany({ _id: { $ne: testPost._id } });
  });

  describe('GET /api/posts', () => {
    it('should return all published posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should paginate results correctly', async () => {
      // Create multiple posts for pagination test
      const posts = [];
      for (let i = 0; i < 15; i++) {
        posts.push({
          title: `Pagination Post ${i}`,
          content: `Content ${i}`,
          author: testUser._id,
          category: new mongoose.Types.ObjectId(),
          slug: `pagination-post-${i}`,
          isPublished: true
        });
      }
      await Post.insertMany(posts);

      const response = await request(app)
        .get('/api/posts?page=2&limit=5')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.page).toBe(2);
      expect(response.body.limit).toBe(5);
      expect(response.body.data.length).toBe(5);
    });

    it('should filter posts by search query', async () => {
      await Post.create({
        title: 'JavaScript Tutorial',
        content: 'Learn JavaScript programming',
        author: testUser._id,
        category: new mongoose.Types.ObjectId(),
        slug: 'js-tutorial',
        isPublished: true
      });

      const response = await request(app)
        .get('/api/posts?search=javascript')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data[0].title).toContain('JavaScript');
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should return a single post by ID', async () => {
      const response = await request(app)
        .get(`/api/posts/${testPost._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(testPost._id.toString());
      expect(response.body.data.title).toBe(testPostData.title);
    });

    it('should return 404 for non-existent post', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .get(`/api/posts/${nonExistentId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Post not found');
    });

    it('should increment views when post is retrieved', async () => {
      const initialViews = testPost.views;
      
      await request(app)
        .get(`/api/posts/${testPost._id}`)
        .expect(200);

      const updatedPost = await Post.findById(testPost._id);
      expect(updatedPost.views).toBe(initialViews + 1);
    });
  });

  describe('POST /api/posts', () => {
    it('should create a new post with valid authentication', async () => {
      const newPost = {
        title: 'New Integration Test Post',
        content: 'This is a new post created via integration test',
        category: new mongoose.Types.ObjectId().toString(),
        tags: ['integration', 'testing']
      };

      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newPost)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(newPost.title);
      expect(response.body.data.author).toBe(testUser._id.toString());
      expect(response.body.data.tags).toEqual(newPost.tags);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send(testPostData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid post data', async () => {
      const invalidPost = {
        title: '', // Empty title should fail validation
        content: 'Some content'
      };

      const response = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidPost)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update post when authenticated as author', async () => {
      const updates = {
        title: 'Updated Post Title',
        content: 'Updated content for integration test'
      };

      const response = await request(app)
        .put(`/api/posts/${testPost._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updates.title);
      expect(response.body.data.content).toBe(updates.content);
    });

    it('should return 403 when non-author tries to update', async () => {
      // Create another user
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@example.com',
        password: 'password123'
      });
      const otherToken = generateToken(otherUser);

      const response = await request(app)
        .put(`/api/posts/${testPost._id}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({ title: 'Unauthorized Update' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should delete post when authenticated as author', async () => {
      // Create a post to delete
      const postToDelete = await Post.create({
        title: 'Post to Delete',
        content: 'This post will be deleted',
        author: testUser._id,
        category: new mongoose.Types.ObjectId(),
        slug: 'post-to-delete'
      });

      const response = await request(app)
        .delete(`/api/posts/${postToDelete._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify post is actually deleted
      const deletedPost = await Post.findById(postToDelete._id);
      expect(deletedPost).toBeNull();
    });
  });
});