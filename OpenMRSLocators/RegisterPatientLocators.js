class RegisterPatientLocators {
    #registerPatientButton = "//a[contains(@id,'registerPatient-homepageLink')]";
    getRegisterPatientButton() {
      return this.#registerPatientButton;
    }
  
    #patientNameInput = "//input[@name='givenName']";
    getPatientNameInput() {
      return this.#patientNameInput;
    }
  
    #patientMiddleNameInput = "//input[@name='middleName']";
    getPatientMiddleNameInput() {
      return this.#patientMiddleNameInput;
    }
  
    #patientLastNameInput = "//input[@name='familyName']";
    getPatientLastNameInput() {
      return this.#patientLastNameInput;
    }
  
    #nextButton = "//button[@id='next-button']";
    getNextButton() {
      return this.#nextButton;
    }
  
    #patientGenderDropdown = "//select[@id='gender-field']";
    getPatientGenderDropdown() {
      return this.#patientGenderDropdown;
    }
  
    #patientBirthDateInput = "//input[@id='birthdateDay-field']";
    getPatientBirthDateInput() {
      return this.#patientBirthDateInput;
    }
  
    #patientBirthMonthDropdown = "//select[@id='birthdateMonth-field']";
    getPatientBirthMonthDropdown() {
      return this.#patientBirthMonthDropdown;
    }
  
    #patientBirthYearInput = "//input[@id='birthdateYear-field']";
    getPatientBirthYearInput() {
      return this.#patientBirthYearInput;
    }
  
    #patientAddressInput = "//input[@id='address1']";
    getPatientAddressInput() {
      return this.#patientAddressInput;
    }
  
    #patientCityVillageInput = "//input[@id='cityVillage']";
    getPatientCityVillageInput() {
      return this.#patientCityVillageInput;
    }
  
    #patientStateInput = "//input[@id='stateProvince']";
    getPatientStateInput() {
      return this.#patientStateInput;
    }
  
    #patientCountryInput = "//input[@id='country']";
    getPatientCountryInput() {
      return this.#patientCountryInput;
    }
  
    #patientPostalCodeInput = "//input[@id='postalCode']";
    getPatientPostalCodeInput() {
      return this.#patientPostalCodeInput;
    }
  
    #patientPhoneNumberInput = "//input[@name='phoneNumber']";
    getPatientPhoneNumberInput() {
      return this.#patientPhoneNumberInput;
    }
  
    #patientNameConfimation = "//span[contains(text(),'Name: ')]//parent::p";
    getPatientNameConfimationText() {
      return this.#patientNameConfimation;
    }
  
    #patientGenderConfimation = "//span[contains(text(),'Gender: ')]//parent::p";
    getPatientGenderConfimationText() {
      return this.#patientGenderConfimation;
    }
  
    #patientDateOfBirthConfirmation = "//span[contains(text(),'Birthdate: ')]//parent::p";
    getPatientDateOfBirthConfirmation() {
      return this.#patientDateOfBirthConfirmation;
    }
  
    #patientAddressConfimation = "//span[contains(text(),'Address: ')]//parent::p";
    getPatientAddressConfimation() {
      return this.#patientAddressConfimation;
    }
  
    #patientPhoneNumberConfimation = "//span[contains(text(),'Phone Number: ')]//parent::p";
    getPatientPhoneNumberConfimation() {
      return this.#patientPhoneNumberConfimation;
    }
  
    #patientDetailsConfirmButton = "//input[@class='submitButton confirm right']";
    getPatientDetailsConfirmButton() {
      return this.#patientDetailsConfirmButton;
    }
    #calculatedAgeText="//div[@class='gender-age col-auto']/span[2]";
    getCalculatedAgeText()
    {
        return this.#calculatedAgeText;
    }
  }
  
  module.exports = RegisterPatientLocators;