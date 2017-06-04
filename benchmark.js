'use strict'

const assert = require('assert')

const Benchmark = require('benchmark')
const I = require('./')
const R = require('ramda')

const length = 1024
const testArray = Array.from({length}, (_, i) => i)
const testInfiniteIterable = {* [Symbol.iterator] () {
  let i = 0
  while (true) yield i++
}}

const add10 = x => x + 10
const triple = x => 3 * x
const divisibleBy5 = x => x % 5 === 0
const isEven = x => x % 2 === 0

const imlazyArrayBenchmark = data => Array.from(I.filter(isEven,
                                                         I.filter(divisibleBy5,
                                                                  I.map(triple,
                                                                        I.map(add10, data)))))

const nativeBenchmark = data => data
  .map(add10)
  .map(triple)
  .filter(divisibleBy5)
  .filter(isEven)

const ramdaTransducerArrayBenchmark = R.into([], R.compose(
  R.map(add10),
  R.map(triple),
  R.filter(divisibleBy5),
  R.filter(isEven)
))

const ramdaTransducerInfiniteBenchmark = R.into([], R.compose(
  R.map(add10),
  R.map(triple),
  R.filter(divisibleBy5),
  R.filter(isEven),
  R.take(length)
))

const imlazyInfiniteBenchmark = data => Array.from(I.take(
  length,
  I.filter(isEven, I.filter(divisibleBy5, I.map(triple, I.map(add10, data))))
))

assert.deepStrictEqual(
  imlazyInfiniteBenchmark(testInfiniteIterable),
  ramdaTransducerInfiniteBenchmark(testInfiniteIterable)
)
assert.deepStrictEqual(
  imlazyArrayBenchmark(testArray),
  ramdaTransducerArrayBenchmark(testArray)
)
assert.deepStrictEqual(
  ramdaTransducerArrayBenchmark(testArray),
  nativeBenchmark(testArray)
)

new Benchmark.Suite()
  .add('infinite iterable - imlazy', () => { imlazyInfiniteBenchmark(testInfiniteIterable) })
  .add('infinite iterable - transducer', () => { ramdaTransducerInfiniteBenchmark(testInfiniteIterable) })
  .add('array - imlazy', () => { imlazyArrayBenchmark(testArray) })
  .add('array - transducer', () => { ramdaTransducerArrayBenchmark(testArray) })
  .add('array - native', () => { nativeBenchmark(testArray) })
  .on('cycle', x => process.stdout.write(`${String(x.target)}\n`))
  .on('complete', function () {
    process.stdout.write(`Fastest is ${this.filter('fastest').map('name')}\n`)
  })
  .run({async: true})
