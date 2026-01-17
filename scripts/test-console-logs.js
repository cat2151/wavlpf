#!/usr/bin/env node

/**
 * GitHub Pages コンソールログ調査スクリプト
 * 
 * Issue #86: 画面をクリックしたあとconsoleにエラーが表示され続ける問題を調査
 * 
 * このスクリプトは:
 * 1. GitHub Pagesを開く
 * 2. ページをクリックしてコア機能を起動
 * 3. コンソールに表示されるログを連続的に収集
 * 4. エラーパターンを分析
 */

const { chromium } = require('playwright');

const DEFAULT_URL = 'https://cat2151.github.io/wavlpf/';

async function testConsoleLogs(url) {
  console.log(`\n🔍 GitHub Pages コンソールログ調査を開始: ${url}\n`);
  
  let browser;
  
  try {
    // ブラウザを起動
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    
    const page = await context.newPage();
    
    // コンソールログを収集
    const consoleMessages = [];
    let errorCount = 0;
    let warningCount = 0;
    let infoCount = 0;
    
    page.on('console', msg => {
      const text = msg.text();
      const type = msg.type();
      const timestamp = new Date().toISOString();
      
      consoleMessages.push({ timestamp, type, text });
      
      if (type === 'error') {
        errorCount++;
        console.log(`[${timestamp}] ❌ ERROR: ${text}`);
      } else if (type === 'warning') {
        warningCount++;
        console.log(`[${timestamp}] ⚠️  WARNING: ${text}`);
      } else if (type === 'info' || type === 'log') {
        infoCount++;
        if (process.env.VERBOSE) {
          console.log(`[${timestamp}] ℹ️  ${type.toUpperCase()}: ${text}`);
        }
      }
    });
    
    // ページエラーを収集
    page.on('pageerror', error => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] 🔴 PAGE ERROR: ${error.message}`);
      consoleMessages.push({ timestamp, type: 'pageerror', text: error.message });
      errorCount++;
    });
    
    // ステップ1: ページを開く
    console.log('ステップ1: GitHub Pagesを開く...');
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 15000
    });
    console.log('✅ ページが読み込まれました\n');
    
    // ページの完全な読み込みを待つ
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000); // 追加の待機時間
    
    // 初期状態のログ数を記録
    const initialErrorCount = errorCount;
    const initialWarningCount = warningCount;
    console.log(`初期状態: エラー=${initialErrorCount}, 警告=${initialWarningCount}\n`);
    
    // ステップ2: ページをクリックしてコア機能を起動
    console.log('ステップ2: ページをクリックしてコア機能を起動...');
    await page.click('body');
    console.log('✅ ページをクリックしました\n');
    
    // クリック後のログを収集するため待機（10秒間）
    console.log('コンソールログを10秒間収集中...\n');
    await page.waitForTimeout(10000);
    
    // ステップ3: 追加でマウス移動をシミュレート
    console.log('ステップ3: マウス移動をシミュレート...');
    await page.mouse.move(640, 360); // 画面中央
    await page.waitForTimeout(2000);
    await page.mouse.move(800, 200); // 右上
    await page.waitForTimeout(2000);
    await page.mouse.move(400, 500); // 左下
    await page.waitForTimeout(2000);
    console.log('✅ マウス移動をシミュレートしました\n');
    
    // さらに追加で5秒間ログを収集
    console.log('追加で5秒間コンソールログを収集中...\n');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error(`\n❌ 調査中にエラーが発生しました: ${error.message}`);
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // 結果の分析
  console.log('\n' + '='.repeat(80));
  console.log('調査結果サマリー');
  console.log('='.repeat(80));
  console.log(`総メッセージ数: ${consoleMessages.length}`);
  console.log(`エラー数: ${errorCount}`);
  console.log(`警告数: ${warningCount}`);
  console.log(`情報/ログ数: ${infoCount}`);
  console.log('='.repeat(80) + '\n');
  
  // エラーパターンの分析
  if (errorCount > 0) {
    console.log('エラーメッセージの詳細分析:\n');
    
    const errorMessages = consoleMessages.filter(m => m.type === 'error' || m.type === 'pageerror');
    const uniqueErrors = {};
    
    errorMessages.forEach(msg => {
      const key = msg.text.substring(0, 200); // 最初の200文字でグループ化
      if (!uniqueErrors[key]) {
        uniqueErrors[key] = { count: 0, firstSeen: msg.timestamp, text: msg.text };
      }
      uniqueErrors[key].count++;
    });
    
    console.log(`ユニークなエラータイプ: ${Object.keys(uniqueErrors).length}\n`);
    
    Object.entries(uniqueErrors).forEach(([key, data], index) => {
      console.log(`エラータイプ ${index + 1}:`);
      console.log(`  発生回数: ${data.count}`);
      console.log(`  初回発生: ${data.firstSeen}`);
      console.log(`  メッセージ: ${data.text}`);
      console.log('');
    });
  } else {
    console.log('✅ エラーは検出されませんでした\n');
  }
  
  // タイムライン表示（最後の20メッセージ）
  if (consoleMessages.length > 0) {
    console.log('\n最後の20メッセージのタイムライン:');
    console.log('-'.repeat(80));
    const lastMessages = consoleMessages.slice(-20);
    lastMessages.forEach(msg => {
      const typeIcon = msg.type === 'error' || msg.type === 'pageerror' ? '❌' : 
                       msg.type === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`${typeIcon} [${msg.timestamp}] ${msg.type}: ${msg.text.substring(0, 100)}`);
    });
    console.log('-'.repeat(80) + '\n');
  }
  
  // 結論
  if (errorCount > 10) {
    console.log('🚨 重大な問題: 大量のエラーが継続的に発生しています！');
    process.exit(1);
  } else if (errorCount > 0) {
    console.log('⚠️  警告: エラーが検出されました');
    process.exit(1);
  } else {
    console.log('✅ 問題なし: エラーは検出されませんでした');
    process.exit(0);
  }
}

// メイン処理
const url = process.argv[2] || DEFAULT_URL;

testConsoleLogs(url).catch(error => {
  console.error(`\n❌ 予期しないエラー: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
