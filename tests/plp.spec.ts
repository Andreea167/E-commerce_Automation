import { test, expect } from '../playwright/fixtures'

test.use({ launchOptions: { slowMo: 1000 } })

test('[PLP-01] Check if the Add to Cart functionality works as expected for PLP ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/books');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/books');
    
    await plp.checkAddARandomItemToCARTisAddedCorrectly();
});



test('[PLP-02] Check if the Add to Wishlist functionality works as expected for PLP ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/books');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/books');
    
    await plp.checkAddARandomItemToWISHLISTisAddedCorrectly()
});



test('[PLP-03] Check if the search bar works as expected, introduce apple an expect all products listed are apple ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');
    
    await plp.checkSearchBar('apple');
});


test('[PLP-04] Check if the search bar will not displayed products when introduce invalid word ("abcdef") ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');
    
    await plp.checkSearchBarInvalidWord('abcdef');
});



test('[PLP-05] Check if the Mega Menu works as expected, search Computers -> Software ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/');
    
    await plp.searchSoftwareProductsUsingMegaMenu();
      
});



test('[PLP-06] Check if the Filters works as expected, search Apple using filters ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/electronics');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/electronics');
    
    await plp.searchAppleUsingFilters();
      
});



test('[PLP-07] Check if switching the price from USD to EURO works on PLP ', 
    async ({ page, pdp, plp} ) => {
     await page.goto('https://demo.nopcommerce.com/cell-phones');
     expect(await page.url()).toBe('https://demo.nopcommerce.com/cell-phones');
  
      await page.route('**', route => {
        route.continue(); 
      });
  
     let requestCount = 0;
     page.on("request", () => requestCount++);
  
      await plp.checkSwitchFromUDStoEURwillSwitchAllPricesOnPLP();
    
     console.log("Number of requests made for add cart from PDP:", requestCount);
  });



test('[PLP-08] Check if visiting a random products -> will appear on recent viewed products list ', async ({ page, checkout,  plp } ) => {
  
    await page.goto('https://demo.nopcommerce.com/awesome');
    expect(await page.url()).toBe('https://demo.nopcommerce.com/awesome');
    
    let firstProdVisited= await  plp.chooseARandomPDPFromList();
    await page.goBack();

    if(firstProdVisited)
        await plp.checkRecentProdVisitedAppearsInList(firstProdVisited )
});