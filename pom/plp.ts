import { expect, Locator, Page } from '@playwright/test'


//////////////////// ALL GOOD HERE

export class PLP{

    readonly page: Page;

    readonly productsOverview: Locator
    readonly addCartBtns: Locator
    readonly successNotif: Locator
    readonly viewCartBtn: Locator
    readonly priceProducts: Locator

    readonly addWishlistBtn: Locator  
    readonly viewWishlistBtn: Locator  
    readonly nameProduct: Locator    
    
    readonly nameProductInCart: Locator;

    readonly searchBar: Locator
    readonly searchBtn: Locator

    readonly compuersFromMegaMenu: Locator
    readonly softwareFromComputersMegaMenu: Locator

    readonly nameProdsInRecenViewedList : Locator
    readonly selectPriceType: Locator

    readonly shoppingCartBtnFromHeader: Locator

    constructor(page: Page) {
        this.page = page;

        this.productsOverview = page.locator('div.product-item'); 
        this.addCartBtns=page.locator('button.product-box-add-to-cart-button');  
        this.successNotif=page.locator('div.bar-notification.success'); 
        this.viewCartBtn=page.locator('p.content a[href*="/cart"]')   
        this.priceProducts = page.locator('span.price.actual-price');

        this.addWishlistBtn = page.locator('button.add-to-wishlist-button'); 
        this.viewWishlistBtn=page.locator('p.content a[href*="/wishlist"]')  

        this.nameProduct=page.locator('.product-title a'); 

        this.nameProductInCart=page.locator('a.product-name')  

        this.searchBar=page.locator('input#small-searchterms') 
        this.searchBtn=page.locator('button.button-1.search-box-button') 

        this.compuersFromMegaMenu = page.locator('ul.top-menu.notmobile a[href*="/computers"]')
        this.softwareFromComputersMegaMenu = page.locator('ul.sublist.first-level a[href*="/software"]').first();

        this.nameProdsInRecenViewedList = page.locator('.block-recently-viewed-products .product-name');
        this.selectPriceType =page.locator('select#customerCurrency'); 
        
        this.shoppingCartBtnFromHeader = page.locator('li#topcartlink');
    }

    async goto(url:string) {
        await this.page.goto(url);
    }

    async goToShoppingCartFromHeader()
    {
        await this.shoppingCartBtnFromHeader.click();
        await this.page.waitForURL(/cart/);
            await expect(this.page).toHaveURL(/cart/);
    }


    async checkAddARandomItemToCARTisAddedCorrectly() {

        await expect(this.addCartBtns.first()).toBeVisible( {timeout:6000 })
        const totalProducts = await this.addCartBtns.count();
        const randomIndex = Math.floor(Math.random() * totalProducts);
        
        const nameProductText = await this.nameProduct.nth(randomIndex).textContent();

        await this.addCartBtns.nth(randomIndex).click();
        await expect(this.successNotif).toBeVisible();
        await this.viewCartBtn.click();
        await this.page.waitForURL(/cart/);
            await expect(this.page).toHaveURL(/cart/);
        
        const numberProdInCart = await this.nameProductInCart.count();
        
        for(let i=0;i< numberProdInCart ; i++)
            {
                const nameProductCartText = await this.nameProductInCart.nth(i).textContent();
                if(nameProductText === nameProductCartText && nameProductText)
                {
                    await expect(this.nameProductInCart.nth(i)).toHaveText(nameProductText);
                }
            }
       
    }

    async checkAddARandomItemToWISHLISTisAddedCorrectly()  
    {
        const totalProducts = await this.nameProduct.count();
        const randomIndex = Math.floor(Math.random() * totalProducts);
        
        const nameProductText = await this.nameProduct.nth(randomIndex).textContent();

        await this.addWishlistBtn.nth(randomIndex).click();
        await expect(this.successNotif).toBeVisible();
        await this.viewWishlistBtn.click();
        await this.page.waitForURL(/wishlist/);
            await expect(this.page).toHaveURL(/wishlist/);
        

        const numberProdInCart = await this.nameProductInCart.count();
        
        for(let i=0;i< numberProdInCart ; i++)
            {
                const nameProductCartText = await this.nameProductInCart.nth(i).textContent();
                if(nameProductText === nameProductCartText && nameProductText)
                {
                    await expect(this.nameProductInCart.nth(i)).toHaveText(nameProductText);
                }
            }
    }
 
