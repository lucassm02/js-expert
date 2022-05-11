const Fibonacci = require('./fibonacci.js')
const { deepStrictEqual } = require('assert')
const sinon = require('sinon')

/*
  Fibonacci: The next value corresponds to the sum of the previous two;

  Example:

  Length 3: 0, 1, 1; 
  Length 5: 0, 1, 1, 2, 3; 
*/

async function main() {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)

    for await (const item of fibonacci.execute(3)) {}

    const expectedCallCount = 4
    deepStrictEqual(spy.callCount, expectedCallCount)
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)

    const [...results] = fibonacci.execute(5)

    const { args } = spy.getCall(2);

    const expectedParams = Object.values({ input: 3, current: 1, next: 2 })
    const expectedResult = [0, 1, 1, 2, 3]
    deepStrictEqual(args, expectedParams)
    deepStrictEqual(results, expectedResult)
  }
}

main()
