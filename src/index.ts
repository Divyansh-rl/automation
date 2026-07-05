import { connectBrowser } from "./browser/connect.js";
import { logger } from "./utils/logger.js";
import { config } from "./config/config.js";
import { runCatalogFlow } from "./catalog/flow.js";

async function main() {
  const { page } = await connectBrowser();

  logger.info("Opening supplier dashboard...");

  await page.goto(config.dashboardUrl, {
    waitUntil: "domcontentloaded",
  });

  logger.info("Waiting for dashboard to load...");

  await page
    .locator("div")
    .filter({
      hasText: /^Catalog Uploads$/,
    })
    .nth(1)
    .waitFor({
      state: "visible",
      timeout: 30000,
    });

  logger.success("Dashboard opened.");

  await runCatalogFlow(page);

  logger.success("Flow completed.");
}

main().catch((err) => {
  logger.error(err instanceof Error ? err.message : String(err));
});