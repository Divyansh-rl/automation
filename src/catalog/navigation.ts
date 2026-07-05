import { Page } from "playwright";
import { logger } from "../utils/logger.js";

export async function openNewCatalog(page: Page) {
  logger.info("Opening catalog creation...");

  const catalogUploads = page
  .locator("div")
  .filter({
    hasText: /^Catalog Uploads$/,
  })
  .nth(1);

await catalogUploads.waitFor({
  state: "visible",
});

await catalogUploads.click();

  await page.getByRole("button", {
    name: "Add Single Catalog",
  }).click();

  await page
    .getByTestId("your-categories-list")
    .waitFor({
      state: "visible",
      timeout: 30000,
    });

  logger.success("Category page opened.");
}