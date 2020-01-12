const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  tokenRequestFlush: state => state.user.tokenRequestFlush,
  tokenExiredTime: state => state.user.tokenExiredTime
}
export default getters
