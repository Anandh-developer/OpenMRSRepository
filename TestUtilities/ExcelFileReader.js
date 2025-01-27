const XLSX = require("xlsx");

class ExcelFileReader {
    workbook;
    sheet;

    constructor(filePath, sheetName, columnName) {
        this.filePath = filePath;//assign filePath as global using this keyword
        this.sheetName = sheetName;//assign sheetName as global using this keyword
        this.columnName = columnName;//assign columnName as global using this keyword
        this.workbook = XLSX.readFile(filePath);//Pass the file path to read file method to load the data
        this.sheet = this.workbook.Sheets[this.sheetName];//locate the mentioned sheet to retrive the data from the particular sheet
    }
    getTestData(dataset) {
        let jsonSheetValue = XLSX.utils.sheet_to_json(this.sheet);//convert sheet value to json for fetch the required dataset
        let data;//data will convert to map and return for our test case
        jsonSheetValue.forEach((jsonValue) => {
            if (jsonValue[this.columnName] === dataset) {//match column name and data set eatch other
                data = new Map(Object.entries(jsonValue))//matched data set will be converted to mapp like key value pair
            }
        });
        for (const [keys, value] of data.entries()) {
            data.set(keys, String(value))//convert all the values to string to use it in our test script
        }
        return data;
    }
    getListOfDataSetID() {
        let jsonSheetValue = XLSX.utils.sheet_to_json(this.sheet);
        let lisOfDataSetID = [];
        //fetch only data set IDs for do the data parameterization
        jsonSheetValue.forEach((data) => {
            lisOfDataSetID.push(data[this.columnName]);
        })
        //return the list of data
        return lisOfDataSetID;

    }
}
module.exports = ExcelFileReader;