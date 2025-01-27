const { timeout } = require("../playwright.config");
const PropertyFileReader=require("../TestUtilities/PropertiesFileReader");
class WaitUtils{
page;
propFileReader
    constructor(page)
    {
        this.page=page;
        this.propFileReader= new PropertyFileReader("TestDataFiles/Data.properties");
    }
    async waitForLocator(locator,waitTime=this.propFileReader.getProperty("Timeouts"))
    {

        await this.page.waitForSelector(locator,{timeout:waitTime,state:'visible'})
    }
}
module.exports=WaitUtils;