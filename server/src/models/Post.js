import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [10, 'Content must be at least 10 characters long'],
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  featuredImage: String,
  excerpt: String
}, {
  timestamps: true
});

// Indexes for better query performance
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ tags: 1 });
postSchema.index({ isPublished: 1 });

// Virtual for formatted date
postSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Middleware to generate slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

export default mongoose.model('Post', postSchema);