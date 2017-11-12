export function getUsername () {
  return localStorage.getItem('username')
}
export function setUsername (username) {
  localStorage.setItem('username', username)
}
export function clearUsername () {
  localStorage.removeItem('username')
}