    async checkSearchBar( searchWord : string)  
    {
        await this.searchBar.fill(searchWord);
        await this.searchBtn.click();

        const numberProdAfterSearching = await this.nameProduct.count();
       
        for (let i=0; i < numberProdAfterSearching ; i++)
        {
            const nameProductText = await this.nameProduct.nth(i).textContent();
            if(nameProductText)
            {
                await expect(nameProductText.toLowerCase()).toContain(searchWord);
            }
        }
    }

    async checkSearchBarInvalidWord(searchWord : string)
    {
        await this.searchBar.fill(searchWord);
        await this.searchBtn.click();

        await expect(this.page.locator('div.no-result')).toBeVisible();
        await expect(this.page.getByText('No products were found that matched your criteria.')).toBeVisible();
    }

    async searchSoftwareProductsUsingMegaMenu() 
    {
        await this.page.waitForTimeout(1000);
        await this.compuersFromMegaMenu.hover();
        await this.softwareFromComputersMegaMenu.click();

        const numberProdAfterSearching = await this.nameProduct.count();
       
        for (let i=0; i < numberProdAfterSearching ; i++)
        {
            const nameProductText = await this.nameProduct.nth(i).textContent();
            if (nameProductText) {
            const lowerCaseProductText = nameProductText.toLowerCase();
            const containsKeyword = lowerCaseProductText.includes('adobe') ||
                                    lowerCaseProductText.includes('sound') ||
                                    lowerCaseProductText.includes('windows');
            await expect(containsKeyword).toBe(true);
        }
        }
    }

    async searchAppleUsingFilters() 
    {
        const appleFilter = this.page.locator('a[href*="/apple"]');
        await appleFilter.click();

        const numberProdAfterSearching = await this.nameProduct.count();
       
        for (let i=0; i < numberProdAfterSearching ; i++)
        {
            const nameProductText = await this.nameProduct.nth(i).textContent();
            if(nameProductText)
            {
                await expect(nameProductText.toLowerCase()).toContain('apple');
            }
        }
    }

    async searchShoesUsingFilters() 
    {
        await this.page.locator('a[href*="/apparel"]').nth(2).click();
        const shoesFilter = this.page.locator('a[href*="/shoes"]').nth(2);
        await shoesFilter.click();

        const numberProdAfterSearching = await this.nameProduct.count();
       
        for (let i=0; i < numberProdAfterSearching ; i++)
        {
            const nameProductText = await this.nameProduct.nth(i).textContent();
            if(nameProductText)
            {
                const nameProductTextLower = nameProductText.toLowerCase();
                const containsShoesOrNike = nameProductTextLower.includes('shoes') || nameProductTextLower.includes('nike');

                await expect(containsShoesOrNike).toBe(true);
            }
        }
    }

    async goToFirstProductFromPLP() 
    {
        await this.productsOverview.first().click();
    }

    async goToSecondProductFromPLP() 
    {
        await this.productsOverview.nth(1).click();
    }

    async chooseARandomPDPFromList()
    {
        const totalProducts = await this.addCartBtns.count();
        const randomIndex = Math.floor(Math.random() * totalProducts);
        
        const nameProductText = await this.nameProduct.nth(randomIndex).textContent();

        await this.nameProduct.nth(randomIndex).click();
        return nameProductText;
    }



    async checkRecentProdVisitedAppearsInList(prod1: string)
    {
        console.log("Prod visited: ", prod1)
        const nameProductText = await this.nameProdsInRecenViewedList.first().textContent();
            await expect(nameProductText).toContain(prod1);

            console.log("Prod that appear in recent viewed list: ", nameProductText)
    }

    async checkSwitchFromUDStoEURwillSwitchAllPricesOnPLP()
    {
        const numberProd = await this.nameProduct.count();
       
        for (let i=0; i < numberProd ; i++)
        {
            await expect(this.priceProducts.nth(i)).toContainText('$');
        }
        await this.selectPriceType.selectOption('Euro');
        await this.page.waitForTimeout(1500);
        for (let i=0; i < numberProd ; i++)
            {
                await expect(this.priceProducts.nth(i)).toContainText('€');
            }

    }
        
   


}