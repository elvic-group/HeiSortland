import { Page, expect } from "@playwright/test";

/**
 * Logger inn med gitte credentials via /logg-inn-siden.
 */
export async function login(
  page: Page,
  email: string,
  password: string,
): Promise<void> {
  await page.goto("/logg-inn");
  await expect(
    page.getByRole("heading", { name: /logg inn/i }),
  ).toBeVisible();

  await page.getByPlaceholder("din@epost.no").fill(email);
  await page.getByPlaceholder("••••••••").fill(password);

  await page.getByRole("button", { name: /^logg inn$/i }).click();

  // Vent på innlogging – enten redirect til hovedsiden eller en annen side
  await page.waitForURL("**/*", { timeout: 15_000 });

  // Verifiser at brukermenyen vises (avatar med initialer)
  await expect(
    page.locator("header").getByRole("button").filter({
      has: page.locator("span.w-7.h-7"),
    }),
  ).toBeVisible({ timeout: 10_000 });
}

/**
 * Logger ut via headerens brukermeny.
 */
export async function logout(page: Page): Promise<void> {
  // Åpne brukermeny
  await page
    .locator("header")
    .getByRole("button")
    .filter({ has: page.locator("span.w-7.h-7") })
    .click();

  // Klikk "Logg ut"
  await page.getByRole("button", { name: /logg ut/i }).click();

  // Verifiser at "Logg inn"-lenken dukker opp igjen
  await expect(page.getByRole("link", { name: /logg inn/i })).toBeVisible({
    timeout: 5_000,
  });
}

/**
 * Logger inn som admin-bruker.
 */
export async function loginAsAdmin(page: Page): Promise<void> {
  await login(page, "admin@sortland.no", "HeiSortland2026!");
}
