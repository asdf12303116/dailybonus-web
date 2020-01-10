
export function isTokenExpired(data) {
  const expDate = new Date(data.exp * 1000)
  const nowDate = new Date()
  return expDate <= nowDate
}

export function getTokenPayload(Token) {
  const TokenPayloadString = window.atob(Token.split('.')[1])
  return JSON.parse(TokenPayloadString)
}
