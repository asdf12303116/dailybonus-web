import { login, logout, reflushToken } from '@/api/user'
import {
  getToken,
  getTokenExiredTime,
  getTokenRequestFlush,
  removeToken,
  setToken,
  setTokenExiredTime,
  setTokenRequestFlush
} from '@/utils/auth'
import { getTokenExiredTimeFromToken, getUserInfo } from '../../utils/jwt'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  tokenExiredTime: getTokenExiredTime(),
  tokenRequestFlush: getTokenRequestFlush()
}

const mutations = {
  RESET_STATE: (state) => {
    state.token = getToken()
    state.name = ''
    state.avatar = ''
    state.tokenExiredTime = ''
    state.tokenRequestFlush = 0
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_TOKEN_EXPIRED_TIME: (state, tokenExiredTime) => {
    state.tokenExiredTime = tokenExiredTime
  },
  SET_TOKEN_REQUEST_FLUSH: (state, tokenRequestFlush) => {
    state.tokenRequestFlush = tokenRequestFlush
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          commit('SET_TOKEN', response.token)
          commit('SET_TOKEN_EXPIRED_TIME',
            getTokenExiredTimeFromToken(response.token))
          commit('SET_TOKEN_REQUEST_FLUSH', 0)
          setToken(response.token)
          setTokenExiredTime(getTokenExiredTimeFromToken((response.token)))
          setTokenRequestFlush(0)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    const userinfo = getUserInfo(state.token)
    console.log(userinfo)
    commit('SET_NAME', userinfo.username)
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  reflushToken({ commit, state }) {
    const status = parseInt(state.tokenRequestFlush)
    if (status === 1) {
      return new Promise((resolve, reject) => {
        reflushToken()
          .then(response => {
            const newToken = response.token
            commit('SET_TOKEN', newToken)
            commit('SET_TOKEN_EXPIRED_TIME',
              getTokenExiredTimeFromToken(newToken))
            commit('SET_TOKEN_REQUEST_FLUSH', 0)
            setToken(newToken)
            setTokenExiredTime(getTokenExiredTimeFromToken(newToken))
            setTokenRequestFlush(0)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    } else {
      const nowDate = (new Date()).valueOf()
      const tokenExpiredDate = getTokenExiredTime()
      const timeOffset = (tokenExpiredDate -
        parseInt(nowDate)) / 1000
      if (timeOffset < 0) {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
      }
      if (timeOffset <= 600) {
        commit('SET_TOKEN_REQUEST_FLUSH', 1)
        setTokenRequestFlush(1)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

