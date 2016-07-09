import test from 'ava'
import {filter, range} from '../'
import {
  testAndToArray,
  oneTwoThree
} from './_tools'

test('filter', t => {
  const processIterable = testAndToArray(t)
  const anotherOneTwoThree = filter(x => x <= 3, range(1, 100))
  t.same(processIterable(filter(x => x <= 3)(range(1, 100))), oneTwoThree)
  t.same(processIterable(anotherOneTwoThree), oneTwoThree)
  t.same(processIterable(anotherOneTwoThree), oneTwoThree)
  t.same(processIterable(anotherOneTwoThree), oneTwoThree)
})
