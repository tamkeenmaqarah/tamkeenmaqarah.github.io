// Run against preview.py with PLAYWRIGHT_MODULE and PLAYWRIGHT_CHROMIUM_PATH when using a bundled runtime.
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.APP_URL || 'http://127.0.0.1:4182';
const data = {teacher:false, quizzes:[], submissions:[], records:[], moments:[], community:{boards:[], moments:[]}};
(async () => {
 const browser = await chromium.launch({headless:true, executablePath:process.env.PLAYWRIGHT_CHROMIUM_PATH, args:['--disable-gpu']});
 try {
  for (const width of [320,390,768,1440]) for (const ar of [false,true]) {
   const page = await browser.newPage({viewport:{width,height:844},hasTouch:true,reducedMotion:'reduce'});
   const errors=[]; page.on('pageerror', error=>errors.push(error.message));
   await page.addInitScript(ar=>{
    localStorage.setItem('tamkeen-door',JSON.stringify({name:'Ahmed',passwordHash:'test-only'}));
    localStorage.setItem('tamkeen-remembered','1');
    localStorage.setItem('tamkeen-language',ar?'ar':'en');
   },ar);
   let writes=0;
   await page.route('**/api/**', route=>{
    const request=route.request();
    if (!['GET','HEAD','OPTIONS'].includes(request.method())) {writes++; return route.abort();}
    return route.fulfill({json:request.url().includes('/homework')?{entries:[]}:data});
   });
   await page.goto(base+'/?view=homework');
   const summary=page.locator('.account-menu > summary');
   await summary.waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const targets=await page.locator('.main-nav button,.header-actions > button,.account-menu > summary').evaluateAll(elements=>elements.filter(e=>e.getBoundingClientRect().width>0).map(e=>e.getBoundingClientRect().height));
   assert.equal(targets.length,11);
   assert.ok(targets.every(height=>height>=44));
   await summary.tap();
   assert.equal(await page.locator('.account-menu').getAttribute('open'),'');
   const popup=await page.locator('.account-popover').boundingBox();
   assert.ok(popup.x>=0 && popup.x+popup.width<=width);
   await page.getByRole('button',{name:ar?'تغيير كلمة المرور':'Change password',exact:true}).tap();
   await page.locator('#current-password').waitFor();
   await page.getByRole('button',{name:ar?'العودة إلى الخيمة':'Back to the tent',exact:true}).tap();
   await summary.tap(); await page.keyboard.press('Escape');
   assert.equal(await page.locator('.account-menu').getAttribute('open'),null);
   assert.equal(await summary.evaluate(e=>e===document.activeElement),true);
   await summary.tap(); await page.touchscreen.tap(10,500);
   assert.equal(await page.locator('.account-menu').getAttribute('open'),null);
   await page.getByRole('navigation').getByRole('button',{name:ar?'الرئيسية':'Home',exact:true}).tap();
   await page.getByRole('navigation',{name:ar?'التنقل الرئيسي':'Main navigation'}).getByRole('button',{name:ar?'الحلقات والمراجعة':'Halaqas & study',exact:true}).tap();
   assert.equal(await page.locator('.halaqa-player iframe').count(),0);
   await page.locator('.halaqa-preview').tap();
   assert.ok((await page.locator('.halaqa-player iframe').getAttribute('src')).startsWith('https://www.youtube-nocookie.com/embed/'));
   assert.equal(writes,0); assert.deepEqual(errors,[]);
   await page.close();
  }
  console.log('PASS: 320/390/768/1440, English/Arabic, touch targets, account actions, Escape/outside dismissal, video activation, no production writes.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
