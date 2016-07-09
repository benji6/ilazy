import test from 'ava'
import {iterate} from '../'
import {
  double,
  testAndToArray,
  takeEight
} from './_tools'

test('iterate', t => {
  const processIterable = testAndToArray(t)
  t.same(
    processIterable(takeEight(iterate(double)(1))),
    [1, 2, 4, 8, 16, 32, 64, 128]
  )
  t.same(
    processIterable(takeEight(iterate(double, 1))),
    [1, 2, 4, 8, 16, 32, 64, 128]
  )
})
