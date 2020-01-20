export function getTokenPayload(Token) {
  let TokenPayloadString = ''
  try {
    TokenPayloadString = window.atob(Token.split('.')[1])
  } catch (err) {
    return false
  }
  return JSON.parse(TokenPayloadString)
}

export function getTokenExiredTimeFromToken(Token) {
  return getTokenPayload(Token).exp * 1000
}

export function getUsernameFromToken(Token) {
  return getTokenPayload(Token).sub
}

export function getUsertypeFromToken(Token) {
  return getTokenPayload(Token).usertype
}

export function getUserInfo(Token) {
  return {
    username: getUsernameFromToken(Token),
    usertype: getUsertypeFromToken(Token),
    exiredtime: getTokenExiredTimeFromToken(Token)
  }
}
