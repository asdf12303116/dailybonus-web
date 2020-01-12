import Cookies from 'js-cookie'

const TokenKey = 'token'
const TokenExiredTime = 'exiredTime'
const TokenRequestFlush = 'requestFlush'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTokenExiredTime(str) {
  Cookies.set(TokenExiredTime, str)
}

export function getTokenExiredTime() {
  return Cookies.get(TokenExiredTime)
}

export function setTokenRequestFlush(str) {
  Cookies.set(TokenRequestFlush, str)
}

export function getTokenRequestFlush() {
  return Cookies.get(TokenRequestFlush)
}
