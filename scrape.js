const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set viewport for a desktop view
    await page.setViewport({ width: 1440, height: 900 });
    
    console.log('Navigating to https://o-n-e-nine.vercel.app/ ...');
    await page.goto('https://o-n-e-nine.vercel.app/', { waitUntil: 'domcontentloaded' });
    
    // Take screenshot
    await page.screenshot({ path: 'onenine_screenshot.png', fullPage: true });
    console.log('Screenshot saved to onenine_screenshot.png');
    
    // Get HTML
    const html = await page.content();
    fs.writeFileSync('onenine_html.html', html);
    console.log('HTML saved to onenine_html.html');
    
    await browser.close();
  } catch (err) {
    console.error('Error:', err);
  }
})();
