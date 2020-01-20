import { login, logout } from '@/api/user'
import {
  getToken,
  removeToken,
  setToken,
  setTokenExiredTime,
  setTokenRequestFlush
} from '@/utils/auth'
import {
  getTokenExiredTimeFromToken,
  getUserInfo
} from '../../utils/jwt'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  RESET_STATE: (state) => {
    state.token = getToken()
    state.name = ''
    state.avatar = ''
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
