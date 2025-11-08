import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts?page=${currentPage}&limit=6`);
      setPosts(response.data.data);
      setTotalPages(response.data.pages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchPosts();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="post-list">
        <div className="post-list-header">
          <h2>Latest Posts</h2>
          <div className="post-count">
            Showing {posts.length} posts
          </div>
        </div>

        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts">
            <h3>No posts found</h3>
            <p>Be the first to create a post!</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="pagination-btn"
            >
              Previous
            </button>
            
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default PostList;