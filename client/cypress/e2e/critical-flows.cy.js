describe('Critical User Flows - E2E Tests', () => {
  beforeEach(() => {
    // Start from the home page for each test
    cy.visit('http://localhost:3000');
  });

  describe('Navigation and Basic UI', () => {
    it('should load the home page successfully', () => {
      cy.contains('Latest Posts').should('be.visible');
      cy.get('nav').should('exist');
      cy.get('footer').should('exist');
    });

    it('should navigate between pages', () => {
      cy.get('nav a').contains('Posts').click();
      cy.url().should('include', '/posts');
      cy.contains('All Posts').should('be.visible');

      cy.get('nav a').contains('Home').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });

  describe('Post Management', () => {
    it('should display posts list', () => {
      cy.intercept('GET', '/api/posts*').as('getPosts');
      
      cy.visit('/posts');
      cy.wait('@getPosts');
      
      cy.get('.post-card').should('have.length.at.least', 1);
      cy.get('.post-card .post-title').first().should('be.visible');
    });

    it('should handle post creation flow', () => {
      // Login first
      cy.login('test@example.com', 'password123');

      cy.visit('/create-post');
      
      cy.get('input[name="title"]').type('Cypress Test Post');
      cy.get('textarea[name="content"]').type('This is a test post created by Cypress E2E testing.');
      cy.get('select[name="category"]').select('technology');
      cy.get('input[name="tags"]').type('cypress,testing,e2e');
      
      cy.get('button[type="submit"]').click();
      
      // Verify success
      cy.contains('Post created successfully').should('be.visible');
      cy.url().should('include', '/posts/');
      cy.contains('Cypress Test Post').should('be.visible');
    });

    it('should handle post editing flow', () => {
      cy.login('test@example.com', 'password123');
      
      // Go to user's posts
      cy.visit('/my-posts');
      cy.get('.post-card').first().click();
      cy.get('button').contains('Edit').click();
      
      // Update post
      cy.get('input[name="title"]').clear().type('Updated Title - Cypress Test');
      cy.get('button[type="submit"]').click();
      
      // Verify update
      cy.contains('Post updated successfully').should('be.visible');
      cy.contains('Updated Title - Cypress Test').should('be.visible');
    });
  });

  describe('Error Handling', () => {
    it('should display error for invalid routes', () => {
      cy.visit('/non-existent-route');
      cy.contains('Page Not Found').should('be.visible');
      cy.contains('Home').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });

    it('should handle API errors gracefully', () => {
      // Intercept and mock API failure
      cy.intercept('GET', '/api/posts*', {
        statusCode: 500,
        body: { message: 'Internal Server Error' }
      }).as('getPostsError');

      cy.visit('/posts');
      
      cy.contains('Failed to fetch posts').should('be.visible');
      cy.contains('Try Again').should('be.visible');
    });

    it('should display network error when offline', () => {
      cy.intercept('GET', '/api/posts*', { forceNetworkError: true }).as('getPostsOffline');
      
      cy.visit('/posts');
      
      cy.contains('Network Error').should('be.visible');
      cy.contains('retry').click();
      
      // Should attempt reload
      cy.url().should('include', '/posts');
    });
  });

  describe('Authentication Flows', () => {
    it('should allow user registration', () => {
      const timestamp = Date.now();
      const testEmail = `test${timestamp}@example.com`;
      
      cy.visit('/register');
      
      cy.get('input[name="username"]').type(`testuser${timestamp}`);
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Registration successful').should('be.visible');
      cy.url().should('include', '/dashboard');
    });

    it('should allow user login and logout', () => {
      cy.visit('/login');
      
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Welcome back').should('be.visible');
      cy.url().should('include', '/dashboard');
      
      // Logout
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });

    it('should show error for invalid login', () => {
      cy.visit('/login');
      
      cy.get('input[name="email"]').type('wrong@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Invalid credentials').should('be.visible');
    });
  });

  describe('Performance and UX', () => {
    it('should load pages within performance budget', () => {
      cy.visit('/');
      cy.lighthouse({
        performance: 80,
        accessibility: 90,
        'best-practices': 85,
        seo: 85,
        pwa: 70
      });
    });

    it('should be mobile responsive', () => {
      cy.viewport('iphone-6');
      cy.visit('/');
      
      cy.get('nav').should('be.visible');
      cy.get('.post-card').should('be.visible');
      
      // Check hamburger menu on mobile
      cy.get('.mobile-menu-button').click();
      cy.get('.mobile-menu').should('be.visible');
    });
  });
});