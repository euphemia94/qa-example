import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should show task table", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("should open create task dialog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "New task" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Create task" }),
    ).toBeVisible();
  });

  test("should have theme toggle", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Toggle theme" }),
    ).toBeVisible();
  });
});
