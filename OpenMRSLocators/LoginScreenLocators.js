
class LoginScreenLocators {
    #userName = "//input[@id='username']";
    getUserName() {
      return this.#userName;
    }
  
    #password = "//input[@id='password']";
    getPassword() {
      return this.#password;
    }
  
    #sessionLocation = "//li[@id='Pharmacy']";
    getSessionLocation() {
      return this.#sessionLocation;
    }
  
    #loginButton = "//input[@id='loginButton']";
    getLoginButton() {
      return this.#loginButton;
    }
  
    #loginVerification = "//i[@class='icon-user small']";
    getLoginVerification() {
      return this.#loginVerification;
    }
}
module.exports = LoginScreenLocators;