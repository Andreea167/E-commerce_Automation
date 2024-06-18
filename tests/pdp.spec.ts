import { test, expect } from '../playwright/fixtures'


test('[PDP-01] Check if PDP appear as expected ', async ({ page, pdp, plp} ) => {
  await page.goto('https://demo.nopcommerce.com/apple-macbook-pro-13-inch');
  expect(await page.title()).toBe('nopCommerce demo store. Apple MacBook Pro 13-inch');

  await page.route('**', route => {
      route.continue(); 
    });

  let requestCount = 0;
 page.on("request", () => requestCount++);

    await pdp.checkAllInformationAreAvailableForPDP();
  
  console.log("Number of requests made for add cart from PDP:", requestCount);
});

 
test('[PDP-02] Check if add to cart works for PDP ', async ({ page, pdp, plp} ) => {
     await page.goto('https://demo.nopcommerce.com/apple-macbook-pro-13-inch');
     expect(await page.title()).toBe('nopCommerce demo store. Apple MacBook Pro 13-inch');
 
     await page.route('**', route => {
         route.continue(); 
       });
 
     let requestCount = 0;
    page.on("request", () => requestCount++);
 
       await pdp.checkAddCartWorks();
     
     console.log("Number of requests made for add cart from PDP:", requestCount);
 });

 

 test('[PDP-03] Check if add to cart works for a product with discount ', async ({ page, pdp, plp} ) => {
   await page.goto('https://demo.nopcommerce.com/levis-511-jeans');
   expect(await page.url()).toBe('https://demo.nopcommerce.com/levis-511-jeans');

    await page.route('**', route => {
      route.continue(); 
    });

   let requestCount = 0;
   page.on("request", () => requestCount++);

    await pdp.checkAddCartWorks();
  
   console.log("Number of requests made for add cart from PDP:", requestCount);
});


test('[PDP-04] Check if adding to WISHLIST works for a product with discount ', async ({ page, pdp, plp} ) => {
  await page.goto('https://demo.nopcommerce.com/flower-girl-bracelet');
  expect(await page.url()).toBe('https://demo.nopcommerce.com/flower-girl-bracelet');

   await page.route('**', route => {
     route.continue(); 
   });

  let requestCount = 0;
  page.on("request", () => requestCount++);

   await pdp.checkAddToWISHLISTworksForPDP();
 
  console.log("Number of requests made for add cart from PDP:", requestCount);
});


test('[PDP-05] Check if switching the price from USD to EURO works on PDP ', 
  async ({ page, pdp, plp} ) => {
   await page.goto('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');
   expect(await page.url()).toBe('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');

    await page.route('**', route => {
      route.continue(); 
    });

   let requestCount = 0;
   page.on("request", () => requestCount++);

    await pdp.checkSwitchFromUDStoEUR();
  
   console.log("Number of requests made for add cart from PDP:", requestCount);
});


test('[PDP-06] Check if you can write a review on PDP ', 
  async ({ page, pdp, plp , login} ) => {
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');

    
    await page.route('**', route => {
      route.continue(); 
    });

   let requestCount = 0;
   page.on("request", () => requestCount++);

   await login.goToRegisterPage()
   await login.completeRegistrationPage();
   await page.goto('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');

    await pdp.checkWriteReviewWillUpdateTheReviewOnPage();
  
   console.log("Number of requests made for add cart from PDP:", requestCount);
});


