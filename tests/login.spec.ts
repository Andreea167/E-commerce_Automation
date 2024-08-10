import { test, expect } from '../playwright/fixtures'


test('[Login-01] Verify a user can create an account', async ({ page, login } ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();
    await login.goToRegisterPage()
    await login.completeRegistrationPage();

});

test('[Login-02] Verify a user can log in', async ({ page, login } ) => {   //failed bc it is a bug
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();
    await login.checkLoginWithCorrectUserAndPass('tes1@test.com');

});

test('[Login-03] Verify a user can not log in with a wrong pass or email', async ({ page, login } ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();
    await login.checkLoginWithWrongUserAndPass();

});

test('[Login-04] Verify a user can log out', async ({ page, login } ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();
    await login.checkLoginWithCorrectUserAndPass('tes1@test.com');
    await login.loggedOut();
});


test('[Login-05] Verify a user can NOT create an account with an existing email', async ({ page, login } ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();
    await login.goToRegisterPage()
    await login.registerWithExistingEmail();
});


test('[Login-06] Verify a user can change the password to a new one', async ({ page, login } ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();

    await login.goToRegisterPage()
    await login.completeRegistrationPage();
    //await login.checkLoginWithCorrectUserAndPass('Steve.Kuhn4@gmail.com')

    await login.goToMyAccount();
    await login.goToChangePassword();
    await login.checkChangePassWorks();
});


test('[Login-07] Verify a user can NOT change the password if he enter the same pass as before', async ({ page, login } ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.gotoLoginPage();

    await login.goToRegisterPage()
    await login.completeRegistrationPage();
    //await login.checkLoginWithCorrectUserAndPass('Oral.Doyle@gmail.com')

    await login.goToMyAccount();
    await login.goToChangePassword();
    await login.checkChangePassWillNotIfItsTheSameAsBefore();
});


test('[Login-08] Check that a user can add a new address via My Account' 
    , async ({page, login}) => {

    await page.goto('https://demo.nopcommerce.com/')
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.goToRegisterPage()
    await login.completeRegistrationPage();

    await login.goToMyAccount();
    await login.goToAddresses();
    await login.addNewAddress();

})

