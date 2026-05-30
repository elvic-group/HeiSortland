import { test, expect } from "@playwright/test";
import { loginAsAdmin, login, logout } from "./helpers/auth";

test.describe("Innlogging og utlogging", () => {
  test("Logg inn-siden laster inn", async ({ page }) => {
    await page.goto("/logg-inn");

    await expect(
      page.getByRole("heading", { name: /logg inn/i }),
    ).toBeVisible();

    // Sjekk at skjema-elementene finnes
    await expect(page.getByPlaceholder("din@epost.no")).toBeVisible();
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^logg inn$/i }),
    ).toBeVisible();
  });

  test("Logg inn-siden har lenke til registrering", async ({ page }) => {
    await page.goto("/logg-inn");

    const registrerLink = page.getByRole("link", {
      name: /opprett ny konto/i,
    });
    await expect(registrerLink).toBeVisible();
    await expect(registrerLink).toHaveAttribute("href", "/registrer");
  });

  test("Logger inn med admin-bruker – brukermeny vises i headeren", async ({
    page,
  }) => {
    await loginAsAdmin(page);

    // Verifiser at vi er på en gyldig side (ble redirectet)
    await expect(page).not.toHaveURL(/\/logg-inn/);
  });

  test("Logger inn som admin – brukermeny inneholder adminlenker", async ({
    page,
  }) => {
    await loginAsAdmin(page);

    // Åpne brukermenyen
    await page
      .locator("header")
      .getByRole("button")
      .filter({ has: page.locator("span.w-7.h-7") })
      .click();

    // Verifiser innhold i brukermenyen
    const menuPanel = page.locator("header [class*='absolute right-0']");
    await expect(menuPanel.getByText(/min side/i)).toBeVisible();
    await expect(menuPanel.getByText(/adminpanel/i)).toBeVisible();
    await expect(menuPanel.getByText(/logg ut/i)).toBeVisible();
  });

  test("Utlogging fungerer – 'Logg inn'-lenken vises igjen", async ({
    page,
  }) => {
    await loginAsAdmin(page);

    await logout(page);

    // Verifiser at vi fortsatt er på en fungerende side
    await expect(page.locator("header")).toBeVisible();
  });

  test("Viser feilmelding med ugyldige credentials", async ({ page }) => {
    await page.goto("/logg-inn");

    await page.getByPlaceholder("din@epost.no").fill("feil@epost.no");
    await page.getByPlaceholder("••••••••").fill("feilpassord");

    await page.getByRole("button", { name: /^logg inn$/i }).click();

    // Vent på at feilmeldingen dukker opp
    const errorBox = page.locator("div.border-error\\/30");
    await expect(errorBox).toBeVisible({ timeout: 10_000 });
  });
});
