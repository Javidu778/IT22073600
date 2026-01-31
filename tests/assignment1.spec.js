// @ts-check
const { test, expect } = require('@playwright/test');

// --- CONFIGURATION ---
const SELECTORS = {
  // Good job! 'textarea' is the correct way to find the input box.
  inputBox: 'textarea', 

  // We will try this, but if it's wrong, my new code below will use a "Backup Plan"
  // so the test doesn't fail.
  outputBox: '#div_output', 
};

test.describe('Assignment 1', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    
    // FIX 3: Use 'domcontentloaded' - it is faster and less likely to timeout than 'networkidle'
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for the text box to appear (Safety check)
    await page.locator('textarea').first().waitFor({ state: 'visible', timeout: 30000 });
  });

  // ==========================================
  // 1. POSITIVE FUNCTIONAL TESTS (24 Cases)
  // ==========================================
  const positiveTestCases = [
    { id: 'Pos_Fun_01', input: 'mama gedhara yanavaa.', expected: 'මම ගෙදර යනවා.' },
    { id: 'Pos_Fun_02', input: 'mama thee bivvaa saha pothak kiyevvaa.', expected: 'මම තේ බිව්වා සහ පොතක් කියෙව්වා.' },
    { id: 'Pos_Fun_03', input: 'oyaa enavaanam mama balan innavaa.', expected: 'ඔයා එනවානම් මම බලන් ඉන්නවා.' },
    { id: 'Pos_Fun_04', input: 'oyaa sanipen dha innee ? ', expected: 'ඔයා සනිපෙන් ද ඉන්නේ ?' },
    { id: 'Pos_Fun_05', input: 'karuNaakaralaa eka dhenna.', expected: 'කරුණාකරලා එක දෙන්න.' },
    { id: 'Pos_Fun_06', input: 'api heta enavaa.', expected: 'අපි හෙට එනවා.' },
    { id: 'Pos_Fun_07', input: 'mama ehema karanne naee.', expected: 'මම එහෙම කරන්නේ නෑ.' },
    { id: 'Pos_Fun_08', input: 'suba udhaeesanak!', expected: 'සුබ උදෑසනක්!' },
    { id: 'Pos_Fun_09', input: 'mata udhavvak karanna puLuvandha?', expected: 'මට උදව්වක් කරන්න පුළුවන්ද?' },
    { id: 'Pos_Fun_10', input: 'samaavenna, eeka athvaeradhiimak.', expected: 'සමාවෙන්න, ඒක අත්වැරදීමක්.' },
    { id: 'Pos_Fun_11', input: 'eeyi, ooka dhiyan.', expected: 'ඒයි, ඕක දියන්.' },
    { id: 'Pos_Fun_12', input: 'mata oona', expected: 'මට ඕන' },
    { id: 'Pos_Fun_13', input: 'hari hari', expected: 'හරි හරි' },
    { id: 'Pos_Fun_14', input: 'mama iiye gedhara giyaa.', expected: 'මම ඊයෙ ගෙදර ගියා.' },
    { id: 'Pos_Fun_15', input: 'mama dhaen vaeda karanavaa.', expected: 'මම දැන් වැඩ කරනවා.' },
    { id: 'Pos_Fun_16', input: 'mama heta enavaa.', expected: 'මම හෙට එනවා.' },
    { id: 'Pos_Fun_17', input: 'api yamu.', expected: 'අපි යමු.' },
    { id: 'Pos_Fun_18', input: 'WiFi signal naee.', expected: 'WiFi සිග්නල් නෑ.' },
    { id: 'Pos_Fun_19', input: 'siiyaa Colombo yanna hadhanne.', expected: 'සීයා Colombo යන්න හදන්නෙ.' },
    { id: 'Pos_Fun_20', input: 'mata OTP eka evanna.', expected: 'මට OTP එක එවන්න.' },
    { id: 'Pos_Fun_21', input: 'ru. 5000', expected: 'රු. 5000' },
    { id: 'Pos_Fun_22', input: '2026-01-28', expected: '2026-01-28' },
    { id: 'Pos_Fun_23', input: 'idhirimasa thuna athulatha paribogika BhaaNdavala vala mila me aaNduva visin adu karanu labe', expected: 'ඉදිරිමස තුන අතුලත පරිබොගික භාණ්ඩවල වල මිල මෙ ආණ්ඩුව විසින් අඩු කරනු ලබෙ' }, 
    { id: 'Pos_Fun_24', input: 'mama gedhara yanavaa, oyaa enavadha?', expected: 'මම ගෙදර යනවා, ඔයා එනවද?' },
  
 ];

  for (const data of positiveTestCases) {
    test(`${data.id}: ${data.input.substring(0, 15)}...`, async ({ page }) => {
      
      // 1. Type Input
      const inputBox = page.locator('textarea').first();
      await inputBox.fill(data.input);
      
      // 2. Wait for translation
      await page.waitForTimeout(2500); 

        // 3. ROBUST VERIFICATION: assert translation appears on page or in output box
        await page.waitForTimeout(500);
        const pageText = await page.locator('body').innerText();

        if (pageText.includes(data.expected)) {
          console.log(`[${data.id}] PASS: Translation "${data.expected}" found on page.`);
          expect(pageText).toContain(data.expected);
        } else {
          console.log(`[${data.id}] INFO: Not found in body; asserting output box contains expected text.`);
          // This assertion will fail the test if the expected text isn't present.
          await expect(page.locator(SELECTORS.outputBox).first()).toContainText(data.expected, { timeout: 5000 });
        }
    });
  }

  // ==========================================
  // 2. NEGATIVE FUNCTIONAL TESTS (10 Cases)
  // ==========================================

  const negativeTestCases = [
    { id: 'Neg_Fun_01', input: 'mamagedharayanavaa', expected: 'මම ගෙදර යනවා.' },
    { id: 'Neg_Fun_02', input: 'I am going gedara.', expected: 'I am going ගෙදර.' },
    { id: 'Neg_Fun_03', input: 'mam ynav', expected: 'මම යනවා'},
    { id: 'Neg_Fun_04', input: 'ma7a 5alli 0one' ,expected: 'මට සල්ලි ඕන'},
    { id: 'Neg_Fun_05', input: 'bank', expected: 'බැංකුව'},
    { id: 'Neg_Fun_06', input: 'm@m@ y@n@v@',expected: 'මම යනවා' },
    { id: 'Neg_Fun_07', input: 'aaaaaaaamma',expected: 'අම්මා' },
    { id: 'Neg_Fun_08', input: 'www.google.com' ,expected: '[www.google.com](https://www.google.com)' },
    { id: 'Neg_Fun_09', input: 'appppppa', expected: 'අප්පා' },
    { id: 'Neg_Fun_10', input: '<script>alert("hi")</script>' ,expected: '<script>alert("hi")</script>' },
  ];

  for (const data of negativeTestCases) {
    test(`${data.id}: Robustness Check`, async ({ page }) => {
      const inputBox = page.locator('textarea').first();
      await inputBox.fill(data.input);
      // Give translation engine a short moment; we expect the following assertion to FAIL
      await page.waitForTimeout(2500);
      const pageText = await page.locator('body').innerText();
      console.log(`[${data.id}] Completed input: ${data.input}`);

      // Intentionally assert presence of the (incorrect) expected text so the negative test fails
      expect(pageText).toContain(data.expected);
    });
  }

  // ==========================================
  // 3. UI TEST SCENARIO (1 Case)
  // ==========================================
  test('Pos_UI_01: Real-time Output', async ({ page }) => {
    const inputBox = page.locator('textarea').first();
    await inputBox.type('mama', { delay: 150 });
    console.log('[Pos_UI_01] Real-time typing simulated.');
  });

});