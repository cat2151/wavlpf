#!/usr/bin/env node

/**
 * Investigate which resource is failing with 404 on GitHub Pages
 */

const { chromium } = require('playwright');

const DEFAULT_URL = 'https://cat2151.github.io/wavlpf/';

async function investigate404(url) {
  console.log(`\n🔍 Investigating 404 errors on: ${url}\n`);
  
  let browser;
  
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
    });
    const page = await browser.newPage({ ignoreHTTPSErrors: true });
    
    const failedRequests = [];
    const allRequests = [];
    
    page.on('request', request => {
      allRequests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType()
      });
    });
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure()
      });
    });
    
    page.on('response', response => {
      if (response.status() === 404) {
        console.log(`❌ 404 Not Found: ${response.url()}`);
        failedRequests.push({
          url: response.url(),
          status: 404
        });
      }
    });
    
    console.log('Loading page...');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    
    console.log('Clicking to trigger audio...');
    await page.click('body');
    
    console.log('Waiting for requests to complete...');
    await page.waitForTimeout(3000);
    
    console.log('\n' + '='.repeat(80));
    console.log('FAILED REQUESTS:');
    console.log('='.repeat(80));
    
    if (failedRequests.length === 0) {
      console.log('No failed requests detected');
    } else {
      failedRequests.forEach((req, i) => {
        console.log(`\n${i + 1}. ${req.url}`);
        if (req.status) {
          console.log(`   Status: ${req.status}`);
        }
        if (req.failure) {
          console.log(`   Failure: ${req.failure.errorText}`);
        }
      });
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('ALL WASM-RELATED REQUESTS:');
    console.log('='.repeat(80));
    
    const wasmRequests = allRequests.filter(req => 
      req.url.includes('wasm') || req.url.includes('.wasm') || req.url.includes('WASM')
    );
    
    if (wasmRequests.length === 0) {
      console.log('No WASM-related requests detected');
    } else {
      wasmRequests.forEach((req, i) => {
        console.log(`\n${i + 1}. ${req.url}`);
        console.log(`   Method: ${req.method}`);
        console.log(`   Type: ${req.resourceType}`);
      });
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

const url = process.argv[2] || DEFAULT_URL;
investigate404(url).catch(error => {
  console.error(`\n❌ Unexpected error: ${error.message}`);
  process.exit(1);
});
