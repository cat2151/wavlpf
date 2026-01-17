#!/usr/bin/env node

/**
 * GitHub Pagesのスクリーンショット撮影スクリプト
 * 
 * このスクリプトは、GitHub Pagesにデプロイされたwavlpfアプリケーションの
 * スクリーンショットを撮影します。アプリケーションを開始するための
 * クリック操作を自動的に実行し、オシロスコープが動作している状態を
 * キャプチャします。
 * 
 * 使用方法:
 *   node scripts/screenshot-github-pages.js [URL] [OUTPUT_PATH]
 * 
 * 引数:
 *   URL - スクリーンショットを撮影するURL（省略時: https://cat2151.github.io/wavlpf/）
 *   OUTPUT_PATH - スクリーンショットの保存先（省略時: github-pages-screenshot.png）
 * 
 * 環境変数:
 *   WAIT_TIME - クリック後の待機時間（ミリ秒、デフォルト: 3000）
 *   VERBOSE - 詳細ログを有効化（1で有効）
 * 
 * 例:
 *   node scripts/screenshot-github-pages.js
 *   node scripts/screenshot-github-pages.js https://cat2151.github.io/wavlpf/ output.png
 *   WAIT_TIME=5000 node scripts/screenshot-github-pages.js
 */

// Playwrightがインストールされているか確認
try {
  require('playwright');
} catch (error) {
  console.error('❌ Playwrightがインストールされていません。');
  console.error('');
  console.error('以下のコマンドでインストールしてください:');
  console.error('  npm install --save-dev playwright');
  console.error('  npx playwright install chromium');
  console.error('');
  process.exit(1);
}

const { chromium } = require('playwright');

// デフォルト設定
const DEFAULT_URL = 'https://cat2151.github.io/wavlpf/';
const DEFAULT_OUTPUT = 'github-pages-screenshot.png';
const DEFAULT_WAIT_TIME = 3000;

async function takeScreenshot(url, outputPath) {
  console.log(`\n📸 GitHub Pagesスクリーンショット撮影を開始\n`);
  console.log(`  URL: ${url}`);
  console.log(`  出力先: ${outputPath}\n`);
  
  let browser;
  
  try {
    // ブラウザを起動
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true
    });
    
    const page = await context.newPage();
    
    // コンソールログを収集（デバッグ用）
    if (process.env.VERBOSE) {
      page.on('console', msg => {
        console.log(`  📝 Console ${msg.type()}: ${msg.text()}`);
      });
      
      page.on('pageerror', error => {
        console.log(`  ❌ Page Error: ${error.message}`);
      });
    }
    
    // ステップ1: ページのロード
    console.log('ステップ1: ページをロード中...');
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('  ✅ ページがロードされました');
    
    // ステップ2: 初期化を待つ
    console.log('\nステップ2: JavaScriptの初期化を待機中...');
    await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
    await page.waitForLoadState('load', { timeout: 5000 });
    console.log('  ✅ 初期化完了');
    
    // ステップ3: アプリケーションを開始するために画面をクリック
    console.log('\nステップ3: アプリケーションを開始（画面をクリック）...');
    await page.click('body');
    console.log('  ✅ クリック完了');
    
    // ステップ4: オシロスコープの表示を待つ
    const waitTime = parseInt(process.env.WAIT_TIME || DEFAULT_WAIT_TIME);
    console.log(`\nステップ4: オシロスコープの表示を待機（${waitTime}ms）...`);
    await page.waitForTimeout(waitTime);
    console.log('  ✅ 待機完了');
    
    // ステップ5: スクリーンショットを撮影
    console.log(`\nステップ5: スクリーンショットを撮影中...`);
    await page.screenshot({ 
      path: outputPath, 
      fullPage: false 
    });
    console.log(`  ✅ スクリーンショットを保存しました: ${outputPath}`);
    
  } catch (error) {
    console.error(`\n❌ エラーが発生しました: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ スクリーンショット撮影完了');
  console.log('='.repeat(60) + '\n');
}

// メイン処理
const url = process.argv[2] || DEFAULT_URL;
const outputPath = process.argv[3] || DEFAULT_OUTPUT;

takeScreenshot(url, outputPath).catch(error => {
  console.error(`\n❌ 予期しないエラー: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
