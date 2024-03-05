const { By, Builder, Key } = require("selenium-webdriver")
const assert = require("assert")

describe("add note", function() {
    it("should add a note and display on the page", async function() {
        // Testlogik hier
        // hier kommt Silneium
        let driver = await new Builder().forBrowser('chrome').build();
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