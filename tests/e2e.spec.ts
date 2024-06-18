import { test, expect } from '../playwright/fixtures'


test.use({ launchOptions: { slowMo: 1000 } })


test(`[E2E-01] Flow 1: 
    S1: Navigate to homepage -->
    S2: Create a new account --> 
    S3: Search for Apple using Search Bar  -->
    S4: Navigate to the first PDP of the results  --> 
    S5: Write a review on the product -->
    S6: Add the product to cart -->
    S7: Add gift wrapping to the order --> 
    S8: Complete one pager with address for shipping -->
    S9: Select Credit Card as payment -->
    S10: Check that the order is completed
     `, async ({ page, login , pdp, plp ,checkout } ) => {
        test.setTimeout( 90 * 1000)
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.goToRegisterPage()
    await login.completeRegistrationPage();
    await plp.checkSearchBar('apple');
    await plp.goToFirstProductFromPLP();
    await pdp.checkWriteReviewWillUpdateTheReviewOnPage();
    await pdp.checkAddCartWorks();
    await checkout.checkSelectingGiftWrappingWillAddExtraCost();
    await checkout.goFromViewCartToCheckoutWhenLogin();
    await checkout.completeOnePagerWhenAlreadyRegster();  
    await checkout.continueWithCreditCard();
    await checkout.completeCardInfo();
    await checkout.confirmOrder();
});


test(`[E2E-02] Flow 2: 
    S1: Navigate to homepage --> 
    S2: Search for Shoes using filters -->
    S3: Visit a shoes and check that will appear at recent viewed  --> 
    S4: Search for Software products using mega menu -->
    S5: Go to the second products -->
    S6: Check add to cart --> 
    S7: Navigate to checkout & continue as guest -->
    S8: Complete one pager with address and info -->
    S9: Complete with Card info -->
    S10: Check that the order is completed
     `, async ({ page, login , pdp, plp ,checkout } ) => {
        test.setTimeout( 90 * 1000)
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await plp.searchShoesUsingFilters();
    let firstProdVisited= await  plp.chooseARandomPDPFromList();
    await page.goBack();

    if(firstProdVisited)
        await plp.checkRecentProdVisitedAppearsInList(firstProdVisited )

    await plp.searchSoftwareProductsUsingMegaMenu();
    await plp.goToSecondProductFromPLP();
    await pdp.checkAddCartWorks();
    await checkout.goFromViewCartToCheckoutWhenLogin();
    await checkout.continueAsGuest();
    await checkout.completePersonalInfoCheckout();  
    await checkout.completeCardInfo();
    await checkout.confirmOrder();

});


test(`[E2E-03] Flow 3: 
    S1: Navigate to homepage -->
    S2: Search for HTC using Search Bar  -->
    S3: Navigate to the first PDP of the results  --> 
    S4: Check adding the prod to favorite wll be on wishlist as well -->
    S5: Check going back redirect back to the PDP -->
    S6: Add produt to cart --> 
    S7: Navigat to checkout when not login -->
    S8: Navigate to register and create an account via checkout -->
    S9: Complete registration page info -->
    S10: Navigate again at checkout and complete the addrss info -->
    S11: Complete the order by choosing money at order as payment.

     `, async ({ page, login , pdp, plp ,checkout } ) => {
        test.setTimeout( 90 * 1000)
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await plp.checkSearchBar('htc');
    await plp.goToFirstProductFromPLP();
    await pdp.checkAddToWISHLISTworksForPDP();
    await page.goBack();
    await pdp.checkAddCartWorks();
    await checkout.proceedToCheckoutWhenNoLogin() ;
    await login.gotoLoginPage();
    await login.goToRegisterPage()
    await login.completeRegistrationPage();

    await plp.goToShoppingCartFromHeader();
    await checkout.goFromViewCartToCheckoutWhenLogin() 
    await checkout.completeOnePagerWhenAlreadyRegster();  
    await checkout.continueWithMoneyOrder()
    await checkout.confirmOrder();
});



test(`[E2E-04] Flow 4: 
    S1: Navigate to register page -->
    S2: Create a new account  -->
    S3: Go to my account and change the password  --> 
    S4: Check Logging Out -->
    S5: Check login with the new password -->
    S6: Search for bracelet --> 
    S7: Add a random bracelet to cart -->
    S8: Navigate to checkout -->
    S9: Complete one pager with address and info -->
    S10: Complete with Card info -->
    S11: Check that the order is completed

     `, async ({ page, login , pdp, plp ,checkout } ) => {
        test.setTimeout( 90 * 1000)
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.goToRegisterPage()
    let emailGenerated = await  login.completeRegistrationPage();

    await login.goToMyAccount();
    await login.goToChangePassword();
    await login.checkChangePassWorks();
    await page.reload();

    await login.loggedOut();

    await login.gotoLoginPage();
    await login.checkLoginWithNEWpass(emailGenerated) 

    await plp.checkSearchBar('bracelet');
    await plp.checkAddARandomItemToCARTisAddedCorrectly();

    await checkout.goFromViewCartToCheckoutWhenLogin() 
    await checkout.completeOnePagerWhenAlreadyRegster();  
    await checkout.continueWithMoneyOrder()
    await checkout.confirmOrder();


    ///the following 3 lines add them to a new e2e test, maybe email a fried or add new address on my account 
    //as ideas of tests
    await checkout.checkOrderNumberAppearOnTyPage();
    await login.goToMyAccount();
    await login.checkOrderNumberAppearOnMyAccountAsWell();
});




test(`[E2E-05] Flow 5: 
    S1: Navigate to register page -->
    S2: Create a new account  -->
    S3: Go to my account and add a new address  --> 
    S4: Search for jeans using Searcg Bar --> 
    S5: Navigate to first result -->
    S6: Navigate to checkout -->
    S7: Complete one pager when you aready have an address -->
    S8: Complete with first option for all -->
    S9: Check that the order is completed -->
    S10: Check order numbe appear on Thank You page -->
    S11: Check the same order number appear on My AAccount at orders as well

     `, async ({ page, login , pdp, plp ,checkout } ) => {
        test.setTimeout( 90 * 1000)
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    await login.goToRegisterPage()
    let emailGenerated = await  login.completeRegistrationPage();

    await login.goToMyAccount();
    await login.goToAddresses();
    await login.addNewAddress();

    await plp.checkSearchBar('jeans');
    await plp.goToFirstProductFromPLP();
    await pdp.checkAddCartWorks();

    await checkout.goFromViewCartToCheckoutWhenLogin() ;

    await checkout.completeOnePagerWhenAlreadyHaveAnAddress();  
    await checkout.confirmOrder();

    await checkout.checkOrderNumberAppearOnTyPage();
    await login.goToMyAccount();
    await login.checkOrderNumberAppearOnMyAccountAsWell();
});