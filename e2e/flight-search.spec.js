import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('onboardingCompleted', 'true');
  });
});

test.describe('Flight Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display search form with all fields', async ({ page }) => {
    await expect(page.getByRole('button', { name: /round trip/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /one way/i })).toBeVisible();
    await expect(page.getByLabel(/origin airport code/i).first()).toBeVisible();
    await expect(page.getByLabel(/destination airport code/i).first()).toBeVisible();
    await expect(page.getByLabel(/departure date/i).first()).toBeVisible();
  });

  test('should search for flights and display results', async ({ page }) => {
    await page.getByRole('button', { name: /search/i }).click();

    await expect(page.getByRole('region', { name: /flight search results/i })).toBeVisible();
    await expect(page.getByRole('list', { name: /flight options/i })).toBeVisible();
  });

  test('should toggle between round trip and one way', async ({ page }) => {
    const roundTripBtn = page.getByRole('button', { name: /round trip/i });
    const oneWayBtn = page.getByRole('button', { name: /one way/i });

    await expect(roundTripBtn).toHaveAttribute('aria-pressed', 'true');

    await oneWayBtn.click();

    await expect(oneWayBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByLabel(/return date/i)).not.toBeVisible();

    await roundTripBtn.click();

    await expect(roundTripBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByLabel(/return date/i)).toBeVisible();
  });

  test('should swap origin and destination', async ({ page }) => {
    const originInput = page.getByLabel(/origin airport code/i).first();
    const destinationInput = page.getByLabel(/destination airport code/i).first();

    const initialOrigin = await originInput.inputValue();
    const initialDestination = await destinationInput.inputValue();

    await page.getByLabel(/swap origin and destination/i).first().click();

    await expect(originInput).toHaveValue(initialDestination);
    await expect(destinationInput).toHaveValue(initialOrigin);
  });
});

test.describe('Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /search/i }).click();
    await page.waitForSelector('[role="list"][aria-label="Flight options"]');
  });

  test('should filter by stops', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByLabel(/stops filter/i).click();
      await page.getByRole('option', { name: /nonstop/i }).click();
    } else {
      await page.getByRole('button', { name: /filter by direct/i }).click();
    }

    await page.waitForTimeout(500);
  });

  test('should sort flights by different criteria', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByLabel(/sort by duration/i).click();
    } else {
      await page.getByLabel(/sort by/i).click();
      await page.getByRole('option', { name: /duration/i }).click();
    }

    await page.waitForTimeout(500);
  });
});

test.describe('Price Calendar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /search/i }).click();
    await page.waitForSelector('[role="region"][aria-label="Price calendar"]');
  });

  test('should display price calendar with prices', async ({ page }) => {
    await expect(page.getByRole('region', { name: /price calendar/i })).toBeVisible();
  });

  test('should navigate between weeks', async ({ page }) => {
    const nextButton = page.getByLabel(/next week/i);
    const prevButton = page.getByLabel(/previous week/i);

    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();

    await nextButton.click();
    await page.waitForTimeout(300);

    await prevButton.click();
    await page.waitForTimeout(300);
  });
});

test.describe('Dark/Light Mode', () => {
  test('should toggle between dark and light mode', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.getByLabel(/switch to (dark|light) mode/i);
    await expect(themeToggle).toBeVisible();

    const initialLabel = await themeToggle.getAttribute('aria-label');

    await themeToggle.click();
    await page.waitForTimeout(300);

    const newLabel = await themeToggle.getAttribute('aria-label');
    expect(newLabel).not.toBe(initialLabel);
  });
});

test.describe('Responsive Design', () => {
  test('should display mobile layout on small screens', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Test only for mobile');

    await page.goto('/');

    await expect(page.locator('text=Spotter')).toBeVisible();
    await expect(page.locator('text=Spotter Flight Search')).not.toBeVisible();
  });

  test('should display desktop layout on large screens', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Test only for desktop');

    await page.goto('/');

    await expect(page.locator('text=Spotter Flight Search')).toBeVisible();
  });
});

test.describe('Keyboard Navigation', () => {
  test('should navigate through search form with keyboard', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');

    const activeElement = page.locator(':focus');
    await expect(activeElement).toBeVisible();
  });

  test('should expand flight card with keyboard', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).click();
    await page.waitForSelector('[role="button"][aria-expanded]');

    const flightCards = page.locator('[role="button"][aria-expanded]');
    const firstCard = flightCards.first();

    await expect(firstCard).toHaveAttribute('aria-expanded', 'false');
    await firstCard.focus();
    await page.keyboard.press('Enter');

    await expect(firstCard).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('Accessibility', () => {
  test('should have no critical accessibility violations on home page', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });

  test('should have no critical accessibility violations on results page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /search/i }).click();
    await page.waitForSelector('[role="list"][aria-label="Flight options"]');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast'])
      .analyze();

    expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus-visible');
    const outlineStyle = await focusedElement.evaluate(el => {
      return window.getComputedStyle(el).outline;
    });

    expect(outlineStyle).not.toBe('none');
  });
});
