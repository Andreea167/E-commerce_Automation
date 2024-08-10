import { expect, Locator, Page } from '@playwright/test'


export class PDP{

    readonly page: Page;
    readonly productImage: Locator;
    readonly informationsProduct: Locator
    readonly pricePrduct: Locator
    readonly nameProduct: Locator
    readonly successNotification: Locator
    readonly viewCartBtn: Locator
    readonly addCartBtn: Locator;
    readonly addWishlistBtn: Locator
    readonly viewWishlistBtn: Locator

    readonly reviewForm: Locator
    readonly inputTitleForReview: Locator
    readonly inputEmailForReview: Locator
    readonly inputTextForReview: Locator
    readonly submitReviewBtn: Locator

    readonly nameProductInCart: Locator;
    readonly quantityInCart: Locator

    readonly priceProdInCart: Locator

    readonly selectPriceType :Locator

    constructor(page: Page) {
        this.page = page;
        this.productImage=page.locator('div.picture').first();  
        this.informationsProduct = page.locator('.full-description'); 
        this.pricePrduct = page.locator('div.product-price span');  
        this.nameProduct = page.locator('div.product-name h1');   

        this.successNotification=page.locator('div.bar-notification.success'); 
        this.viewCartBtn=page.locator('p.content a[href*="/cart"]') 
        this.addCartBtn = page.locator('button.button-1.add-to-cart-button'); 
        this.addWishlistBtn = page.locator('div.add-to-wishlist button')
        this.viewWishlistBtn = page.locator('p.content a[href*="/wishlist"]') 
        
        this.reviewForm = page.locator('div#review-form'); 
        this.inputTitleForReview = page.locator('input.review-title') 
        this.inputTextForReview = page.locator('textarea.review-text') 
        this.submitReviewBtn = page.locator('button#add-review'); 

        this.nameProductInCart=page.locator('a.product-name')
        this.quantityInCart = page.locator('button.disabled');
        
        this.priceProdInCart = page.locator('span.product-unit-price');

        this.selectPriceType =page.locator('select#customerCurrency'); 


    }

    async goto(url) {
        await this.page.goto(url);
    }

    async checkAllInformationAreAvailableForPDP()
    {
        await expect(this.nameProduct).toBeVisible();
        await expect(this.productImage).toBeVisible();
        await expect(this.informationsProduct).toBeVisible();
        await expect(this.pricePrduct).toBeVisible();
    } 


    async checkAddCartWorks()  //
    {
        const nameProductText = await this.nameProduct.textContent();
        const priceProdVal= await this.getPrice(await this.pricePrduct);
        console.log("Price on PDP is: " ,priceProdVal);
        await this.page.waitForTimeout(2000);
        await this.addCartBtn.click();
        await expect(this.successNotification).toBeVisible();
        await this.viewCartBtn.click();
        await this.page.waitForURL(/cart/);
            await expect(this.page).toHaveURL(/cart/);

            const numberProdInCart = await this.nameProductInCart.count();
        
            for(let i=0;i< numberProdInCart ; i++)
            {
                const nameProductCartText = await this.nameProductInCart.nth(i).textContent();
                if(nameProductText === nameProductCartText && nameProductText)
                {
                    const priceInCartVal = await this.getPrice(await this.priceProdInCart);
                    console.log( "Price in cart is: " , priceInCartVal);

                    await expect(this.nameProductInCart.nth(i)).toHaveText(nameProductText);
                }
            }
    }


    async checkAddToWISHLISTworksForPDP()  
    {
        await expect(this.addWishlistBtn).toBeVisible({timeout: 10000})
        const nameProductText = await this.nameProduct.textContent();

        await this.addWishlistBtn.click();
        await expect(this.successNotification).toBeVisible({timeout: 10000});
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



    async getPrice(x) {   
        let priceText = await x.textContent();
        priceText = priceText.replace(/[,$]/g, '').trim();
        if (priceText !== null && priceText !== undefined) {
            const priceValue = parseFloat(priceText);
            return priceValue;
        } 
    }

    
    async checkWriteReviewWillUpdateTheReviewOnPage()  
    {
        await expect(this.reviewForm).toBeVisible();
        await this.inputTitleForReview.fill('Best product!');
        await this.inputTextForReview.fill('A good product with high quality.')
        await this.page.locator('input#addproductrating_4').click();
        await this.submitReviewBtn.click();
            await expect(this.successNotification).toBeVisible();
            await expect(await this.page.getByText('Best product!').first()).toBeVisible();
            await expect(await this.page.getByText('A good product with high quality.').first()).toBeVisible();
        
    }

    async checkSwitchFromUDStoEUR()
    {
            await expect(this.pricePrduct).toContainText('$');
       
        await this.selectPriceType.selectOption('Euro');
        await this.page.waitForTimeout(1500);
        await expect(this.pricePrduct).toContainText('€');
            
    }

    async goToPDP()
    {
        await this.page.goto('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');
        expect(await this.page.url()).toBe('https://demo.nopcommerce.com/htc-one-m8-android-l-50-lollipop');
    }

}