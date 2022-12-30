const sum = (a, b) => {
  return a + b
}

describe('dummy test', () => {
  test('adds 2 + 4 to equal 6', () => {
    expect(sum(2, 4)).toBe(6)
  })
})

/* Transaction TEST CASES
Use all USD to buy one coin
Sell all of one coin

Buy coin1 w/ portion of cash
Buy coin1 w/ portion of cash
Buy coin2 w/ portion of cash
Sell partial of coin1
*/