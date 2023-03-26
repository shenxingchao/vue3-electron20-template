const TokenKey = 'token'

export const getToken = function () {
  return localStorage.getItem(TokenKey)
}

export const setToken = function (token: string) {
  return localStorage.setItem(TokenKey, token)
}

export const removeToken = function () {
  return localStorage.removeItem(TokenKey)
}
