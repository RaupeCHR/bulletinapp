const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

let options = new chrome.Options();
options.addArguments(
    'headless', 
    'no-sandbox', 
    'disable-dev-shm-usage' 
);
+
describe("add note", function() {
  jest.setTimeout(30000); // Setzt das Timeout auf 30 Sekunden

  it("should add a note and display on the page", async function() {
        // Testlogik hier
        // hier kommt Silneium
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
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