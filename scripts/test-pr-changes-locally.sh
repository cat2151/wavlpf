#!/bin/bash

# Test PR changes locally - Full orchestration script
# This script builds the application, starts a server, and captures screenshots
# to verify layout changes before deployment

set -e

echo "🚀 Starting local PR verification workflow..."
echo ""

# Configuration
PORT=8082
WAIT_FOR_SERVER=5
SCREENSHOT_OUTPUT="/tmp/pr-verification-screenshot.png"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Cleanup function
cleanup() {
    echo ""
    echo "🧹 Cleaning up..."
    if [ ! -z "$SERVER_PID" ]; then
        echo "  Stopping server (PID: $SERVER_PID)..."
        kill $SERVER_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT

# Step 1: Install wasm-pack if needed
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Step 1: Installing wasm-pack"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
./scripts/install-wasm-pack.sh
echo ""

# Step 2: Install npm dependencies
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Step 2: Installing npm dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install
echo ""

# Step 3: Build the application
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔨 Step 3: Building application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run build
echo ""

# Step 4: Start preview server in background
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Step 4: Starting preview server on port $PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npx vite preview --port $PORT --host 127.0.0.1 > /tmp/server.log 2>&1 &
SERVER_PID=$!
echo "  Server started with PID: $SERVER_PID"
echo "  Waiting ${WAIT_FOR_SERVER}s for server to initialize..."
sleep $WAIT_FOR_SERVER

# Check if server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${RED}❌ Server failed to start. Check /tmp/server.log for details${NC}"
    cat /tmp/server.log
    exit 1
fi

# Verify server is responding
if ! curl -s http://localhost:$PORT/ > /dev/null; then
    echo -e "${RED}❌ Server is not responding on http://localhost:$PORT/${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Server is running and responding${NC}"
echo ""

# Step 5: Install Playwright if needed
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎭 Step 5: Setting up Playwright"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ! npm list playwright > /dev/null 2>&1; then
    echo "  Installing Playwright..."
    npm install --save-dev playwright
fi

if ! npx playwright --version > /dev/null 2>&1; then
    echo "  Installing Chromium browser..."
    npx playwright install chromium
fi
echo -e "${GREEN}✅ Playwright ready${NC}"
echo ""

# Step 6: Take screenshot
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📸 Step 6: Capturing screenshot"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create screenshot script
cat > /tmp/capture-screenshot.js << 'EOFJS'
const { chromium } = require('playwright');

(async () => {
  const port = process.argv[2] || '8082';
  const outputPath = process.argv[3] || '/tmp/pr-verification-screenshot.png';
  
  console.log(`  Connecting to http://localhost:${port}/`);
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    // Navigate to the page
    await page.goto(`http://localhost:${port}/`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('  ✓ Page loaded');
    
    // Wait for initialization
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    console.log('  ✓ Page initialized');
    
    // Click to start the application
    await page.click('body');
    console.log('  ✓ Application started (clicked)');
    
    // Wait for oscilloscope to render
    await page.waitForTimeout(3000);
    console.log('  ✓ Oscilloscope rendering complete');
    
    // Take screenshot
    await page.screenshot({ 
      path: outputPath,
      fullPage: false
    });
    console.log(`  ✓ Screenshot saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('  ✗ Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
EOFJS

# Run the screenshot script
node /tmp/capture-screenshot.js $PORT $SCREENSHOT_OUTPUT
echo ""

# Step 7: Results
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Verification Complete"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ All steps completed successfully!${NC}"
echo ""
echo "📸 Screenshot location: $SCREENSHOT_OUTPUT"
echo ""
if [ -f "$SCREENSHOT_OUTPUT" ]; then
    SIZE=$(du -h "$SCREENSHOT_OUTPUT" | cut -f1)
    echo "   File size: $SIZE"
    echo "   To view: open $SCREENSHOT_OUTPUT"
else
    echo -e "${RED}   Warning: Screenshot file not found${NC}"
fi
echo ""
echo "🌐 Local server URL: http://localhost:$PORT/"
echo "📋 Server logs: /tmp/server.log"
echo ""
echo "Note: Server will be stopped automatically when script exits"
echo ""
