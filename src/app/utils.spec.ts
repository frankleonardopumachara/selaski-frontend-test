import {Utils} from './utils'

describe('Testing Utils', function () {
  it('should return mysql datetime format', function () {
    const dateIsoFormat = '2022-07-05T20:59:15.742Z'
    const mysqlDatetimeFormat = '2022-07-05 20:59:15.742 '
    expect(Utils.toDatetime(dateIsoFormat)).toBe(mysqlDatetimeFormat)
  })
})
