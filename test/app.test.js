const { By, Builder, Key, until } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const assert = require("assert")

describe("add note", function() {
    it("should add a note and display on the page", async function() {
        let options = new chrome.Options();
        options.addArguments("headless");
        options.addArguments("disable-gpu");

        let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
        
        
        try {
            await driver.get('http://localhost:3000');
            await driver.findElement(By.xpath('//input')).sendKeys('Hello Selenium', Key.RETURN);

            let note = await driver.findElement(By.xpath("//*[@id='root']/div/div"))
                                   .getText()
            console.log({ note })
            assert.equal(note, 'Hello Selenium\nX')
            console.log("TEST PASSED!")
        } catch (e) {
            console.error(e)
        } finally {
            await driver.quit();
        }
    })
})