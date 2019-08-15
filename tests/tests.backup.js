const pricing = require('../pricing')
const products = require('./products')
const employee = require('./employee')
const expect = require('chai').expect

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinon.chai)


describe('calculateProductPrice', () => {
            let sandbox​
            before(() => {
                sandbox = sinon.createSandbox()
            })

            it('returns the price for a medical product for a single employee', () => {
                const selectedOptions = {
                    familyMembersToCover: ['ee']
                }
                const price = pricing.calculateProductPrice(products.medical, employee, selectedOptions)

                expect(price).to.equal(19.26)
            });

            it('returns the price for a medical product for an employee with a spouse', () => {
                const calculatedMedicalPriceSpy = sandbox.spy(pricing, 'calculatedMedicalPrice')
                const calculatedVolLifePriceSpy = sandbox.spy(pricing, 'calculatedVolLifePrice')
                const selectedOptions = {
                    familyMembersToCover: ['ee', 'sp']
                }
                const price = pricing.calculateProductPrice(products.medical, employee, selectedOptions);

                expect(price).to.equal(21.71);
                expect(calculatedMedicalPriceSpy).to.have.callCount(1)
                expect(calculatedVolLifePriceSpy).to.have.callCount(0)
            });

            it('returns the price for a medical product for an employee with a spouse and one child', () => {
                const selectedOptions = {
                    familyMembersToCover: ['ee', 'sp', 'ch']
                }
                const price = pricing.calculateProductPrice(products.medical, employee, selectedOptions)

                expect(price).to.equal(22.88)
            })

            it('returns the price for a voluntary life product for a single employee', () => {
                const selectedOptions = {
                    familyMembersToCover: ['ee'],
                    coverageLevel: [{
                        role: 'ee',
                        coverage: 125000
                    }],
                }
                const price = pricing.calculateProductPrice(products.voluntaryLife, employee, selectedOptions)

                expect(price).to.equal(39.37)
            })

            it('returns the price for a voluntary life product for an employee with a spouse', () => {
                const selectedOptions = {
                    familyMembersToCover: ['ee', 'sp'],
                    coverageLevel: [{
                            role: 'ee',
                            coverage: 200000
                        },
                        {
                            role: 'sp',
                            coverage: 75000
                        },
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
                const unknownProduct = {
                    type: 'vision'
                }

                expect(() => pricing.calculateProductPrice(unknownProduct, {}, {})).to.throw('Unknown product type: vision')
            })

            const


                describe('formatPrice', () => {
                    it('returns a number in dollar format with two decimal places', () => {
                        let result = pricing.formatPrice(7.82)
                        expect(result).to.eq(7.82)
                    })

                })

            describe('getEmployerContribution', () => {
                it('calculates employer contribution when mode is dollars', () => {
                    // Given
                    let testData = {
                        mode: 'dollars',
                        contribution: 50
                    }
                    let testPrice = 100

                    //When
                    result = pricing.getEmployerContribution(testData, testPrice)

                    // Then
                    expect(result).to.eq(testData.contribution)
                })
                it('deducts the employer contribution from price when mode is NOT dollars', () => {
                    // Given
                    let testData = {
                        mode: 'percent',
                        contribution: 25
                    }
                    let testPrice = 50

                    // When
                    result = pricing.getEmployerContribution(testData, testPrice)

                    // Then
                    expect(12.5).to.eq(result)
                })​
           

            describe('getMedicalPricePerRole', () => {
                    it('calculates medical price per role ', () => {
                            //Given
                            role: 'ee'
                            role: 'sp'
                            role: 'ch'
                            role: 'chs'

                        }
                        result = pricing.getMedicalPricePerRole()

                        expect(cost).to.equal(role)
                    })



            })