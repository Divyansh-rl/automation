import { Page } from "playwright";
import { logger } from "../utils/logger.js";

export async function openProductPage(
  page: Page,
  productNumber: number
) {
  logger.info(`Opening Product ${productNumber}...`);

  await page
    .locator("div")
    .filter({
      hasText: new RegExp(`^Product ${productNumber}$`),
    })
    .click();

  logger.success(`Product ${productNumber} opened.`);
}

export async function saveAndGoBack(page: Page) {
  logger.info("Saving catalog and returning...");

  await page.getByRole("button", {
    name: "Save and Go Back",
  }).click();

  logger.success("Catalog saved.");
}