#!/usr/bin/env node

/**
 * 波形ビジュアライズのスクリーンショットテスト
 * 
 * このスクリプトは、ヘッドレスブラウザで波形ビジュアライズ機能をテストし、
 * スクリーンショットを撮影します。
 * 
 * 使用方法:
 *   node scripts/test-waveform-screenshot.js [URL]
 * 
 * 環境変数:
 *   SCREENSHOT_PATH - スクリーンショットの保存先（デフォルト: waveform-test.png）
 */

const { chromium } = require('playwright');

const DEFAULT_URL = 'http://localhost:8081/wavlpf/';
const SCREENSHOT_PATH = process.env.SCREENSHOT_PATH || 'waveform-test.png';

async function testWaveformVisualization(url) {
  console.log(`\n🔍 波形ビジュアライズのテストを開始: ${url}\n`);
  
  let browser;
  let success = false;
  
  try {
    // ブラウザを起動
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
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
    
    // ステップ1: ページのロード
    console.log('ステップ1: ページのロード');
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 15000
    });
    console.log('  ✅ ページがロードされました');
    
    // ステップ2: キャンバス要素の確認
    console.log('\nステップ2: オシロスコープキャンバスの確認');
    const canvas = await page.$('#oscilloscope');
    if (!canvas) {
      throw new Error('オシロスコープキャンバスが見つかりません');
    }
    console.log('  ✅ オシロスコープキャンバスが存在します');
    
    // ステップ3: 画面をクリックして音声再生を開始
    console.log('\nステップ3: 画面をクリックして音声再生を開始');
    await page.click('body');
    console.log('  ✅ 画面をクリックしました');
    
    // ステップ4: 波形が表示されるまで待機
    console.log('\nステップ4: 波形表示を待機（3秒）');
    await page.waitForTimeout(3000);
    console.log('  ✅ 待機完了');
    
    // ステップ5: スクリーンショットを撮影
    console.log(`\nステップ5: スクリーンショットを撮影`);
    await page.screenshot({ 
      path: SCREENSHOT_PATH, 
      fullPage: false 
    });
    console.log(`  ✅ スクリーンショットを保存しました: ${SCREENSHOT_PATH}`);
    
    // ステップ6: キャンバスの内容を確認
    console.log('\nステップ6: キャンバスの内容を確認');
    const canvasContent = await page.evaluate(() => {
      const canvas = document.getElementById('oscilloscope');
      if (!canvas) return null;
      
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // ピクセルデータを解析して、キャンバスに何か描画されているか確認
      let nonBlackPixels = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // 完全な黒（透明含む）でないピクセルをカウント
        if (!(r === 0 && g === 0 && b === 0 && a === 0)) {
          nonBlackPixels++;
        }
      }
      
      return {
        width: canvas.width,
        height: canvas.height,
        totalPixels: data.length / 4,
        nonBlackPixels: nonBlackPixels,
        hasContent: nonBlackPixels > 100 // 100ピクセル以上描画されていれば内容があるとみなす
      };
    });
    
    if (canvasContent) {
      console.log(`  ℹ️  キャンバスサイズ: ${canvasContent.width}x${canvasContent.height}`);
      console.log(`  ℹ️  総ピクセル数: ${canvasContent.totalPixels}`);
      console.log(`  ℹ️  非黒ピクセル数: ${canvasContent.nonBlackPixels}`);
      
      if (canvasContent.hasContent) {
        console.log('  ✅ キャンバスに波形が描画されています');
        success = true;
      } else {
        console.log('  ⚠️  キャンバスに波形が描画されていない可能性があります');
      }
    } else {
      console.log('  ⚠️  キャンバスの内容を確認できませんでした');
    }
    
    // エラーチェック
    if (consoleErrors.length > 0) {
      console.log(`\n⚠️  ${consoleErrors.length}件のコンソールエラーが検出されました`);
    }
    
  } catch (error) {
    console.error(`\n❌ テスト中にエラーが発生しました: ${error.message}`);
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // 結果のサマリー
  console.log('\n' + '='.repeat(60));
  console.log('テスト結果');
  console.log('='.repeat(60));
  if (success) {
    console.log('✅ 波形ビジュアライズが正常に動作しています');
    console.log(`📸 スクリーンショット: ${SCREENSHOT_PATH}`);
    console.log('='.repeat(60) + '\n');
    process.exit(0);
  } else {
    console.log('⚠️  波形ビジュアライズの動作に問題がある可能性があります');
    console.log(`📸 スクリーンショット: ${SCREENSHOT_PATH}`);
    console.log('='.repeat(60) + '\n');
    process.exit(1);
  }
}

// メイン処理
const url = process.argv[2] || DEFAULT_URL;
testWaveformVisualization(url).catch(error => {
  console.error(`\n❌ 予期しないエラー: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
