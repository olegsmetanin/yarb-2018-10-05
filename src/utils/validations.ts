const isPhoneRegexp1 = /\(\d\d\d\) \d\d\d-\d\d\d\d/
const isPhoneRegexp2 = /\([2-9]\d\d\) [2-9]\d\d-\d\d\d\d/
const isPhoneRegexp3 = /\([2-9]\d\d\)[2-9]\d\d-\d\d\d\d/
const isPhoneRegexp4 = /\d/

export function isPhone(val: string) {
  return isPhoneRegexp1.test(val) || isPhoneRegexp2.test(val) || isPhoneRegexp3.test(val) || isPhoneRegexp4.test(val)
}
