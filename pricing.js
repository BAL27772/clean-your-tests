function formatPrice(price) {
  return parseInt(price * 100) / 100
}

function getEmployerContribution(employerContribution, price) {
  if (employerContribution.mode === 'dollars') {
    return employerContribution.contribution
  } else {
    const dollarsOff = price * (employerContribution.contribution / 100)
    return dollarsOff
  }
}

function getMedicalPricePerRole(role, costs) {
  const roleCost = costs.find(cost => {
    return cost.role === role
  })

  return roleCost.price
}

function calculateMedicalPrice(product, selectedOptions) {
  let price = 0
  const { familyMembersToCover } = selectedOptions

  familyMembersToCover.forEach((role) => {
    price += getMedicalPricePerRole(role, product.costs)
  })

  return price
}

function calculateVolLifePricePerRole(role, coverageLevel, costs) {
  const eeCoverage = coverageLevel.find(coverage => {
    return coverage.role === role
  })

  const eeCost = costs.find(cost => {
    return cost.role === role
  })

  return (eeCoverage.coverage / eeCost.costDivisor) * eeCost.price
}

function calculateVolLifePrice(product, selectedOptions) {
  let price = 0
  const { familyMembersToCover } = selectedOptions

  familyMembersToCover.forEach((role) => {
    price += calculateVolLifePricePerRole(role, selectedOptions.coverageLevel, product.costs)
  })

  return price
}

function calculateLTDPrice(product, employee, selectedOptions) {
  var price = 0
  const { familyMembersToCover } = selectedOptions

  if (familyMembersToCover.includes('ee')) {
    const eeCoverage = product.coverage.find(coverage => {
      return coverage.role === 'ee'
    })

    const eeCost = product.costs.find(cost => {
      return cost.role === 'ee'
    })

    const salaryPercentage = eeCoverage.percentage / 100

    price += ((employee.salary * salaryPercentage) / eeCost.costDivisor) * eeCost.price
  }

  return price
}

function calculateProductPrice(product, employee, selectedOptions) {
  let price
  let employerContribution

  switch (product.type) {
    case 'medical':
      price = this.calculateMedicalPrice(product, selectedOptions)
      return this.formatPrice(price)
    case 'volLife':
      price = this.calculateVolLifePrice(product, selectedOptions)
      employerContribution = this.getEmployerContribution(product.employerContribution, price)
      return this.formatPrice(price - employerContribution)
    case 'ltd':
      price = this.calculateLTDPrice(product, employee, selectedOptions)
      employerContribution = this.getEmployerContribution(product.employerContribution, price)
      return this.formatPrice(price - employerContribution)
    default:
      throw new Error(`Unknown product type: ${product.type}`)
  }
}

module.exports = { 
  formatPrice,
  getEmployerContribution,
  getMedicalPricePerRole,
  calculateMedicalPrice,
  calculateVolLifePricePerRole,
  calculateVolLifePrice,
  calculateLTDPrice,
  calculateProductPrice

}