import { test, expect } from '@playwright/test';

const BASE = 'https://swiftsage.onrender.com';

async function registerAndLogin(page, prefix) {
  const ts = Date.now() + Math.floor(Math.random() * 100000);
  const email = `${prefix}_${ts}@test.com`;
  const phone = `07${String(ts).slice(-8)}`;

  await page.goto(`${BASE}/signup`);
  await page.fill('input[name="name"]', `${prefix} User`);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="phone"]', phone);
  await page.fill('input[name="password"]', 'TestPass123!');
  await page.selectOption('select[name="community"]', { index: 1 });
  await page.check('input[id="terms"]');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  await page.goto(`${BASE}/login`);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'TestPass123!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
}

async function loginAdmin(page) {
  await page.goto(`${BASE}/login`);
  await page.fill('input[name="email"]', 'test02@example.com');
  await page.fill('input[name="password"]', 'test02');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
}

test.describe('Landing Page', () => {
  test('loads successfully', async ({ page }) => {
    const resp = await page.goto(BASE);
    expect(resp?.status()).toBe(200);
  });

  test('has login link', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(2000);
    const html = await page.content();
    expect(html).toContain('login');
  });
});

test.describe('User Registration', () => {
  test('registers a new user', async ({ page }) => {
    const ts = Date.now() + Math.floor(Math.random() * 100000);
    const email = `reg_${ts}@test.com`;
    const phone = `07${String(ts).slice(-8)}`;
    await page.goto(`${BASE}/signup`);
    await page.fill('input[name="name"]', 'Reg User');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="phone"]', phone);
    await page.fill('input[name="password"]', 'TestPass123!');
    await page.selectOption('select[name="community"]', { index: 1 });
    await page.check('input[id="terms"]');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    await page.goto(`${BASE}/login`);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'TestPass123!');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/dashboard|reports|alert|my reports/);
  });

  test('rejects invalid email client-side', async ({ page }) => {
    await page.goto(`${BASE}/signup`);
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('bad-email');
    const isValid = await emailInput.evaluate(el => el.validity.valid);
    expect(isValid).toBe(false);
  });
});

test.describe('User Login & Dashboard', () => {
  test('logs in and accesses dashboard', async ({ page }) => {
    await registerAndLogin(page, 'dash');
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/dashboard|reports|alert|my reports/);
  });

  test('wrong password shows error', async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.fill('input[name="email"]', 'anyone@test.com');
    await page.fill('input[name="password"]', 'wrong');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/invalid|error|fail|credential/);
  });

  test('My Reports page loads', async ({ page }) => {
    await registerAndLogin(page, 'reports');
    await page.goto(`${BASE}/dashboard/my-reports`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/my reports|no reports|loading/);
  });

  test('Alerts page loads', async ({ page }) => {
    await registerAndLogin(page, 'alerts');
    await page.goto(`${BASE}/dashboard/alerts`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/alert|no active alerts|loading/);
  });

  test('user blocked from admin routes', async ({ page }) => {
    await registerAndLogin(page, 'block');
    await page.goto(`${BASE}/admin/reports`);
    await page.waitForTimeout(5000);
    const content = await page.content();
    const hasAdminPanel = content.includes('admin control panel') && content.includes('reports overview');
    expect(hasAdminPanel).toBe(false);
  });
});

test.describe('Admin Login & Panel', () => {
  test('admin reaches admin panel', async ({ page }) => {
    await loginAdmin(page);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/reports overview|admin|manage/);
  });

  test('admin reports page', async ({ page }) => {
    await loginAdmin(page);
    await page.goto(`${BASE}/admin/reports`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/reports overview/);
  });

  test('admin users page', async ({ page }) => {
    await loginAdmin(page);
    await page.goto(`${BASE}/admin/users`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/user management/);
  });

  test('admin alerts page', async ({ page }) => {
    await loginAdmin(page);
    await page.goto(`${BASE}/admin/alerts`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/emergency alerts|create new alert/);
  });

  test('admin map page', async ({ page }) => {
    await loginAdmin(page);
    await page.goto(`${BASE}/admin/map`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/crisis map/);
  });

  test('admin statistics page', async ({ page }) => {
    await loginAdmin(page);
    await page.goto(`${BASE}/admin/statistics`);
    await page.waitForTimeout(3000);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/analytics|total reports/);
  });
});

test.describe('Logout', () => {
  test('user logout clears session', async ({ page }) => {
    await registerAndLogin(page, 'logout');
    await page.goto(`${BASE}/dashboard/my-reports`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => fetch('/auth/logout', { method: 'POST', credentials: 'include' }));
    await page.waitForTimeout(1000);

    const resp = await page.goto(`${BASE}/auth/me`);
    const body = await resp.json();
    expect(body.role).toBeUndefined();
  });

  test('admin logout clears session', async ({ page }) => {
    await loginAdmin(page);
    await page.goto(`${BASE}/admin/reports`);
    await page.waitForTimeout(3000);

    await page.evaluate(() => fetch('/auth/logout', { method: 'POST', credentials: 'include' }));
    await page.waitForTimeout(1000);

    const resp = await page.goto(`${BASE}/auth/me`);
    const body = await resp.json();
    expect(body.role).toBeUndefined();
  });
});
