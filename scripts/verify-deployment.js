#!/usr/bin/env node

/**
 * GitHub Pagesデプロイ後の動作確認スクリプト
 * 
 * このスクリプトは、GitHub Pagesにデプロイされたwavlpfアプリケーションの
 * 動作を確認するためのものです。
 * 
 * 確認内容:
 * - ページが正常にロードされること
 * - コンソールエラーがないこと
 * - 主要な要素（オシロスコープ、コントロールUI等）が存在すること
 * - WASM初期化が成功すること
 * 
 * 使用方法:
 *   node scripts/verify-deployment.js [URL]
 * 
 * URLを省略した場合は、デフォルトでGitHub PagesのURL（https://cat2151.github.io/wavlpf/）を使用します。
 * 
 * 環境変数:
 *   TIMEOUT - ページロードのタイムアウト（ミリ秒、デフォルト: 15000）
 *   VERBOSE - 詳細ログを有効化（1で有効）
 *   SAVE_SCREENSHOT - スクリーンショットの保存先（指定するとスクリーンショットを保存）
 * 
 * 例:
 *   node scripts/verify-deployment.js
 *   node scripts/verify-deployment.js http://localhost:4173
 *   TIMEOUT=30000 node scripts/verify-deployment.js
 *   VERBOSE=1 SAVE_SCREENSHOT=screenshot.png node scripts/verify-deployment.js
 */

const { chromium } = require('playwright');

// デプロイされたアプリケーションのURL
const DEFAULT_URL = 'https://cat2151.github.io/wavlpf/';

async function verifyDeployment(url) {
  console.log(`\n🔍 GitHub Pagesデプロイ検証を開始: ${url}\n`);
  
  let browser;
  let passed = 0;
  let failed = 0;
  const errors = [];
  
  try {
    // ブラウザを起動
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      // GitHub Pagesのセキュリティポリシーに対応
      bypassCSP: false,
    });
    
    const page = await context.newPage();
    
    // コンソールログを収集
    const consoleMessages = [];
    const consoleErrors = [];
    
    page.on('console', msg => {
      const text = msg.text();
      const type = msg.type();
      
      consoleMessages.push({ type, text });
      
      if (type === 'error') {
        consoleErrors.push(text);
      }
      
      // ログを出力（デバッグ用）
      if (type === 'error') {
        console.log(`  ❌ Console Error: ${text}`);
      } else if (process.env.VERBOSE) {
        console.log(`  📝 Console ${type}: ${text}`);
      }
    });
    
    // ページエラーを収集
    page.on('pageerror', error => {
      consoleErrors.push(error.message);
      console.log(`  ❌ Page Error: ${error.message}`);
    });
    
    // テスト1: ページのロード
    console.log('テスト1: ページのロード');
    try {
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: parseInt(process.env.TIMEOUT || '15000')
      });
      
      if (response && response.ok()) {
        console.log('  ✅ ページが正常にロードされました');
        passed++;
      } else {
        const status = response ? response.status() : 'unknown';
        throw new Error(`HTTPステータス: ${status}`);
      }
    } catch (error) {
      console.log(`  ❌ ページのロードに失敗: ${error.message}`);
      errors.push(`ページロード失敗: ${error.message}`);
      failed++;
    }
    
    // 少し待機してJavaScriptの初期化を待つ
    await page.waitForTimeout(2000);
    
    // テスト2: 主要な要素の存在確認
    console.log('\nテスト2: 主要な要素の存在確認');
    
    const elements = [
      { selector: '#app', name: 'アプリケーションルート' },
      { selector: 'canvas', name: 'オシロスコープキャンバス' },
      { selector: '.controls', name: 'コントロールUI' },
    ];
    
    for (const { selector, name } of elements) {
      try {
        const element = await page.$(selector);
        if (element) {
          console.log(`  ✅ ${name}が存在します`);
          passed++;
        } else {
          throw new Error('要素が見つかりません');
        }
      } catch (error) {
        console.log(`  ❌ ${name}が見つかりません: ${selector}`);
        errors.push(`${name}が見つかりません`);
        failed++;
      }
    }
    
    // テスト3: WASM初期化の確認
    console.log('\nテスト3: WASM初期化の確認');
    try {
      // WASMエラーがないことを確認（これが最も重要）
      const hasWasmError = consoleErrors.some(err => 
        err.toLowerCase().includes('wasm') || 
        err.toLowerCase().includes('failed to update oscilloscope') ||
        err.toLowerCase().includes('wasm initialization failed')
      );
      
      if (hasWasmError) {
        throw new Error('WASMエラーが検出されました');
      }
      
      console.log('  ✅ WASMエラーが検出されませんでした');
      passed++;
    } catch (error) {
      console.log(`  ❌ WASM初期化に失敗: ${error.message}`);
      errors.push(`WASM初期化失敗: ${error.message}`);
      failed++;
    }
    
    // テスト4: コンソールエラーのチェック
    console.log('\nテスト4: コンソールエラーのチェック');
    if (consoleErrors.length === 0) {
      console.log('  ✅ コンソールエラーはありません');
      passed++;
    } else {
      console.log(`  ❌ コンソールエラーが ${consoleErrors.length} 件見つかりました:`);
      consoleErrors.forEach((err, i) => {
        console.log(`     ${i + 1}. ${err}`);
      });
      errors.push(`${consoleErrors.length}件のコンソールエラー`);
      failed++;
    }
    
    // スクリーンショットを撮影（デバッグ用）
    if (process.env.SAVE_SCREENSHOT) {
      const screenshotPath = process.env.SAVE_SCREENSHOT;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`\n📸 スクリーンショットを保存しました: ${screenshotPath}`);
    }
    
  } catch (error) {
    console.error(`\n❌ 検証中にエラーが発生しました: ${error.message}`);
    errors.push(`検証エラー: ${error.message}`);
    failed++;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // 結果のサマリー
  console.log('\n' + '='.repeat(60));
  console.log('検証結果サマリー');
  console.log('='.repeat(60));
  console.log(`✅ 成功: ${passed} 件`);
  console.log(`❌ 失敗: ${failed} 件`);
  
  if (errors.length > 0) {
    console.log('\n失敗した項目:');
    errors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err}`);
    });
  }
  
  console.log('='.repeat(60) + '\n');
  
  // 失敗がある場合は終了コード1で終了
  if (failed > 0) {
    console.error('❌ デプロイ検証に失敗しました');
    process.exit(1);
  } else {
    console.log('✅ デプロイ検証に成功しました！');
    process.exit(0);
  }
}

// メイン処理
const url = process.argv[2] || DEFAULT_URL;

// Playwrightがインストールされているか確認
try {
  require('playwright');
  // Chromiumブラウザがインストールされているか確認
  const { execSync } = require('child_process');
  try {
    execSync('npx playwright show-config', { stdio: 'pipe' });
  } catch (browserError) {
    console.error('❌ Playwrightはインストールされていますが、Chromiumブラウザがインストールされていません。');
    console.error('');
    console.error('以下のコマンドでブラウザをインストールしてください:');
    console.error('  npx playwright install chromium');
    console.error('');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Playwrightがインストールされていません。');
  console.error('');
  console.error('以下のコマンドでインストールしてください:');
  console.error('  npm install --save-dev playwright');
  console.error('  npx playwright install chromium');
  console.error('');
  process.exit(1);
}

verifyDeployment(url).catch(error => {
  console.error(`\n❌ 予期しないエラー: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
