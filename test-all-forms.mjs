import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);
  await page.locator('input[name="email"]').first().fill('Quanlybaogia@gmail.com');
  await page.locator('input[type="password"]').first().fill('123456');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(5000);
  const url = page.url();
  console.log('After login URL:', url);
  return !url.includes('/login');
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const apiResponses = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('/api/v1.0/quotation') || url.includes('/api/v1.0/contact') ||
        url.includes('/api/v1.0/candidate') || url.includes('/api/v1.0/question') ||
        url.includes('/api/v1.0/file') || url.includes('/api/v1.0/auth/')) {
      try {
        const body = await res.json();
        apiResponses.push({ status: res.status(), url, method: res.request().method(), body });
      } catch {
        apiResponses.push({ status: res.status(), url, method: res.request().method() });
      }
    }
  });

  // === TEST 1: Quotation Form (protected) ===
  console.log('=== TEST 1: Quotation Form (protected, /quotation) ===');
  const loggedIn = await login(page);
  console.log('Logged in:', loggedIn);

  if (loggedIn) {
    await page.goto(`${BASE}/quotation`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(8000);

    await page.locator('input[name="name"]').first().fill('Nguyễn Văn Login');
    await page.locator('input[name="organization_name"]').first().fill('Công ty Login TNHH');
    await page.locator('input[type="email"]').first().fill('login.test@example.com');
    await page.locator('input[name="phone_number"]').first().fill('0901234567');
    await page.locator('input[name="address"]').first().fill('456 Đường Login, Quận 1, TP.HCM');
    await page.locator('input[name="tax_code"]').first().fill('0123456789');
    await page.locator('input[name="contact_person"]').first().fill('Trần Contact');
    console.log('Filled all fields');

    await page.locator('button[type="submit"]').last().click();
    console.log('Clicked submit');
    await page.waitForTimeout(5000);

    const qRes = apiResponses.filter(r => r.url.includes('/api/v1.0/quotation') && r.method === 'POST' && !r.url.includes('public'));
    console.log('Quotation POST responses:', qRes.length);
    qRes.forEach(r => console.log(`  Status: ${r.status} - Message: ${r.body?.message || 'N/A'}`));

    const toast1 = await page.locator('[data-sonner-toast]').count();
    if (toast1 > 0) {
      const toastText = await page.locator('[data-sonner-toast]').first().textContent();
      console.log(`Toast: ${toastText?.substring(0, 100)}`);
    } else {
      console.log('No toast shown');
    }
  } else {
    console.log('SKIP: Could not login');
  }

  await context.clearCookies();
  apiResponses.length = 0;

  // === TEST 2: Dynamic Contact Form ===
  console.log('\n=== TEST 2: Dynamic Contact Form (/contact/lien-he-kepler) ===');
  await page.goto(`${BASE}/contact/lien-he-kepler`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);

  await page.locator('input[name="name"]').first().fill('Dynamic Contact Test');
  await page.locator('input[type="email"]').first().fill('dynamic.test@example.com');
  await page.locator('input[name="phone_number"]').first().fill('0987654321');
  await page.locator('textarea[name="content"]').first().fill('Test dynamic contact form');
  console.log('Filled form');

  await page.locator('button[type="submit"]').last().click();
  console.log('Clicked submit');
  await page.waitForTimeout(5000);

  const cRes = apiResponses.filter(r => r.url.includes('/api/v1.0/contact') && r.method === 'POST');
  console.log('Contact POST responses:', cRes.length);
  cRes.forEach(r => console.log(`  Status: ${r.status} - Message: ${r.body?.message || 'N/A'}`));

  const toast2 = await page.locator('[data-sonner-toast]').count();
  if (toast2 > 0) {
    const toastText2 = await page.locator('[data-sonner-toast]').first().textContent();
    console.log(`Toast: ${toastText2?.substring(0, 100)}`);
  } else {
    console.log('No toast shown');
  }

  apiResponses.length = 0;

  // === TEST 3: Question Form (/careers) ===
  console.log('\n=== TEST 3: Question Form (/careers) ===');
  await page.goto(`${BASE}/careers`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(15000);

  // List all buttons to find question button
  const allButtons = await page.locator('button').allTextContents();
  console.log('All buttons:', allButtons.filter(t => t.trim().length > 0));

  // Look for question button with icon or text
  let qModalOpened = false;
  // Try icon-based
  const qIconBtn = page.locator('button:has(svg.lucide-message-circle-question-mark)');
  if (await qIconBtn.count() > 0) {
    await qIconBtn.first().click();
    await page.waitForTimeout(2000);
    qModalOpened = true;
    console.log('Opened question modal via icon button');
  }

  if (!qModalOpened) {
    // Try text-based
    for (const text of allButtons) {
      const lower = text.toLowerCase().trim();
      if (lower.includes('gửi câu hỏi') || lower.includes('hỏi đáp') || lower.includes('question')) {
        const btn = page.locator('button').filter({ hasText: text.trim() }).first();
        if (await btn.count() > 0) {
          await btn.click();
          await page.waitForTimeout(2000);
          qModalOpened = true;
          console.log(`Opened question modal via button: "${text.trim()}"`);
          break;
        }
      }
    }
  }

  if (qModalOpened) {
    const modal = page.locator('[role="dialog"]');
    const modalVisible = await modal.first().isVisible().catch(() => false);
    console.log(`Question modal visible: ${modalVisible}`);

    if (modalVisible) {
      await page.locator('input[name="name"]').first().fill('Question Test User');
      await page.locator('input[name="phone_number"]').first().fill('0909876543');
      await page.locator('input[type="email"]').first().fill('question.test@example.com');
      await page.locator('input[name="address"]').first().fill('789 Đường Question, TP.HCM');
      await page.locator('textarea[name="question"]').first().fill('Tôi muốn hỏi về cơ hội việc làm tại Kepler?');
      console.log('Filled question form');

      await page.locator('button[type="submit"]').last().click();
      console.log('Clicked submit');
      await page.waitForTimeout(5000);

      const qRes2 = apiResponses.filter(r => r.url.includes('/api/v1.0/question') && r.method === 'POST');
      console.log('Question POST responses:', qRes2.length);
      qRes2.forEach(r => console.log(`  Status: ${r.status} - Message: ${r.body?.message || 'N/A'}`));

      const toast3 = await page.locator('[data-sonner-toast]').count();
      if (toast3 > 0) {
        const toastText3 = await page.locator('[data-sonner-toast]').first().textContent();
        console.log(`Toast: ${toastText3?.substring(0, 100)}`);
      } else {
        console.log('No toast shown');
      }
    } else {
      console.log('Modal did not open properly');
    }
  } else {
    console.log('SKIP: No question button found');
  }

  apiResponses.length = 0;

  // === TEST 4: Candidate Application Form (/careers) ===
  console.log('\n=== TEST 4: Candidate Application Form (/careers) ===');
  await page.goto(`${BASE}/careers`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(15000);

  // List all buttons
  const allButtons2 = await page.locator('button').allTextContents();
  console.log('All buttons:', allButtons2.filter(t => t.trim().length > 0));

  // Find apply button
  let appModalOpened = false;
  for (const text of allButtons2) {
    const lower = text.toLowerCase().trim();
    if (lower.includes('ứng tuyển') || lower.includes('nộp hồ sơ') || lower.includes('gửi hồ sơ')) {
      const btn = page.locator('button').filter({ hasText: text.trim() }).first();
      if (await btn.count() > 0) {
        await btn.click();
        await page.waitForTimeout(2000);
        appModalOpened = true;
        console.log(`Opened application modal via button: "${text.trim()}"`);
        break;
      }
    }
  }

  if (appModalOpened) {
    const modal = page.locator('[role="dialog"]');
    const modalVisible = await modal.first().isVisible().catch(() => false);
    console.log(`Application modal visible: ${modalVisible}`);

    if (modalVisible) {
      await page.locator('input[name="name"]').first().fill('Candidate Test User');
      await page.locator('input[name="phone"]').first().fill('0901234567');
      await page.locator('input[type="email"]').first().fill('candidate.test@example.com');
      await page.locator('input[name="address"]').first().fill('123 Đường Candidate, TP.HCM');
      await page.locator('input[name="foreign_language"]').first().fill('Tiếng Anh - IELTS 7.0');
      await page.locator('input[name="it_skill"]').first().fill('Word, Excel, PowerPoint');
      await page.locator('input[name="major"]').first().fill('Quản trị kinh doanh');
      await page.locator('input[name="position"]').first().fill('Chuyên viên Marketing');
      console.log('Filled candidate form fields');

      // Select degree
      const degreeSelect = page.locator('select').first();
      if (await degreeSelect.count() > 0) {
        await degreeSelect.selectOption('Đại học');
        console.log('Selected degree: Đại học');
      } else {
        const combobox = page.locator('[role="combobox"]').first();
        if (await combobox.count() > 0) {
          await combobox.click();
          await page.waitForTimeout(500);
          await page.locator('[role="option"]:has-text("Đại học")').click();
          console.log('Selected degree via combobox');
        }
      }

      // Select recruitment position
      const posSelect = page.locator('select').nth(1);
      if (await posSelect.count() > 0) {
        const options = await posSelect.locator('option').allTextContents();
        console.log('Position options:', options.slice(0, 5));
        if (options.length > 1) await posSelect.selectOption({ index: 1 });
      } else {
        const posCombo = page.locator('[role="combobox"]').nth(1);
        if (await posCombo.count() > 0) {
          await posCombo.click();
          await page.waitForTimeout(500);
          const firstOpt = page.locator('[role="option"]').first();
          if (await firstOpt.count() > 0) await firstOpt.click();
        }
      }

      // Upload dummy file
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await fileInput.first().setInputFiles({
          name: 'test-cv.pdf',
          mimeType: 'application/pdf',
          buffer: Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n'),
        });
        console.log('Uploaded test CV');
        await page.waitForTimeout(1000);
      }

      await page.locator('button[type="submit"]').last().click();
      console.log('Clicked submit');
      await page.waitForTimeout(8000);

      const fileRes = apiResponses.filter(r => r.url.includes('/api/v1.0/file') && r.method === 'POST');
      const candidateRes = apiResponses.filter(r => r.url.includes('/api/v1.0/candidate') && r.method === 'POST');
      console.log('File POST responses:', fileRes.length);
      fileRes.forEach(r => console.log(`  Status: ${r.status} - Message: ${r.body?.message || 'N/A'}`));
      console.log('Candidate POST responses:', candidateRes.length);
      candidateRes.forEach(r => console.log(`  Status: ${r.status} - Message: ${r.body?.message || 'N/A'}`));

      const toast4 = await page.locator('[data-sonner-toast]').count();
      if (toast4 > 0) {
        const toastText4 = await page.locator('[data-sonner-toast]').first().textContent();
        console.log(`Toast: ${toastText4?.substring(0, 100)}`);
      } else {
        console.log('No toast shown');
      }
    } else {
      console.log('Application modal did not open properly');
    }
  } else {
    console.log('SKIP: No apply button found');
  }

  await page.waitForTimeout(2000);
  await browser.close();
  console.log('\n=== All tests complete ===');
})();
