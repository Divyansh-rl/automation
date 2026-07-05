import { Page } from "playwright";
import { logger } from "../utils/logger.js";

export async function openSupplierHub(page: Page) {
  logger.info("Opening Supplier Hub...");

  await page.goto("https://supplier.meesho.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForLoadState("networkidle");

  logger.success("Supplier Hub opened.");
}