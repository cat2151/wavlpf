const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch({
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://cat2151.github.io/wavlpf/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: '/tmp/github-pages-screenshot.png',
      fullPage: false
    });
    
    console.log('Screenshot saved to /tmp/github-pages-screenshot.png');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
