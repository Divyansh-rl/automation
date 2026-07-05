import { Page } from "playwright";
import { logger } from "../utils/logger.js";

export async function uploadImages(
  page: Page,
  imagePaths: string[]
) {
  logger.info("Opening image uploader...");

  const chooserPromise = page.waitForEvent("filechooser");

  await page
    .getByRole("button", {
      name: "Add Product Images",
    })
    .click();

  const chooser = await chooserPromise;

  logger.info("Uploading images...");

  await chooser.setFiles(imagePaths);

  logger.success("Images uploaded.");
}

export async function continueAfterImages(page: Page) {
  logger.info("Proceeding to product details...");

  await page
    .getByRole("button", {
      name: "Continue",
    })
    .click();

  logger.success("Navigated to product details.");
}