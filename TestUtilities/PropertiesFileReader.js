const PropertyReader = require("properties-reader");

class PropertiesFileReader {
    constructor(pathOfTheFile) {
        this.pathOfTheFile = pathOfTheFile;
        this.prop = PropertyReader(this.pathOfTheFile); // Load properties file
    }

    getProperty(propertyName) {
        return this.prop.get(propertyName); // Access the property directly
    }
}

module.exports = PropertiesFileReader;
