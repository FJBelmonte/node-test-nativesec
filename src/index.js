const webdriver = require("selenium-webdriver");

const ELECTRON_PATH = "/Applications/ElectronReact.app/Contents/MacOS/ElectronReact";

async function init() {
    const driver = new webdriver.Builder()
        // The "9515" is the port opened by chrome driver.
        .usingServer("http://localhost:9515")
        .withCapabilities({
            "goog:chromeOptions": {
                // Here is the path to your Electron binary.
                binary: ELECTRON_PATH,
            },
        })
        .forBrowser("chrome") // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
        .build();

    //driver.get("");
    driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/form/div[2]/button`)).click();

    await driver.wait(
        () =>
            driver
                .findElement(webdriver.By.xpath(`//*[@id="root"]/div/form/div[3]/textarea`))
                .getText()
                .then((text) => {
                    return text.includes("-----BEGIN PGP PRIVATE KEY BLOCK-----");
                }),

        30000,
        "Batata"
    );
    console.log("Gerou a chave");

    driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/form/div[5]/textarea`)).sendKeys("Olá teste");

    await setTimeout(() => {
        driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/form/div[6]/button`)).click();
    }, 5000);

    //driver.quit();
}

init();
