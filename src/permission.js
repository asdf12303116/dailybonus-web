import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken, getTokenExiredTime, getTokenRequestFlush,
  setToken,
  setTokenExiredTime,
  setTokenRequestFlush
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getTokenExiredTimeFromToken } from '@/utils/jwt'
import { reflushToken } from '@/api/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log(store.getters.isLogin)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        // remove token and go to login page to re-login
        await store.dispatch('user/getInfo')
        checkReflushToken().catch(() => {
          Message.error('登录失效，请重新登录')
          store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        })

        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
function checkReflushToken() {
  const status = parseInt(getTokenRequestFlush())
  if (status === 1) {
    return new Promise((resolve, reject) => {
      reflushToken()
        .then(response => {
          const newToken = response.token
          setToken(newToken)
          setTokenExiredTime(getTokenExiredTimeFromToken(newToken))
          setTokenRequestFlush(0)
          resolve()
        }).catch(() => {
          reject()
        })
    }).catch(() => {
      throw new Error('token无效')
    })
  } else {
    return new Promise(() => {
    }).then(() => {
      const nowDate = (new Date()).valueOf()
      const tokenExpiredDate = getTokenExiredTime()
      const timeOffset = (tokenExpiredDate -
        parseInt(nowDate)) / 1000
      if (timeOffset < 0 || isNaN(timeOffset)) {
        throw new Error('token无效')
      }
      if (timeOffset <= 600) {
        setTokenRequestFlush(1)
      }
    })
  }
}
