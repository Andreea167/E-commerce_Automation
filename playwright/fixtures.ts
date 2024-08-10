import { test as base } from '@playwright/test'
import { PLP } from '../pom/plp'
import { PDP } from '../pom/pdp'
import { LOGIN } from '../pom/login'
import { CHECKOUT } from '../pom/checkout'


// Declare the types of your fixtures.
export type MyOptions = {
  //defaultItem: string
  url: string
}

type MyFixtures = {
  plp: PLP
  pdp: PDP
  login: LOGIN
  checkout: CHECKOUT
}

export const test = base.extend<MyOptions & MyFixtures>({
  
  url: ['/', { option: true }],

  plp: async ({ page }, use) => {
    const plp = new PLP(page)

    await use(plp)
  },

  pdp: async ({ page }, use) => {
    const pdp = new PDP(page)

    await use(pdp)
  },

  login: async ({ page }, use) => {
    const login = new LOGIN(page)

    await use(login)
  },

  checkout: async ({ page }, use) => {
    const checkout = new CHECKOUT(page)

    await use(checkout)
  },

})
export { expect } from '@playwright/test'
