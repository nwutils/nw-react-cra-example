import path from "node:path";

import { findpath } from "nw";
import { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { afterAll, describe, expect, it } from "vitest";

const { Driver, ServiceBuilder, Options } = chrome;

describe("e2e", async () => {
    let driver = undefined;

    beforeAll(async () => {
        const options = new Options();
        const args = [
            `nwapp=${path.resolve(
                "out",
                "nwjs",
                "package.nw"
            )}`,
            "headless=new",
        ];
        options.addArguments(args);

        const service = new ServiceBuilder(findpath('chromedriver')).build();

        driver = Driver.createSession(options, service);
    });

    it("renders title", async () => {
        const titleElement = await driver.findElement(By.className('title'));
        const title = await titleElement.getText();
        expect(title, "NW.js React Example");
    });

    afterAll(() => {
        driver.quit();
    });
});
