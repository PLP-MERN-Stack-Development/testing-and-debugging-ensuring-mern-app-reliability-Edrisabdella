import postController from '../../../src/controllers/postController.js';
import Post from '../../../src/models/Post.js';
import User from '../../../src/models/User.js';

// Mock dependencies
jest.mock('../../../src/models/Post');
jest.mock('../../../src/models/User');

describe('Post Controller - Unit Tests', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
      query: {},
      body: {},
      user: { id: 'user123' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return paginated posts', async () => {
      const mockPosts = [
        { _id: '1', title: 'Test Post 1', author: 'user123' },
        { _id: '2', title: 'Test Post 2', author: 'user123' }
      ];

      Post.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockPosts)
      });

      Post.countDocuments.mockResolvedValue(2);

      mockReq.query = { page: 1, limit: 10 };

      await postController.getPosts(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        total: 2,
        page: 1,
        pages: 1,
        data: mockPosts
      });
    });

    it('should filter posts by search query', async () => {
      Post.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([])
      });

      Post.countDocuments.mockResolvedValue(0);

      mockReq.query = { search: 'javascript' };

      await postController.getPosts(mockReq, mockRes, mockNext);

      expect(Post.find).toHaveBeenCalledWith({
        isPublished: true,
        $or: [
          { title: { $regex: 'javascript', $options: 'i' } },
          { content: { $regex: 'javascript', $options: 'i' } }
        ]
      });
    });
  });

  describe('createPost', () => {
    it('should create a new post successfully', async () => {
      const mockPostData = {
        title: 'New Post',
        content: 'Post content',
        category: 'cat123',
        tags: ['tech', 'programming']
      };

      const mockCreatedPost = {
        _id: 'newPost123',
        ...mockPostData,
        author: 'user123',
        populate: jest.fn().mockResolvedValue({
          _id: 'newPost123',
          ...mockPostData,
          author: { username: 'testuser', email: 'test@example.com' }
        })
      };

      Post.create.mockResolvedValue(mockCreatedPost);
      mockReq.body = mockPostData;

      await postController.createPost(mockReq, mockRes, mockNext);

      expect(Post.create).toHaveBeenCalledWith({
        ...mockPostData,
        author: 'user123'
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should handle validation errors', async () => {
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      
      Post.create.mockRejectedValue(validationError);

      mockReq.body = { title: '' }; // Invalid data

      await postController.createPost(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(validationError);
    });
  });
});