const { test, expect } = require("@playwright/test");
//Properties file reader class is to fetch the common data like URLs and user name and passwords
const PropertyFileReader = require("../TestUtilities/PropertiesFileReader");
//To get the test data from the .xlsx format file
const ExcelFileReader = require("../TestUtilities/ExcelFileReader");
//Import Locator from the classes
const LoginLocatos = require("../OpenMRSLocators/LoginScreenLocators");
const RegisterPatientLocators = require("../OpenMRSLocators/RegisterPatientLocators");

const VisitorScreenLocator = require("../OpenMRSLocators/VisitScreenLocators");
//Data related functions from the HelperFunctions class
const HelperFunctions = require("../TestUtilities/HelperFunctions");
//Import part to fetch the file from the mentioned location
const path = require("path");

//Inport Wait utility for wait function
const WaitUtils = require("../TestUtilities/WaitUtils");

let propertiesReader;
let page;
let loginLocators;
let registerPatientLocators;

let visitorScreenLocator;
let helperFunctions;
let excelFileReader;
let testData;
let waitUtils;
let patientID;
let browserContext
let parameterizedData;
excelFileReader = new ExcelFileReader("TestDataFiles/OpenMRSTestData.xlsx", "OM_TestData", "DatasetID");//Read the excel file which was given in contructor argument
parameterizedData = excelFileReader.getListOfDataSetID();
parameterizedData.forEach((datasetID) => {
    test.describe.serial('Test suite for OpenMRS E2E with data set ID ' + datasetID, async () => {

        test.beforeAll("Test setup with dataset ID - " + datasetID, async ({ browser }) => {

            propertiesReader = new PropertyFileReader("TestDataFiles/Data.properties");//To Load the property file in class

            browserContext = await browser.newContext(); //To Create new Browser context for browser

            page = await browserContext.newPage();//Launch new Page

            page.setViewportSize({ height: 816, width: 1536 })//Set the page Height and width
            waitUtils = new WaitUtils(page);

            loginLocators = new LoginLocatos();//loginLocators to get the login locators

            registerPatientLocators = new RegisterPatientLocators();//registerPatientLocators to get the Register page locators

            visitorScreenLocator = new VisitorScreenLocator();//visitorScreenLocator to get the locators for performing visit and vist related activities

            helperFunctions = new HelperFunctions();// helperFunctions have all the date related csalculation related


            testData = excelFileReader.getTestData(datasetID);//Return the tetst data in the map format by the defined data set id
        })

        test("Test user should be successfully navigate to the openmrs application URL with dataset ID - " + datasetID, async ({ }) => {
            await page.goto(propertiesReader.getProperty("url"), { timeout: 500000, waitUntil: 'load' }); // URL will wait for the given amount of time the time unit is milli seconds and state should be loaded
            await expect(await page.title()).toEqual("Login");  // user successfully logged in by verifying page title
        })
        test("Verify user can able to enter user name and password with dataset ID - " + datasetID, async ({ }) => {


            await page.locator(loginLocators.getUserName()).fill(propertiesReader.getProperty("userName")); //Entering the user name

            await waitUtils.waitForLocator(loginLocators.getUserName());

            console.log(`User name ${propertiesReader.getProperty("userName")} got entered successfully`);

            await page.locator(loginLocators.getPassword()).fill(propertiesReader.getProperty("Password"));

            console.log(`Password ${propertiesReader.getProperty("Password")} got entered successfully`);

        })

        test("Verify user can able to choose any of the session and click on login button with dataset ID - " + datasetID, async ({ }) => {
            await page.locator(loginLocators.getSessionLocation()).click(); //Choose the session for which purpose we are going for
            console.log(`Session got clicked successfully`)

            await page.locator(loginLocators.getLoginButton()).click();  //Click login button to entering to dashboard
            console.log(`Login button got clicked successfully`);

            await expect(await page.locator(loginLocators.getLoginVerification())).toBeVisible();//Verify logged in successfully by verifying user id logo
            console.log(`Logged in successfully and user can able to see the user logo`);
        })


        test("Verify user successfully logged in by valid user name and password with dataset ID - " + datasetID, async ({ }) => {

            await expect(await page.url()).toBe("https://demo.openmrs.org/openmrs/referenceapplication/home.page")//Veirfy the login by the current URL
            console.log(`User can able to see the currect redirection url and the URL is ${await page.url()}`);
        })

        test("Verify user can able to click on rigister patient button with dataset ID - " + datasetID, async ({ }) => {
            await page.locator(registerPatientLocators.getRegisterPatientButton()).click();
            console.log(`Regiester patient button got clicked successfully`)
        })

        test("Veirfy user can able to enter the patient's Demographics details and contact information with dataset ID - " + datasetID, async ({ }) => {
            await page.locator(registerPatientLocators.getPatientNameInput()).fill(testData.get("PatientFirstName"));
            console.log(`Patient first name : ${testData.get("PatientFirstName")} got entered successfully`);

            await page.locator(registerPatientLocators.getPatientMiddleNameInput()).fill(testData.get("PatientMiddleName"));
            console.log(`Patient middle name : ${testData.get("PatientMiddleName")} got entered successfully`);

            await page.locator(registerPatientLocators.getPatientLastNameInput()).fill(testData.get("PatientLastName"));
            console.log(`Patient last name : ${testData.get("PatientLastName")} got entered successfully`);

            await page.locator(registerPatientLocators.getNextButton()).click();

            await page.selectOption(registerPatientLocators.getPatientGenderDropdown(), { label: testData.get("Gender") });
            console.log(`Genter : ${testData.get("Gender")} got added successfully`);

            await page.locator(registerPatientLocators.getNextButton()).click();

            await page.locator(registerPatientLocators.getPatientBirthDateInput()).fill(testData.get("BirthDay"));
            console.log(`Birth day :${testData.get("BirthDay")} got enterd successfully`);

            await page.selectOption(registerPatientLocators.getPatientBirthMonthDropdown(), { label: testData.get("BirthMonth") });
            console.log(`Birth month :${testData.get("BirthMonth")} got choosed successfully`);

            await page.locator(registerPatientLocators.getPatientBirthYearInput()).fill(testData.get("BirthYear"));
            console.log(`Birth year :${testData.get("BirthYear")} got enterd successfully`);

            await page.locator(registerPatientLocators.getNextButton()).click();

            await page.locator(registerPatientLocators.getPatientAddressInput()).fill(testData.get("Address"));
            console.log(`patient Address :${testData.get("Address")} got entered successfully`)

            await page.locator(registerPatientLocators.getPatientCityVillageInput()).fill(testData.get("City"));
            console.log(`patient city :${testData.get("City")} got entered successfully`)

            await page.locator(registerPatientLocators.getPatientStateInput()).fill(testData.get("State"));
            console.log(`patient state :${testData.get("State")} got entered successfully`)

            await page.locator(registerPatientLocators.getPatientCountryInput()).fill(testData.get("Country"));
            console.log(`patient country :${testData.get("Country")} got entered successfully`)

            await page.locator(registerPatientLocators.getPatientPostalCodeInput()).fill(testData.get("PostalCode"));
            console.log(`patient postal code :${testData.get("PostalCode")} got entered successfully`)

            await page.locator(registerPatientLocators.getNextButton()).click();


            await page.locator(registerPatientLocators.getPatientPhoneNumberInput()).fill(testData.get("PhoneNumber"));
            console.log(`patient Phone number :${testData.get("PhoneNumber")} got entered successfully`)

            await page.locator(registerPatientLocators.getNextButton()).click();

            await page.locator(registerPatientLocators.getNextButton()).click();

        })

        test("Verify patient name and address, contact informations are populated correctly in confirm screen with dataset ID - " + datasetID, async ({ }) => {

            let valueOfPatientName = await page.locator(registerPatientLocators.getPatientNameConfimationText()).textContent();

            let valueOfPatientGender = await page.locator(registerPatientLocators.getPatientGenderConfimationText()).textContent();

            let valueOfDateOfBirth = await page.locator(registerPatientLocators.getPatientDateOfBirthConfirmation()).textContent();

            console.log(valueOfDateOfBirth);
            let valueOfAddress = await page.locator(registerPatientLocators.getPatientAddressConfimation()).textContent();

            await expect(valueOfPatientName).toContain(testData.get("PatientFirstName"));
            console.log(`${valueOfPatientName} populate patient First name :${testData.get("PatientFirstName")} successfully `)

            await expect(valueOfPatientName).toContain(testData.get("PatientMiddleName"));
            console.log(`${valueOfPatientName} populate patient middle name :${testData.get("PatientMiddleName")} successfully `)

            await expect(valueOfPatientName).toContain(testData.get("PatientLastName"));
            console.log(`${valueOfPatientName} populate patient last name :${testData.get("PatientLastName")} successfully `)

            await expect(valueOfPatientGender).toContain(testData.get("Gender"));
            console.log(`${valueOfPatientGender} populate patient gender :${testData.get("Gender")} successfully `)

            await expect(valueOfAddress).toContain(testData.get("Address"));
            console.log(`${valueOfAddress} populate patient address :${testData.get("Address")} successfully `)

            await expect(valueOfAddress).toContain(testData.get("City"));
            console.log(`${valueOfAddress} populate patient city :${testData.get("City")} successfully `)

            await expect(valueOfAddress).toContain(testData.get("Country"));
            console.log(`${valueOfAddress} populate patient country :${testData.get("Country")} successfully `)

            await expect(valueOfAddress).toContain(testData.get("State"));
            console.log(`${valueOfAddress} populate patient state :${testData.get("State")} successfully `)

            await expect(valueOfAddress).toContain(testData.get("PostalCode"));
            console.log(`${valueOfAddress} populate patient postal code :${testData.get("PostalCode")} successfully `)

            let valueOfPhoneNumber = await page.locator(registerPatientLocators.getPatientPhoneNumberConfimation()).textContent();
            await expect(valueOfPhoneNumber).toContain(testData.get("PhoneNumber"));
            console.log(`${valueOfPhoneNumber} populate phone number :${testData.get("PhoneNumber")} successfully `)

            await page.locator(registerPatientLocators.getPatientDetailsConfirmButton()).click();
        })


        test("Verify patiend details page is redirected to electronic medical record screen and age is calculated correctly with dataset ID - " + datasetID, async ({ }) => {

            let valueOfCalculatedAge = await page.locator(registerPatientLocators.getCalculatedAgeText()).textContent();
            let title = await page.title();

            await expect(title).toBe("OpenMRS Electronic Medical Record");
            console.log(`Actual title :${title} and expected title :OpenMRS Electronic Medical Record got matched successfully`);

            let arrayOfCalculatedAge = valueOfCalculatedAge.split("year");
            let ageBaseOnOurCalculation = helperFunctions.getCurrentAge(testData.get("BirthDay"), testData.get("BirthMonth"), testData.get("BirthYear"));
            console.log(`Expected age is :${ageBaseOnOurCalculation} and actual Age :${arrayOfCalculatedAge[0].trim()}`);
            await expect(arrayOfCalculatedAge[0].trim()).toBe(ageBaseOnOurCalculation);
        })

        test("Veirfy when user click on start visit button application should ask start visit popup and user can able to confirm it with dataset ID - " + datasetID, async () => {
            await page.locator(visitorScreenLocator.getStartVisitButton()).click();// To start the new visit
            console.log(`Start visit button got clicked successfully`)

            await page.locator(visitorScreenLocator.getConfimationButtonToCreateVisit()).click();
            console.log(`Visit confirmation button got clicked succcessfully`)
        })

        test("Admin can able to upload the attachment in visit screen attachment section with dataset ID - " + datasetID, async ({ }) => {
            await waitUtils.waitForLocator(visitorScreenLocator.getVisitAttachementButton());
            await page.locator(visitorScreenLocator.getVisitAttachementButton()).click();
            console.log(`Visit Attachement button got clicked successfully`)

            let fileInputLocator = await page.locator(visitorScreenLocator.getAttacheDocumentSection());//Input file locator to simulate the mpuse actions
            console.log(`File chooser event got triggered successfully`);
            const [fileChooser] = await Promise.all([
                            page.waitForEvent('filechooser',{timeout:propertiesReader.getProperty("Timeouts")}),  // Wait for the file input dialog

                (async () => {
                    // Get the bounding box of the file input element
                    const elementBox = await fileInputLocator.boundingBox();
                    // Perform a mouse click using coordinates (center of the element)
                    if (elementBox) {
                        await page.mouse.click(
                            elementBox.x + elementBox.width / 2,  // x-coordinate (center of element)
                            elementBox.y + elementBox.height / 2, // y-coordinate (center of element)
                            { button: 'left' }  // left-click (default button)
                        );
                    }
                    // Trigger the file input dialog with double-click
                    await fileInputLocator.dblclick();  // Double-click the file input field
                })()


            ]);

            await fileChooser.setFiles("AttachementFiles//Screenshot.png");// attach the file with file path
            console.log("File got attached successfully")


            await page.locator(visitorScreenLocator.getFileAttachementRemark()).fill(testData.get("AttachementRemark"));//Enter remark to attache teh file

            await page.locator(visitorScreenLocator.getFileUploadButton()).click();
            await expect(await page.locator(visitorScreenLocator.getToastMessage())).toHaveText("The attachment was successfully uploaded.")
            let toastMessage = await page.locator(visitorScreenLocator.getToastMessage()).textContent();
            console.log(`Expected toast message got verified, Expected toast message is ${toastMessage}`);
        })

        test("Veirfy admin can able to redirect to patient details screen with dataset ID - " + datasetID, async ({ }) => {
            await page.locator(visitorScreenLocator.getClicnicianFacingMenu()).click();
            console.log(`Clinic facing menu got clied and screen will go to visit screen`);
        })

        test("Verify attachement got added to the patient details screen with dataset ID - " + datasetID, async ({ }) => {

            await waitUtils.waitForLocator(visitorScreenLocator.getImageAttachementValidator());
            await expect(page.locator(visitorScreenLocator.getImageAttachementValidator()).getAttribute("ng-src")).not.toBeNull();
            //get the attribute ng-src from image tag to veirfy attachement gota added
            console.log(`Attachement got added successfully and its populated in summary screen`)

            let listOfVisit = await page.$$(visitorScreenLocator.getClicnicFacingAttachementTextValidator());
            await expect(listOfVisit.length).toBe(1);
            console.log(`Visit entry is ${listOfVisit.length}`)


            let tags = await page.locator(visitorScreenLocator.getClicnicFacingAttachementTextValidator()).textContent(); //Get the tags to verify the visit like attachement or vitals
            await expect(tags.trim()).toBe("Attachment Upload"); //Fetch the tags to verify the purpose of visit
            console.log(`Actual tags : ${tags.trim()} got matched with Attachment Upload`)


            let date = await page.locator(visitorScreenLocator.getClicnicFacingMenuAttachementDateValidator()).textContent();
            console.log(helperFunctions.getDateForVisitDateVerification());

            await expect(date.trim()).toBe(helperFunctions.getDateForVisitDateVerification());//Fetch the date to veirfy is the date is matched with the current date
            console.log(`Actual date ${date.trim()} is matched with ${helperFunctions.getDateForVisitDateVerification()}`);
        })

        test("Veirfy admin can able to do the End visit process with dataset ID - " + datasetID, async () => {
            await page.locator(visitorScreenLocator.getEndVisitButton()).click();
            console.log(`End visit button got clicked successfully`);

            await page.locator(visitorScreenLocator.getEndVisitConfimationButton()).click();
            console.log(`End visit got confirmed`);

        })

        test("Veirfy user can able to enter the vitals in while do the visit with dataset ID - " + datasetID, async ({ }) => {
            await page.locator(visitorScreenLocator.getStartVisitButton()).click();//Start the visit for vitals capture
            console.log(`Start visit button got clicked successfully`)

            await page.locator(visitorScreenLocator.getConfimationButtonToCreateVisit()).click();
            console.log(`Confirmation button go clicked to start the visit`)
            await waitUtils.waitForLocator(visitorScreenLocator.getCaptureVitalsButtons());        //wait for capture vitals button
            await page.locator(visitorScreenLocator.getCaptureVitalsButtons()).click();
            console.log(`capture the vitals button got clicked successfully`)



        })
        test("Capture Height and weight and check the BMI is calculated correctly with dataset ID - " + datasetID, async ({ }) => {

            await page.locator(visitorScreenLocator.getHeighthInputBox()).fill(testData.get("Height"))
            console.log(`Patient Height got captured successfully, Height ${testData.get("Height")}`)
            await page.locator(visitorScreenLocator.getVitalsNextButton()).click()

            await page.locator(visitorScreenLocator.getWeightInputBox()).fill(testData.get("Weight"))
            console.log(`Patient weight got captured successfully, Height ${testData.get("Weight")}`)
            await page.locator(visitorScreenLocator.getVitalsNextButton()).click()

            let BMI = await page.locator(
                visitorScreenLocator.getCalculatedBMI()).textContent();//Fetch the BMI which is captured bythe system

            let calculatedBMI = helperFunctions.BMICalculator(parseFloat(testData.get("Height")), parseFloat(testData.get("Weight")));
            console.log("calculated BMI ", calculatedBMI)

            await expect(BMI).toBe(calculatedBMI);
            console.log(`Actual BMI ${BMI} got matched with ${calculatedBMI}`)

        })

        test("Verify admin can able to save the vitals details and redirected to patiend details screen record with dataset ID - " + datasetID, async () => {

            await page.locator(visitorScreenLocator.getVitalsSaveAndContinuteButton()).click();//Click save and continute for save the vitals
            console.log(`Save and continue button got clicked successfully`);

            await page.locator(visitorScreenLocator.getVitalsSaveButton()).click()
            console.log(`Vitals save button got clicked successfully`);

            await page.locator(visitorScreenLocator.getClicnicianFacingMenu()).click()

        })


        test("Veirfy Admin can able to see the right height and weight and BMI in patient details screen with dataset ID - " + datasetID, async ({ }) => {
            await waitUtils.waitForLocator(visitorScreenLocator.getPatientDetailsScreenHeight());
            await expect(page.locator(visitorScreenLocator.getPatientDetailsScreenHeight())).toHaveText(testData.get("Height"));
            let height = page.locator(visitorScreenLocator.getPatientDetailsScreenHeight()).textContent();
            console.log(`Expected height : ${height} got matched with ${testData.get("Height")}`)


            await waitUtils.waitForLocator(visitorScreenLocator.getPatientDetailsScreenWeight());
            await expect(page.locator(visitorScreenLocator.getPatientDetailsScreenWeight())).toHaveText(testData.get("Weight"));
            let weight = page.locator(visitorScreenLocator.getPatientDetailsScreenWeight()).textContent();
            console.log(`Expected height : ${weight} got matched with ${testData.get("Weight")}`)

            let calculatedBMI = helperFunctions.BMICalculator(parseFloat(testData.get("Height")), parseFloat(testData.get("Weight")));
            await waitUtils.waitForLocator(visitorScreenLocator.getPatientDetailsScreenCalculatedBMI());
            await expect(page.locator(visitorScreenLocator.getPatientDetailsScreenCalculatedBMI())).toHaveText(calculatedBMI);
            let bmi = page.locator(visitorScreenLocator.getPatientDetailsScreenCalculatedBMI()).textContent();
            console.log(`Expected height : ${calculatedBMI} got matched with ${bmi}`)

        })

        test("Verify recent visit have one more entry and tags should be updated with vitals with dataset ID - " + datasetID, async ({ }) => {
            await waitUtils.waitForLocator(visitorScreenLocator.getClicnicFacingAttachementTextValidator())// wait for the selector to be visible

            let visitTags = await page.$$(visitorScreenLocator.getClicnicFacingAttachementTextValidator());// Fetch the no of visits based on how manyvisit got added
            console.log(` No of visit is ${visitTags.length}`)

            await expect(visitTags.length).toEqual(2);

            console.log(`Expected visit count is 2 and actual visit count is ${visitTags.length}`);
            let arrayOfVisitTag = [];
            for (let tag of visitTags) {
                let text = await tag.textContent();
                console.log("Tags are ", text);
                arrayOfVisitTag.push(text);
            }
            console.log(`Our visit purpose are ${arrayOfVisitTag}`)

            await expect(arrayOfVisitTag.includes("Vitals")).toBe(true)
            console.log(`Visit tags have vitals hence passed`)

            await expect(arrayOfVisitTag.includes("Attachment Upload")).toBe(true)
            console.log(`Visit tags have Attachment Upload hence passed`)
            await waitUtils.waitForLocator(visitorScreenLocator.getClicnicFacingMenuAttachementDateValidator());
            let visitDate = await page.$$(visitorScreenLocator.getClicnicFacingMenuAttachementDateValidator());
            for (let date of visitDate) {
                let dateValue = await date.textContent();
                console.log(dateValue);
                await expect(dateValue.trim()).toBe(helperFunctions.getDateForVisitDateVerification());
                console.log(`Visit date is ${dateValue} and today date is ${helperFunctions.getDateForVisitDateVerification()} `)
            }

            await page.locator(visitorScreenLocator.getEndVisitButton()).click();
            console.log(`End visit button got clicked successfully`);

            await page.locator(visitorScreenLocator.getEndVisitConfimationButton()).click();
            console.log(`End visit got confirmed`);
        })
        test("Verify admin can able to merge the recent two visits with dataset ID - " + datasetID, async ({ }) => {

            await page.locator(visitorScreenLocator.getMergeVisitButton()).click();//Merge the two visit into single
            console.log(`Merge visit button got clicked successfully`)
            await waitUtils.waitForLocator(visitorScreenLocator.getVisitMergeCheckBox())//Waits for visit to available in merge vsist screen

            let checkBoxs = await page.$$(visitorScreenLocator.getVisitMergeCheckBox());
            for (let checkBox of checkBoxs) {
                await checkBox.check();
                const isChecked = await checkBox.isChecked();
                await expect(isChecked).toBe(true);
                console.log(`Visit check box status is ${isChecked}`)
            }
            await page.locator(visitorScreenLocator.getMergeSelectedVisitButton()).click();
            console.log(`Merge selected visit got clicked successfully`)

            await page.locator(visitorScreenLocator.getMergeReturnButton()).click();
            console.log(`Screen start redirecting to the previous screen`)

        })

        test("verify after merging the visit the no of visit should be one and tags are properly merged with their names with dataset ID - " + datasetID, async ({ }) => {
            await waitUtils.waitForLocator(visitorScreenLocator.getClicnicFacingAttachementTextValidator());

            let visitTags = await page.$$(visitorScreenLocator.getClicnicFacingAttachementTextValidator());

            await expect(visitTags.length).toEqual(1);
            console.log(`Number of visit after merging is ${visitTags.length}`)

            let VisitPurpose = " ";
            for (let tag of visitTags) {
                let text = await tag.textContent();
                console.log("Tags are ", text);
                VisitPurpose = VisitPurpose + " " + text

            }


            console.log(VisitPurpose)
            await expect(VisitPurpose).toContain("Vitals");

            console.log(`${VisitPurpose} is having vitals hence passed`)
            await expect(VisitPurpose).toContain("Attachment Upload");
            console.log(`${VisitPurpose} is having Attachment Upload hence passed`)

            await waitUtils.waitForLocator(visitorScreenLocator.getClicnicFacingAttachementTextValidator());
            let visitDate = await page.$$(visitorScreenLocator.getClicnicFacingMenuAttachementDateValidator());

            for (let date of visitDate) {
                let dateValue = await date.textContent();
                console.log(dateValue);
                await expect(dateValue.trim()).toBe(helperFunctions.getDateForVisitDateVerification());
                console.log(`Expected visit date after merging is ${dateValue.trim()} and actual is ${helperFunctions.getDateForVisitDateVerification()}`)
            }
        })

        test("Verify user can not able to enter future date in past visit section with dataset ID - " + datasetID, async ({ }) => {

            await page.locator(visitorScreenLocator.getPastVisitButton()).click();
            //Customized xpath for validate future date is not selectable
            let xpathForFutureDate = "//div[contains(@style,'display: block') and contains(@class,'datetimepicker-dropdown-bottom-left dropdown-menu')]//td[text()='" + helperFunctions.getFutureDate() + "']";

            try {
                let statusOfAttribute = await page.locator(xpathForFutureDate).getAttribute("class");//fetch the class attribute form the element to verify the status

                await expect(statusOfAttribute).toContain('disabled');
                console.log(`Class attribute :${statusOfAttribute} contains disables hence it will be enabled`)

                console.log(statusOfAttribute)
                await page.locator(xpathForFutureDate).click();

            }
            catch (error) {

                console.log(error)
            }
            await page.locator(visitorScreenLocator.getPastDateCancelButton()).click();

        })

        test("Verify deleted user can not be found in list view with dataset ID - " + datasetID, async ({ }) => {

            patientID = await page.locator(visitorScreenLocator.getPatientID()).textContent();//Fetch the patient ID from the application
            console.log(`Patient id is ${patientID}`)

            await page.locator(visitorScreenLocator.getDeletePatientButton()).click();
            console.log(`Delete patient button got clicked successfully`);

            await page.locator(visitorScreenLocator.getDeleteReasonInput()).fill(testData.get("DeleteRemark"));//Enter reason for delete 
            console.log(`Delete patient remark got added successfully`);

            await page.locator(visitorScreenLocator.getDeleteConfirmationButton()).click();
            console.log(`delete confirmation got clicked successfully`)

            let deleteToastMessage = await page.locator(visitorScreenLocator.getToastMessage()).textContent();
            console.log("Delete toast message is ", deleteToastMessage)

            await expect(await page.locator(visitorScreenLocator.getToastMessage())).toHaveText("Patient has been deleted successfully");
            console.log(`${deleteToastMessage} got visible and verified successfully`);
        })

        test("Verify deleted patient record is not visible in search grid with dataset ID - " + datasetID, async ({ }) => {
            await page.locator(visitorScreenLocator.getSearchPatientID()).fill(patientID);
            console.log(`patient id ${patientID} search successfully and waiting for the result......`);

            await page.locator(visitorScreenLocator.getSearchPatientID()).focus();//To make the focus to the search text box 
            await page.locator(visitorScreenLocator.getSearchPatientID()).press("Enter");//Simulate the keyboard actions using press function

            await waitUtils.waitForLocator(visitorScreenLocator.getNoPatientFoundVerification());
            await expect(await page.locator(visitorScreenLocator.getNoPatientFoundVerification())).toBeVisible();
            console.log(`Verified no match found element got visisble`)

            let patientSearchStatus = "";
            for (let i = 0; i <= 3000; i++) {
                try {

                    patientSearchStatus = await page.locator(visitorScreenLocator.getNoPatientFoundVerification()).textContent();

                    if (patientSearchStatus.length > 1) {
                        break;
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }

            await expect(patientSearchStatus).toBe("No matching records found")
            console.log(`search result is ${patientSearchStatus}`)
        })

        test.afterEach("Screenshot Setup with dataset ID - " + datasetID, async ({ }, testInfo) => {

            let screenshot = await page.screenshot({ fullPage: true })//Take screenshot
            let screenshotBufferedString = screenshot.toString('base64');//convert to base64 format

            testInfo.attachments.push({
                name: 'full page screenshot',
                body: screenshotBufferedString,
                contentType: 'image/png',
            }); //with the help of testInfo Property the screenshot got added to report

        })

        test.afterAll("Tear down set up for data set ID" + datasetID, async ({ }) => {
            await browserContext.close();
            await page.close();
        })

    })
});
