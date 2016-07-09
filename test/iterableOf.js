import test from 'ava'
import {iterableOf} from '../'
import {testAndToArray, oneTwoThree} from './_tools'

test('iterableOf', t => {
  const processIterable = testAndToArray(t)
  t.same(processIterable(iterableOf(1, 2, 3)), oneTwoThree)
})
