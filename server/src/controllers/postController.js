import Post from '../models/Post.js';
import User from '../models/User.js';

// Utility function for handling async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    author,
    search,
    tags
  } = req.query;

  // Build query
  let query = { isPublished: true };
  
  if (category) query.category = category;
  if (author) query.author = author;
  if (tags) query.tags = { $in: tags.split(',') };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  // Execute query with pagination
  const posts = await Post.find(query)
    .populate('author', 'username email')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  // Get total count for pagination
  const total = await Post.countDocuments(query);

  res.status(200).json({
    success: true,
    count: posts.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: posts
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username email')
    .populate('category', 'name');

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  // Increment views
  post.views += 1;
  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags, excerpt, featuredImage } = req.body;

  // Create post
  const post = await Post.create({
    title,
    content,
    category,
    tags,
    excerpt,
    featuredImage,
    author: req.user.id
  });

  // Populate author info
  await post.populate('author', 'username email');

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: post
  });
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  // Check ownership
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this post'
    });
  }

  post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('author', 'username email');

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: post
  });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found'
    });
  }

  // Check ownership
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this post'
    });
  }

  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully'
  });
});