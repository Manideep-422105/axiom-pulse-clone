import { test, expect } from '@playwright/test';

test('pulse page visual regression', async ({ page }) => {
  // 1. Go to your local development server
  await page.goto('http://localhost:3000/'); // Make sure this URL matches your local setup

  // 2. Wait for the page to fully load (crucial for accurate screenshots)
  // We wait for the "New Pairs" text to appear so we know data is ready
  await expect(page.getByText('New Pairs')).toBeVisible();
  
  // Optional: Wait for fonts to load or specific animations to settle
  await page.waitForTimeout(1000); 

  // 3. Take the screenshot and compare it with the baseline
  // On the first run, this will simply SAVE the screenshot as the "Golden Standard".
  // On future runs, it will compare against this file.
  await expect(page).toHaveScreenshot('axiom-replica.png', {
    maxDiffPixels: 100, // Allows tiny rendering differences (antialiasing)
    threshold: 0.2,     // Sensitivity
    fullPage: true,     // Captures the whole scrollable area if needed, or remove for viewport only
  });
});