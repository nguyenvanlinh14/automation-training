import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "mobile chrome",
      use: {
        ...devices["Pixel 5"],
        launchOptions: {
          slowMo: 1200,
        },
      },
    },
    // {
    //   name: "chrome",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["iPhone 17 Pro"] },
    // },
  ],
});
