import { expect, Locator, Page } from '@playwright/test'
import * as pw from 'playwright';

export class CHECKOUT {
    readonly page: Page
  
    readonly agreeTermsAndCondBtn: Locator
    readonly goToCheckoutBtn: Locator;
    readonly continueAsGuestBtn: Locator


    readonly nameCard:Locator
    readonly cardNumber: Locator
    readonly cvc: Locator
    readonly monthExpiration: Locator
    readonly yearExpriration: Locator
    readonly payOrderBtn: Locator;
    readonly checkoutModal: Locator;
    readonly goToLoginFromCheckoutModalBtn: Locator
    readonly goToCartFromHeaderBtn:Locator

    //cart page
    readonly giftWrappingBtn: Locator
    readonly totalPriceCartSummary: Locator
    readonly removeProdFromCartBtn: Locator
    readonly productsInCart : Locator
    readonly itemQuantity : Locator
    readonly priceInCart : Locator
    readonly subtotalPriceInCart: Locator

    //one pager
    readonly passInputRegistraation: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly email: Locator
    readonly county: Locator
    readonly city: Locator
    readonly addressInput: Locator
    readonly zipCode: Locator
    readonly mobileNumber: Locator;

    readonly continueFlowBtn1: Locator
    readonly continueFlowBtn2: Locator
    readonly continueFlowBtn3: Locator
    readonly continueFlowBtn4: Locator

    readonly confirmOrderBtn: Locator
    readonly confirmationMsg: Locator

    readonly orderNumber: Locator


    constructor(page: Page) {
        this.page = page
        

        this.agreeTermsAndCondBtn = page.locator('input#termsofservice'); //
        this.goToCheckoutBtn=page.locator('button#checkout'); //
        this.continueAsGuestBtn =page.locator('button.checkout-as-guest-button');  //


        this.nameCard=page.locator('#CardholderName');
        this.cardNumber=page.locator('#CardNumber');
        this.cvc=page.locator('#CardCode');
        this.monthExpiration=page.locator('#ExpireMonth');
        this.yearExpriration=page.locator('#ExpireYear');
        
        this.goToCartFromHeaderBtn=page.locator('span.cart-label') //


        //cart page //
        this.giftWrappingBtn = page.locator('.checkout-attributes #checkout_attribute_1');
        this.totalPriceCartSummary = page.locator('td.cart-total-right span.value-summary').nth(3);
        this.removeProdFromCartBtn = page.locator('.remove-btn');
        this.productsInCart = page.locator('a.product-name');
        this.itemQuantity = page.locator('td.quantity .qty-input')
        this.priceInCart = page.locator('span.product-unit-price');
        this.subtotalPriceInCart = page.locator('span.product-subtotal');

        //one pager - checkout *****
        this.firstName=page.locator('input#BillingNewAddress_FirstName')
        this.lastName=page.locator('input#BillingNewAddress_LastName')
        this.email =page.locator('input#BillingNewAddress_Email');
        this.county=page.locator('select#BillingNewAddress_CountryId')
        this.city=page.locator('input#BillingNewAddress_City')
        this.addressInput=page.locator('input#BillingNewAddress_Address1')
        this.zipCode=page.locator('input#BillingNewAddress_ZipPostalCode')
        this.mobileNumber=page.locator('input#BillingNewAddress_PhoneNumber')
        this.continueFlowBtn1 = page.locator('button.new-address-next-step-button').first();
        this.continueFlowBtn2 = page.locator('button.shipping-method-next-step-button')
        this.continueFlowBtn3 = page.locator('button.payment-method-next-step-button')
        this.continueFlowBtn4 = page.locator('button.payment-info-next-step-button')

        this.confirmOrderBtn = page.locator ('button.confirm-order-next-step-button');
        
        this.confirmationMsg = page.locator('div.order-completed div.title strong');

        this.orderNumber = page.locator('.order-number strong');

        
    }

    async goto( url: string) {
        await this.page.goto(url)
    }


    async goToCart()  
    {
        await this.goToCartFromHeaderBtn.click();
        await this.page.waitForURL(/cart/);
        await expect(this.page).toHaveURL(/cart/);

    }

    async checkSelectingGiftWrappingWillAddExtraCost() 
    {
        const priceBeforeAddingGift = await this.getPrice(await this.totalPriceCartSummary);
        await this.giftWrappingBtn.click();
        await this.giftWrappingBtn.selectOption({ index: 1 });
        await this.page.waitForTimeout(2500);
        const priceAfterAddingGift = await this.getPrice(await this.totalPriceCartSummary);
        console.log("Price after adding Gift Wrapping: ", priceAfterAddingGift);
        if(priceBeforeAddingGift)
            await expect(priceAfterAddingGift).toBeGreaterThan(priceBeforeAddingGift);
        
    }

