import { connectBrowser } from "./browser/connect.js";
import { logger } from "./utils/logger.js";
import { config } from "./config/config.js";
import { runCatalogFlow } from "./catalog/flow.js";

async function main() {
  const { page } = await connectBrowser();

  logger.info("Opening catalog page...");

  await page.goto(config.listingUrl, {
    waitUntil: "domcontentloaded",
  });

  logger.info("Waiting for category page to load...");

  await page.getByTestId("your-categories-list").waitFor({
    state: "visible",
    timeout: 30000,
  });

  logger.success("Catalog page opened.");

  await runCatalogFlow(page);

  logger.success("Flow completed.");
}

main().catch((err) => {
  logger.error(err instanceof Error ? err.message : String(err));
});