import { test, expect } from '../playwright/fixtures'
import * as pw from 'playwright';



test('[Checkut-01] Place order with a random product and continue as guest by choosing money at ordering ',
   async ({ page, checkout, login, plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/awesome');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/awesome');
    await page.waitForTimeout(1000);

    await page.route('**', route => {
      route.continue(); 
    });

    let requestCount = 0;
    page.on("request", () => requestCount++);


    await plp.checkAddARandomItemToCARTisAddedCorrectly()
    await checkout.proceedToCheckoutWhenNoLogin()
    await checkout.continueAsGuest();
    await checkout.completePersonalInfoCheckout()
    await checkout.continueWithMoneyOrder()
    await checkout.confirmOrder();

     console.log("Number of requests made for an order with one product:", requestCount);
});


test('[Checkut-02] Place order with a product and continue as guest by choosing credit card as payment method ', 
  async ({ page, checkout, login, plp, pdp } ) => {

  
    await page.goto('https://demo.nopcommerce.com/flower-girl-bracelet');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/flower-girl-bracelet');
    await page.waitForTimeout(1000);

    await page.route('**', route => {
      route.continue(); 
    });

    let requestCount = 0;
    page.on("request", () => requestCount++);


    await pdp.checkAddCartWorks();
    await checkout.proceedToCheckoutWhenNoLogin()
    await checkout.continueAsGuest();
    await checkout.completePersonalInfoCheckout()
    await checkout.continueWithCreditCard()
    await checkout.completeCardInfo();
    await checkout.confirmOrder();

     console.log("Number of requests made for an order with one product:", requestCount);
});


test('[Checkut-03] Check selectiong a gift wrapping will add a 10 euros extra cost tot total ', async ({ page, checkout, login, plp, pdp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/pride-and-prejudice');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/pride-and-prejudice');
     await page.waitForTimeout(1000);

     await page.route('**', route => {
      route.continue(); 
    });

    let requestCount = 0;
    page.on("request", () => requestCount++);


    await pdp.checkAddCartWorks();
    await checkout.checkSelectingGiftWrappingWillAddExtraCost()
    
     console.log("Number of requests made for an order with one product:", requestCount);
    
});



test('[Checkut-04] Check remove a product from cart page works as expected ', async ({ page, checkout, login, plp, pdp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/leica-t-mirrorless-digital-camera');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/leica-t-mirrorless-digital-camera');
     await page.waitForTimeout(1000);

     await page.route('**', route => {
      route.continue(); 
    });

    let requestCount = 0;
    page.on("request", () => requestCount++);


    await pdp.checkAddCartWorks();
    await checkout.checkRemovingProductFromCartWorks()
    
     console.log("Number of requests made for an order with one product:", requestCount);
    
});




test('[Checkut-05] Check update the amount of a product from 1 to 5 from cart page works as expected ', async ({ page, checkout, login, plp, pdp } ) => {
  
  await page.goto('https://demo.nopcommerce.com/leica-t-mirrorless-digital-camera');
  expect(await page.url()).toBe('https://demo.nopcommerce.com/leica-t-mirrorless-digital-camera');
   await page.waitForTimeout(1000);

   await page.route('**', route => {
    route.continue(); 
  });

  let requestCount = 0;
  page.on("request", () => requestCount++);


  await pdp.checkAddCartWorks();
  await checkout.checkUpdateTheAmountFrom1To5()
  
   console.log("Number of requests made for an order with one product:", requestCount);
  
});



test('[Checkut-06] Check you can not proceed to checkout if "agree terms and cond" are not selected ', async ({ page, checkout, login, plp, pdp } ) => {
  
  await page.goto('https://demo.nopcommerce.com/leica-t-mirrorless-digital-camera');
  expect(await page.url()).toBe('https://demo.nopcommerce.com/leica-t-mirrorless-digital-camera');
   await page.waitForTimeout(1000);

  await pdp.checkAddCartWorks();
  await checkout.checkNotSelectingTermsAndCond()
  
});

