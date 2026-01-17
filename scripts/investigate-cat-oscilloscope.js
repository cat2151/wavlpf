#!/usr/bin/env node

/**
 * Investigation: cat-oscilloscope dist commit status
 * 
 * According to .github/copilot-instructions.md (line 219):
 * "cat-oscilloscopeライブラリとtonejs-json-sequencerライブラリは、dist commit方式でリリースされている前提とします。"
 * 
 * This script checks if cat-oscilloscope has dist/ files in its repository.
 */

const https = require('https');

function checkGitHubRepo(owner, repo, path = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      headers: {
        'User-Agent': 'wavlpf-investigation'
      }
    };

    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function investigate() {
  console.log('🔍 Investigating cat-oscilloscope repository...\n');
  
  try {
    // Check root directory
    console.log('Checking repository root...');
    const rootContents = await checkGitHubRepo('cat2151', 'cat-oscilloscope');
    const hasDistDir = rootContents.some(item => item.name === 'dist' && item.type === 'dir');
    
    console.log(`✓ Root directory checked`);
    console.log(`  - Has dist/ directory: ${hasDistDir ? 'YES' : 'NO'}`);
    
    if (hasDistDir) {
      console.log('\nChecking dist/ directory contents...');
      const distContents = await checkGitHubRepo('cat2151', 'cat-oscilloscope', 'dist');
      console.log(`✓ dist/ directory contains ${distContents.length} items:`);
      distContents.slice(0, 10).forEach(item => {
        console.log(`  - ${item.name} (${item.type})`);
      });
      if (distContents.length > 10) {
        console.log(`  ... and ${distContents.length - 10} more items`);
      }
      
      // Check for wasm subdirectory
      const hasWasmDir = distContents.some(item => item.name === 'wasm' && item.type === 'dir');
      if (hasWasmDir) {
        console.log('\nChecking dist/wasm/ directory...');
        const wasmContents = await checkGitHubRepo('cat2151', 'cat-oscilloscope', 'dist/wasm');
        console.log(`✓ dist/wasm/ contains ${wasmContents.length} items:`);
        wasmContents.forEach(item => {
          console.log(`  - ${item.name}`);
        });
      }
    }
    
    // Check for releases/tags
    console.log('\nChecking for releases...');
    const releases = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: `/repos/cat2151/cat-oscilloscope/releases`,
        headers: {
          'User-Agent': 'wavlpf-investigation'
        }
      };
      
      https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            resolve([]);
          }
        });
      }).on('error', reject);
    });
    
    console.log(`✓ Found ${releases.length} releases`);
    if (releases.length > 0) {
      releases.slice(0, 5).forEach(release => {
        console.log(`  - ${release.tag_name}: ${release.name || '(no name)'}`);
      });
    }
    
    // Check package.json for dist files reference
    console.log('\nChecking package.json...');
    const packageJson = await checkGitHubRepo('cat2151', 'cat-oscilloscope', 'package.json');
    const packageData = JSON.parse(Buffer.from(packageJson.content, 'base64').toString());
    console.log(`✓ package.json checked`);
    console.log(`  - main: ${packageData.main || '(not specified)'}`);
    console.log(`  - files: ${packageData.files ? packageData.files.join(', ') : '(not specified)'}`);
    console.log(`  - scripts.prepare: ${packageData.scripts?.prepare || '(not specified)'}`);
    
    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    
    if (hasDistDir) {
      console.log('✅ cat-oscilloscope HAS dist/ directory in repository');
      console.log('   → dist commit方式が実装されている可能性があります');
    } else {
      console.log('❌ cat-oscilloscope does NOT have dist/ directory in repository');
      console.log('   → dist commit方式が実装されていません');
    }
    
    if (releases.length > 0) {
      console.log(`✅ cat-oscilloscope has ${releases.length} release(s)`);
      console.log('   → バージョンタグを使用してインストール可能です');
    } else {
      console.log('❌ cat-oscilloscope has NO releases');
      console.log('   → リリースタグが存在しません');
    }
    
    console.log('\n推奨される次のステップ:');
    if (hasDistDir && releases.length > 0) {
      const latestRelease = releases[0];
      console.log(`✅ package.jsonを以下のように更新してください:`);
      console.log(`   "cat-oscilloscope": "github:cat2151/cat-oscilloscope#${latestRelease.tag_name}"`);
    } else if (hasDistDir) {
      console.log('⚠️  dist/はあるがリリースがありません。以下のいずれかが必要:');
      console.log('   1. cat-oscilloscopeでリリースタグを作成');
      console.log('   2. mainブランチを直接参照（非推奨）:');
      console.log('      "cat-oscilloscope": "github:cat2151/cat-oscilloscope"');
    } else {
      console.log('❌ ドキュメント不備: .github/copilot-instructions.mdは');
      console.log('   dist commit方式を前提としていますが、実装されていません');
      console.log('');
      console.log('   以下のいずれかが必要:');
      console.log('   1. cat-oscilloscopeでdist commit方式を実装');
      console.log('   2. ドキュメントを修正して別の方式を採用');
    }
    console.log('='.repeat(80) + '\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

investigate();