    async getPrice(x) {  
        let priceText = await x.textContent();
        priceText = priceText.replace(/[,$]/g, '').trim();
        if (priceText !== null && priceText !== undefined) {
            const priceValue = parseFloat(priceText);
            return priceValue;
        } 
    }

    async checkRemovingProductFromCartWorks()
    {
        const numerProdInCartBeforeRemoving = await this.productsInCart.count();
        await this.removeProdFromCartBtn.first().click();
        await this.page.waitForTimeout(1000);
            await expect(numerProdInCartBeforeRemoving).toBeGreaterThan(await this.productsInCart.count());
    }

    async checkUpdateTheAmountFrom1To5()
    {
        const priceBeforeUpdate = await this.getPrice( this.subtotalPriceInCart.first() );
        await this.itemQuantity.first().fill('5');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1500);
        const priceAfterUpdate = await this.getPrice( this.subtotalPriceInCart.first() );
        if(priceBeforeUpdate)
            await expect(priceBeforeUpdate * 5).toEqual(priceAfterUpdate);
    }


    async goFromViewCartToCheckoutWhenLogin()  
    {
        await this.agreeTermsAndCondBtn.click();
        await this.goToCheckoutBtn.click();
        await this.page.waitForURL(/checkout/);
            await expect(this.page).toHaveURL(/checkout/);

    }

    async proceedToCheckoutWhenNoLogin()  
    {
        await this.agreeTermsAndCondBtn.click();
        await this.goToCheckoutBtn.click();
          
        await this.page.waitForURL(/login/);
        await expect(this.page).toHaveURL(/login/);
    }

    async continueAsGuest()  
    {
        await this.continueAsGuestBtn.click();

    }

    async completePersonalInfoCheckout()  
    {
        await this.firstName.fill('Mark');
        await this.lastName.fill('Pop');
        await this.email.fill('test@gmail.com');
        await this.county.click();
        await this.county.selectOption({ index: 21 });
        await this.city.fill('Cluj-Napoca');
        await this.addressInput.fill('Str. Baritiu nr.26-28');
        await this.zipCode.fill('123456');
        await this.mobileNumber.fill('0755555555');
        await this.continueFlowBtn1.click();
        await this.continueFlowBtn2.click();
        
    }

    async continueWithMoneyOrder()
    {
        await this.continueFlowBtn3.click();
        await this.continueFlowBtn4.click();
    }

    async continueWithCreditCard()
    {
        const creditCardCheckox = await this.page.locator('#paymentmethod_1');
        await creditCardCheckox.click();
        await this.continueFlowBtn3.click();

    }

    async completeCardInfo() {

        await this.nameCard.fill("Pop Mark");
        await this.cardNumber.fill("1111 2222 3333 4444");
        await this.cvc.fill("123");
        await this.monthExpiration.selectOption({ index: 2 });
        await this.yearExpriration.selectOption({ index: 6 });

        await this.continueFlowBtn4.click();
    }

    async confirmOrder()
    {
        await this.confirmOrderBtn.click();
        await expect(this.confirmationMsg).toHaveText('Your order has been successfully processed!')

    }

    async completeOnePagerWhenAlreadyRegster() 
    {
        await this.county.click();
        await this.county.selectOption('Romania');
        await this.city.fill('Cluj-Napoca');
        await this.addressInput.fill('Str. Baritiu nr.26-28');
        await this.zipCode.fill('123456');
        await this.mobileNumber.fill('0755555555');
        await this.continueFlowBtn1.click();
        await this.continueFlowBtn2.click(); 
    }

    async checkNotSelectingTermsAndCond()
    {
        await this.goToCheckoutBtn.click();
        const warnning = await this.page.locator('div.ui-dialog');
        await expect(warnning).toBeVisible();
    }

    async checkOrderNumberAppearOnTyPage()
    {
        const text = await this.orderNumber.innerText();
 
        if(text)
        { 
            const number = text.match(/\d+/)[0];
             
            console.log('Order number on thank you page: ', number);
        }
    
    }

    async completeOnePagerWhenAlreadyHaveAnAddress()
    {
        await this.page.getByText('Continue').first().click();
        await this.page.getByText('Continue').nth(2).click();
        await this.page.getByText('Continue').nth(3).click();
        await this.page.getByText('Continue').nth(4).click();

    }
    



}