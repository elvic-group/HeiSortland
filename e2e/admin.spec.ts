import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers/auth";

test.describe("Adminpanel", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("Admin-dashboard laster inn", async ({ page }) => {
    await page.goto("/admin");

    await expect(
      page.getByRole("heading", { name: /adminoversikt/i }),
    ).toBeVisible({ timeout: 15_000 });

    // Sjekk at sidebar er synlig (desktop)
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();
  });

  test("Admin-sidebaren inneholder alle lenkene", async ({ page }) => {
    await page.goto("/admin");

    const sidebar = page.locator("aside");

    await expect(
      sidebar.getByRole("link", { name: /oversikt/i }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("link", { name: /^arrangementer$/i }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("link", { name: /^steder$/i }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("link", { name: /^brukere$/i }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole("link", { name: /^arrangører$/i }),
    ).toBeVisible();

    // Tilbake til forsiden-lenke
    await expect(
      sidebar.getByRole("link", { name: /til forsiden/i }),
    ).toBeVisible();
  });

  test("Admin-dashboard viser statistikker", async ({ page }) => {
    await page.goto("/admin");

    // Vent på at dashboard-data er lastet
    await expect(
      page.getByText(/arrangementer/i).first(),
    ).toBeVisible({ timeout: 15_000 });

    // Sjekk at statistikk-kortene er synlige
    await expect(page.getByText(/venter på godkjenning/i)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText(/godkjente/i)).toBeVisible();
  });

  test("Kan navigere til arrangementsadministrasjon fra sidebaren", async ({
    page,
  }) => {
    await page.goto("/admin");

    const sidebar = page.locator("aside");
    const arrangementsLink = sidebar.getByRole("link", {
      name: /^arrangementer$/i,
    });

    await expect(arrangementsLink).toBeVisible();
    await arrangementsLink.click();

    await expect(page).toHaveURL(/\/admin\/arrangementer/);
    await expect(
      page.getByRole("heading", { name: /^arrangementer$/i }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("Arrangementsadministrasjon viser tabell med arrangementer", async ({
    page,
  }) => {
    await page.goto("/admin/arrangementer");

    // Vent på at tabellen er lastet
    await expect(page.locator("table")).toBeVisible({ timeout: 15_000 });

    // Sjekk at tabellen har riktige kolonneoverskrifter
    await expect(
      page.getByRole("columnheader", { name: /tittel/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: /status/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: /handlinger/i }),
    ).toBeVisible();
  });
});
