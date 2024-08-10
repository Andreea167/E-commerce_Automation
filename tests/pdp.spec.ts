import { test, expect } from '../playwright/fixtures'


test('[PDP-01] Check if PDP appear as expected ', async ({ page, pdp, plp} ) => {
  await page.goto('https://demo.nopcommerce.com/apple-macbook-pro-13-inch');
  expect(await page.title()).toBe('nopCommerce demo store. Apple MacBook Pro 13-inch');

    await pdp.checkAllInformationAreAvailableForPDP();
  
});

 
test('[PDP-02] Check if add to cart works for PDP ', async ({ page, pdp, plp} ) => {
     await page.goto('https://demo.nopcommerce.com/apple-macbook-pro-13-inch');
     expect(await page.title()).toBe('nopCommerce demo store. Apple MacBook Pro 13-inch');
 
       await pdp.checkAddCartWorks();
 });


 test('[PDP-03] Check if add to cart works for a product with discount ', async ({ page, pdp, plp} ) => {
   await page.goto('https://demo.nopcommerce.com/levis-511-jeans');
   expect(await page.url()).toBe('https://demo.nopcommerce.com/levis-511-jeans');

    await pdp.checkAddCartWorks();
});


test('[PDP-04] Check if adding to WISHLIST works for a product with discount ', async ({ page, pdp, plp} ) => {
  await page.goto('https://demo.nopcommerce.com/flower-girl-bracelet');
  expect(await page.url()).toBe('https://demo.nopcommerce.com/flower-girl-bracelet');

   await pdp.checkAddToWISHLISTworksForPDP();
 
});


test('[PDP-05] Check if switching the price from USD to EURO works on PDP ', 
  async ({ page, pdp, plp} ) => {
   await page.goto('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');
   expect(await page.url()).toBe('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');

    await pdp.checkSwitchFromUDStoEUR();
  
});


test('[PDP-06] Check if you can write a review on PDP ', 
  async ({ page, pdp, login} ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

   await login.goToRegisterPage()
   await login.completeRegistrationPage();

   await pdp.goToPDP()
    await pdp.checkWriteReviewWillUpdateTheReviewOnPage();
  
});


