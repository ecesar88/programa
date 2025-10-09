#!/bin/bash

# Menu GraphQL Server Startup Script

echo "🚀 Starting Menu GraphQL Server with Rocket..."
echo "📊 GraphiQL will be available at: http://localhost:8000"
echo "🔍 GraphQL endpoint: http://localhost:8000/graphql"
echo "🏥 Health check: http://localhost:8000/health"
echo ""

# Set environment variables
export ROCKET_ENV=development
export ROCKET_ADDRESS=0.0.0.0
export ROCKET_PORT=8000

# Build and run the server
cargo run --bin server

echo "Server stopped."
