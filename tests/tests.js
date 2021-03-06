const pricing = require('../pricing')
const products = require('./products')
const employee = require('./employee')
const expect = require('chai').expect

describe('calculateProductPrice', () => {
  it('returns the price for a medical product for a single employee', () => {
    const selectedOptions = { familyMembersToCover: ['ee'] }
    const price = pricing.calculateProductPrice(products.medical, employee, selectedOptions)

    expect(price).to.equal(19.26)
  })

  it('returns the price for a medical product for an employee with a spouse', () => {
    const selectedOptions = { familyMembersToCover: ['ee', 'sp'] }
    const price = pricing.calculateProductPrice(products.medical, employee, selectedOptions)

    expect(price).to.equal(21.71)
  })

  it('returns the price for a medical product for an employee with a spouse and one child', () => {
    const selectedOptions = { familyMembersToCover: ['ee', 'sp', 'ch'] }
    const price = pricing.calculateProductPrice(products.medical, employee, selectedOptions)

    expect(price).to.equal(22.88)
  })

  it('returns the price for a voluntary life product for a single employee', () => {
    const selectedOptions = {
      familyMembersToCover: ['ee'],
      coverageLevel: [{ role: 'ee', coverage: 125000 }],
    }
    const price = pricing.calculateProductPrice(products.voluntaryLife, employee, selectedOptions)

    expect(price).to.equal(39.37)
  })

  it('returns the price for a voluntary life product for an employee with a spouse', () => {
    const selectedOptions = {
      familyMembersToCover: ['ee', 'sp'],
      coverageLevel: [
        { role: 'ee', coverage: 200000 },
        { role: 'sp', coverage: 75000 },
      ],
    }
    const price = pricing.calculateProductPrice(products.voluntaryLife, employee, selectedOptions)

    expect(price).to.equal(71.09)
  })

  it('returns the price for a disability product for an employee', () => {
    const selectedOptions = {
      familyMembersToCover: ['ee']
    }
    const price = pricing.calculateProductPrice(products.longTermDisability, employee, selectedOptions)

    expect(price).to.equal(22.04)
  })

  it('throws an error on unknown product type', () => {
    const unknownProduct = { type: 'vision' }

    expect(() => pricing.calculateProductPrice(unknownProduct, {}, {})).to.throw('Unknown product type: vision')
  })
})
