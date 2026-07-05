import { chromium, Browser, BrowserContext, Page } from "playwright";
import { config } from "../config/config.js";

export interface BrowserSession {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export async function connectBrowser(): Promise<BrowserSession> {
  console.log("Connecting to Brave...");

  const browser = await chromium.connectOverCDP(config.cdpUrl);

  const contexts = browser.contexts();

  if (contexts.length === 0) {
    throw new Error("No browser context found.");
  }

  const context = contexts[0];

  let page = context.pages()[0];

  if (!page) {
    page = await context.newPage();
  }

  console.log("Connected successfully.");

  return {
    browser,
    context,
    page,
  };
}