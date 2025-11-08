#!/bin/bash

echo "🚀 Starting MERN Testing Application Deployment..."

# Check if all required environment variables are set
if [ -z "$NODE_ENV" ]; then
    echo "❌ NODE_ENV is not set"
    exit 1
fi

echo "📦 Installing dependencies..."
npm run install-all

echo "🧪 Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed! Deployment aborted."
    exit 1
fi

echo "🏗️ Building client..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Client build failed!"
    exit 1
fi
cd ..

echo "🔒 Setting file permissions..."
chmod -R 755 client/build
chmod +x scripts/*.sh

echo "✅ Deployment preparation completed!"
echo "📊 Test Coverage:"
echo "   - Server: Check coverage/server/index.html"
echo "   - Client: Check coverage/client/index.html"