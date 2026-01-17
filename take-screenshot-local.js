const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch({
    args: ['--disable-web-security']
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  
  try {
    await page.goto('http://localhost:8081/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: '/tmp/fixed-layout-screenshot.png',
      fullPage: false
    });
    
    console.log('Screenshot saved to /tmp/fixed-layout-screenshot.png');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
