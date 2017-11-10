export function getUsername () {
  return sessionStorage.getItem('username')
}
export function setUsername (username) {
  sessionStorage.setItem('username', username)
}
export function clearUsername () {
  sessionStorage.removeItem('username')
}
