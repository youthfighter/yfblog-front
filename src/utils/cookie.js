export function getCookie (name) {
  console.log('cookie', document.cookie)
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)
  if (arr) return arr[2]
  else return null
}
export function setCookie (name, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = `${name}=${escape(value)}${((expiredays == null) ? '' : `;expires = ${exdate.toGMTString()}`)}`
}
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`
  }
}
