class VisitScreenLocators {
    #startVisitButton = "//a[contains(@id,'createVisit')]";
    getStartVisitButton() {
      return this.#startVisitButton;
    }
  
    #confirmationToCreateStartVisit = "//button[@id='start-visit-with-visittype-confirm']";
    getConfimationButtonToCreateVisit() {
      return this.#confirmationToCreateStartVisit;
    }
  
    #visitAttactmentButton = "//a[contains(@id,'attachments.attachments')]";
    getVisitAttachementButton() {
      return this.#visitAttactmentButton;
    }
  
    #attacheDocumentSection = "//div[contains(text(),'Click or drop a file here.')]";
    getAttacheDocumentSection() {
      return this.#attacheDocumentSection;
    }
  
    #fileAttachementRemark = "//textarea[@ng-model='typedText.fileCaption']";
    getFileAttachementRemark() {
      return this.#fileAttachementRemark;
    }
  
    #fileUploadButton = "//button[contains(text(),'Upload file')]";
    getFileUploadButton() {
      return this.#fileUploadButton;
    }
  
    #toastMessage = "//div[@class='toast-item-wrapper']//p";
    getToastMessage() {
      return this.#toastMessage;
    }
  
    #imageAttachementVerification = "//h3[contains(text(),'ATTACHMENTS')]//ancestor::div//img";
    getImageAttachementVerificationLocator() {
      return this.#imageAttachementVerification;
    }
  
    #endVisitButton = "//h3[contains(text(),'Current Visit Actions')]//parent::ul//parent::div[@class='action-section']//a[contains(@id,'endVisit')]//div[contains(text(),'End Visit')]";
    getEndVisitButton() {
      return this.#endVisitButton;
    }
  
    #clicnicianFacingMenu = "//a[contains(@href,'openmrs/coreapps/clinicianfacing')]";
    getClicnicianFacingMenu() {
      return this.#clicnicianFacingMenu;
    }
  
    #imageAttachementValidator = "//img[@img-fix-orientation='imageUrl']";
    getImageAttachementValidator() {
      return this.#imageAttachementValidator;
    }
  
    #clicnicFacingMenuAttachementDateValidator = "//h3[contains(text(),'RECENT VISITS')]//ancestor::div//a[contains(@href,'/openmrs/coreapps/patientdashboard')]";
    getClicnicFacingMenuAttachementDateValidator() {
      return this.#clicnicFacingMenuAttachementDateValidator;
    }
  
    #clicnicFacingAttachementTextValidator = "//h3[contains(text(),'RECENT VISITS')]//ancestor::div//div[@class='tag ng-binding ng-scope']";
    getClicnicFacingAttachementTextValidator() {
      return this.#clicnicFacingAttachementTextValidator;
    }
  
    #endVisitConfimationButton = "//span[contains(text(),'Are you sure you want to end this visit?')]//parent::li//parent::ul//following-sibling::button[@class='confirm right']";
    getEndVisitConfimationButton() {
      return this.#endVisitConfimationButton;
    }
  
    #captureVitalsButtons = "//a[@id='referenceapplication.realTime.vitals']";
    getCaptureVitalsButtons() {
      return this.#captureVitalsButtons;
    }
  
    #heightInputBox = "//span[@id='height']//input";
    getHeighthInputBox() {
      return this.#heightInputBox;
    }
  
    #vitalsNextButton = "//button[@id='next-button']";
    getVitalsNextButton() {
      return this.#vitalsNextButton;
    }
  
    #weightInputBox = "//span[@id='weight']//input";
    getWeightInputBox() {
      return this.#weightInputBox;
    }
  
    #calculatedBMI = "//span[@id='calculated-bmi']";
    getCalculatedBMI() {
      return this.#calculatedBMI;
    }
  
    #vitalsSaveAndContinuteButton = "//a[@id='save-form']";
    getVitalsSaveAndContinuteButton() {
      return this.#vitalsSaveAndContinuteButton;
    }
  
    #vitalsSaveButton = "//button[contains(text(),'Save')]";
    getVitalsSaveButton() {
      return this.#vitalsSaveButton;
    }
  
    #vitalsEndVisitButton = "//a[contains(@href,'showEndVisit')]";
    getVitalsEndVisitButton() {
      return this.#vitalsEndVisitButton;
    }

    #patientDetailsScreenHeight="//span[@id='height']//span[@class='value']"
    getPatientDetailsScreenHeight() {
      return this.#patientDetailsScreenHeight;
    }

    #patientDetailsScreenWeight="//span[@id='weight']//span[@class='value']"
    getPatientDetailsScreenWeight() {
      return this.#patientDetailsScreenWeight;
    }

    #patientDetailsScreenCalculatedBMI="//span[@id='calculated-bmi']"
    getPatientDetailsScreenCalculatedBMI() {
      return this.#patientDetailsScreenCalculatedBMI;
    }
  
    #mergeVisit = "//a[@id='org.openmrs.module.coreapps.mergeVisits']";
    getMergeVisitButton() {
      return this.#mergeVisit;
    }
  
    #visitMergeCheckBox = "//input[@name='mergeVisits']";
    getVisitMergeCheckBox() {
      return this.#visitMergeCheckBox;
    }
  
    #mergeSelectedVisitButton = "//input[@id='mergeVisitsBtn']";
    getMergeSelectedVisitButton() {
      return this.#mergeSelectedVisitButton;
    }
  
    #mergereturnButton = "//input[@value='Return']";
    getMergeReturnButton() {
      return this.#mergereturnButton;
    }
  
    #pastVisitButton = "//a[@id='org.openmrs.module.coreapps.createRetrospectiveVisit']";
    getPastVisitButton() {
      return this.#pastVisitButton;
    }
  
    #pastDateCancelButton = "//span[@id='retrospectiveVisitStopDate']//parent::p//following-sibling::button[@class='cancel']";
    getPastDateCancelButton() {
      return this.#pastDateCancelButton;
    }
  
    #patientIDGetter = "//em[contains(text(),'Patient ID')]//following-sibling::span";
    getPatientID() {
      return this.#patientIDGetter;
    }
  
    #deletePatientButton = "//a[@id='org.openmrs.module.coreapps.deletePatient']";
    getDeletePatientButton() {
      return this.#deletePatientButton;
    }
  
    #deleteReasonInput = "//input[@id='delete-reason']";
    getDeleteReasonInput() {
      return this.#deleteReasonInput;
    }
  
    #deleteConfirmationButton = "//p[contains(text(),'Are you sure you want to DELETE')]//following-sibling::button[contains(text(),'Confirm')]";
    getDeleteConfirmationButton() {
      return this.#deleteConfirmationButton;
    }
  
    #searchPatientID = "//input[@id='patient-search']";
    getSearchPatientID() {
      return this.#searchPatientID;
    }
  
    #noPatientFoundVerification = "//td[@class='dataTables_empty']";
    getNoPatientFoundVerification() {
      return this.#noPatientFoundVerification;
    }
  }
  
  module.exports = VisitScreenLocators;
  