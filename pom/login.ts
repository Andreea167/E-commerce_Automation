import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker';


export class LOGIN {
  readonly page: Page
  readonly goToLoginBtn: Locator  
  readonly goToRegisterBtn: Locator 

  readonly mrCheckbox: Locator  
  readonly firstName: Locator
  readonly lastName: Locator
  readonly emailInput: Locator
  readonly passInputRegistraation: Locator
  readonly confirmPass: Locator
  readonly createAccountBtn: Locator;


  readonly loginEmail: Locator
  readonly loginPass: Locator
  readonly loginBtn: Locator
  readonly logoutBtn: Locator
  readonly textEmailAlreadyExist: Locator;

  readonly myAccountBtnFromHeader : Locator  
  readonly successNotif: Locator 
  readonly addNewAddressBtn: Locator


  constructor(page: Page) {
  this.page = page
  this.goToLoginBtn=page.locator('a.ico-login') 
  this.goToRegisterBtn = page.locator('a.ico-register');  


  this.mrCheckbox=page.locator('#gender-female');  
  
  this.firstName=page.locator('#FirstName') 
  this.lastName=page.locator('#LastName')  
  this.emailInput = page.locator('#Email')
  this.passInputRegistraation=page.locator('#Password');
  this.confirmPass = page.locator('#ConfirmPassword')
  this.createAccountBtn=page.locator('button#register-button');

  

  this.loginEmail= page.locator('input#Email')  
  this.loginPass= page.locator('input#Password') 
  this.loginBtn= page.locator('button.button-1.login-button'); 
  this.logoutBtn=page.locator('a.ico-logout') 
  this.textEmailAlreadyExist=page.locator('.signup-form p')

  this.myAccountBtnFromHeader = page.locator('a.ico-account'); 
  this.successNotif=page.locator('div.bar-notification.success');  
  this.addNewAddressBtn = page.locator('button.add-address-button');

  }

  async goto(url) {
  await this.page.goto(url)
  }

  async gotoLoginPage(){
    await this.goToLoginBtn.click();
    await this.page.waitForURL(/login/);
    await expect(this.page).toHaveURL(/login/);

    
  }

  async goToRegisterPage()
  {
    await this.goToRegisterBtn.click();
    await this.page.waitForURL(/register/);
    await expect(this.page).toHaveURL(/register/);
  }

  generateRandomEmail(): string {
    return faker.internet.email();
}


  async completeRegistrationPage()   
  {
    await this.mrCheckbox.click();
    
    await this.firstName.fill('Andreea');
    await this.lastName.fill('Neamt');
    const randomEmail = await this.generateRandomEmail();
      console.log("Random email generated: " , randomEmail);
    await this.emailInput.fill(randomEmail)
    await this.passInputRegistraation.fill('Test12345!');
    await this.confirmPass.fill('Test12345!');
    await this.createAccountBtn.click();

    await this.page.waitForURL(/registerresult/);
       await expect(this.page).toHaveURL(/registerresult/)
    const textRegisterComplete = await this.page.locator('div.result').textContent();
      await expect(textRegisterComplete).toContain('Your registration completed');

    return randomEmail ;
  }

  async checkLoginWithCorrectUserAndPass(email : string)  
  {
    await this.loginEmail.fill(email);
    await this.loginPass.fill('Test12345!');
    
    await this.loginBtn.click();
    
    await expect(this.logoutBtn).toBeVisible();
    
  }

  async checkLoginWithWrongUserAndPass()  
  {
    await this.loginEmail.fill('abc@gmail.ro');
    await this.loginPass.fill('Test');
    await this.loginBtn.click();
    const incorectPassOrEmailMessage=  await this.page.locator('div.message-error.validation-summary-errors').textContent()
    await expect(incorectPassOrEmailMessage).toContain('Login was unsuccessful. Please correct the errors and try again.')
     
  }

  async loggedOut()
  {
    await this.logoutBtn.click();
      await expect(this.goToLoginBtn).toBeVisible();
  }



  async goToMyAccount()   
  {
    await expect(this.myAccountBtnFromHeader).toBeVisible( {timeout: 6000} )
    await this.myAccountBtnFromHeader.click();
    await this.page.waitForURL(/customer/);
       await expect(this.page).toHaveURL(/customer/)
  }

  async goToChangePassword()
  {
    await this.page.getByText('Change password').click();

  }

  async checkChangePassWorks()
  {
    await this.page.locator('#OldPassword').fill('Test12345!')
    await this.page.locator('#NewPassword').fill('New12345!')
    await this.page.locator('#ConfirmNewPassword').fill('New12345!')

    await this.page.locator('.change-password-button').click();

    await expect(this.successNotif).toBeVisible();
  }

  async checkChangePassWillNotIfItsTheSameAsBefore()
  {
    await this.page.locator('#OldPassword').fill('Test12345!')
    await this.page.locator('#NewPassword').fill('Test12345!')
    await this.page.locator('#ConfirmNewPassword').fill('Test12345!')

    await this.page.locator('.change-password-button').click();

    const textPassTheSame = await this.page.getByText('You entered the password that is the same as one of the last passwords you used. Please create a new password.')

    await expect(textPassTheSame).toBeVisible( {timeout:5000} )

  }


  async checkLoginWithNEWpass(email : string)  
  {
    await this.loginEmail.fill(email);
    await this.loginPass.fill('New12345!');
    
    await this.loginBtn.click();
    
    await expect(this.logoutBtn).toBeVisible();
    
  }
  

  async registerWithExistingEmail()   
  {
    await this.mrCheckbox.click();
    
    await this.firstName.fill('Andreea');
    await this.lastName.fill('Neamt');
    
    await this.emailInput.fill('Steve.Kuhn4@gmail.com')
    await this.passInputRegistraation.fill('Test12345!');
    await this.confirmPass.fill('Test12345!');
    await this.createAccountBtn.click();

    await expect(this.page.getByText('The specified email already exists')).toBeVisible( {timeout: 6000} )
  }


  async checkOrderNumberAppearOnMyAccountAsWell()
    {
      await this.page.getByText('Orders').first().click();
        const text = await this.page.locator('.order-list .title strong').innerText();
 
        if(text)
        { 
             const number = text.match(/\d+/)[0];
             
            console.log('Order number on my account: ', number);
        }
    
  }


  async goToAddresses()
  {
    await this.page.getByText('Addresses').first().click();
    await this.page.waitForURL(/addresses/);
      await expect(this.page).toHaveURL(/addresses/)
  }

  async addNewAddress()
  {
    await this.addNewAddressBtn.click();
    await this.page.waitForURL(/addressadd/);

    await this.page.locator('#Address_FirstName').fill('Andreea');
    await this.page.locator('#Address_LastName').fill('Neamt');
    await this.page.locator('#Address_Email').fill('test1@gmail.com');

    await this.page.locator('#Address_CountryId').selectOption('Romania');
    await this.page.locator('#Address_City').fill('Cluj-Napoca');
    await this.page.locator('#Address_Address1').fill('Baritiu nr.26');
    await this.page.locator('#Address_ZipPostalCode').fill('123456');
    await this.page.locator('#Address_PhoneNumber').fill('0755555555');

    await this.page.getByText('Save').click();

    await expect(this.successNotif).toBeVisible();
    
  }


}   
