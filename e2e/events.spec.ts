import { test, expect } from "@playwright/test";

test.describe("Arrangementssiden", () => {
  test("Arrangementssiden laster inn", async ({ page }) => {
    await page.goto("/arrangementer");

    await expect(
      page.getByRole("heading", { name: /hva skjer i sortland/i }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("Søkefeltet er synlig", async ({ page }) => {
    await page.goto("/arrangementer");

    const searchInput = page.getByPlaceholder(/søk/i);
    await expect(searchInput).toBeVisible({ timeout: 10_000 });
  });

  test("Liste-/kalendervisning-toggle finnes og fungerer", async ({
    page,
  }) => {
    await page.goto("/arrangementer");

    // Vent på at siden er lastet
    await expect(
      page.getByRole("heading", { name: /hva skjer i sortland/i }),
    ).toBeVisible({ timeout: 10_000 });

    const listeButton = page.getByRole("button", { name: /liste/i });
    const kalenderButton = page.getByRole("button", { name: /kalender/i });

    await expect(listeButton).toBeVisible();
    await expect(kalenderButton).toBeVisible();

    // Klikk på kalender-knappen
    await kalenderButton.click();

    // Kalender-knappen skal nå ha active-styling (bg-ink)
    await expect(kalenderButton).toHaveClass(/bg-ink/);

    // Bytt tilbake til liste
    await listeButton.click();
    await expect(listeButton).toHaveClass(/bg-ink/);
  });

  test("Kategorifiltre er synlige", async ({ page }) => {
    await page.goto("/arrangementer");

    await expect(
      page.getByRole("heading", { name: /hva skjer i sortland/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Sjekk at filter-seksjonen finnes
    const filterSection = page.locator("text=Kategorier").first();
    await expect(filterSection).toBeVisible({ timeout: 5_000 });
  });

  test("Navigasjon til arrangementside fra kort fungerer", async ({
    page,
  }) => {
    await page.goto("/arrangementer");

    await expect(
      page.getByRole("heading", { name: /hva skjer i sortland/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Finn et arrangementskort og klikk på det
    const firstEventLink = page
      .locator('a[href^="/arrangementer/"]')
      .first();

    if (await firstEventLink.isVisible({ timeout: 5_000 })) {
      const href = await firstEventLink.getAttribute("href");
      await firstEventLink.click();
      await expect(page).toHaveURL(new RegExp(href || "arrangementer"));
    }
  });
});
