import { Page } from "playwright";
import { logger } from "../utils/logger.js";

export async function selectSavedCategory(page: Page) {
  logger.info("Waiting for saved category...");

  const category = page.getByTestId("your-categories-list");

  await category.waitFor({
    state: "visible",
    timeout: 30000,
  });

  logger.success("Category is visible.");

  console.log("Count:", await category.count());

  console.log("Visible:", await category.isVisible());

  console.log("Enabled:", await category.isEnabled());

  await category.scrollIntoViewIfNeeded();

  logger.info("Clicking...");

  await category.click({
    timeout: 30000,
  });

  logger.success("Category clicked.");
}