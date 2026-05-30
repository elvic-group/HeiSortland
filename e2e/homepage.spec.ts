import { test, expect } from "@playwright/test";

test.describe("Hjemmesiden", () => {
  test("Siden laster inn korrekt", async ({ page }) => {
    await page.goto("/");

    // Verifiser at headeren er synlig med logo
    const header = page.locator("header");
    await expect(header).toBeVisible();

    const logo = header.getByRole("link", { name: /hei.*sortland/i });
    await expect(logo).toBeVisible();
  });

  test("Hero-seksjonen inneholder overskrift", async ({ page }) => {
    await page.goto("/");

    const heroHeadline = page.locator("h1").filter({
      hasText: /finn det som skjer/i,
    });
    await expect(heroHeadline).toBeVisible();
  });

  test("Navigasjonslenkene i headeren eksisterer", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("header nav");

    // Sjekk desktopp-navigasjonslenker
    const hvaSkjerLink = nav.getByRole("link", { name: "Hva skjer" });
    const kategorierLink = nav.getByRole("link", { name: "Kategorier" });
    const stederLink = nav.getByRole("link", { name: "Steder" });
    const nyISortlandLink = nav.getByRole("link", {
      name: "Ny i Sortland",
    });

    await expect(hvaSkjerLink).toBeVisible();
    await expect(kategorierLink).toBeVisible();
    await expect(stederLink).toBeVisible();
    await expect(nyISortlandLink).toBeVisible();
  });

  test('"Se hva som skjer"-knappen går til arrangementssiden', async ({
    page,
  }) => {
    await page.goto("/");

    const ctaButton = page.getByRole("link", { name: /se hva som skjer/i });
    await expect(ctaButton).toBeVisible();

    await ctaButton.click();
    await expect(page).toHaveURL(/\/arrangementer/);
  });

  test('Footer er synlig', async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible({ timeout: 5_000 });
  });
});
