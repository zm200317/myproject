/*
直接更新state方法的多个方法对象
 */
// import { reqDataSize } from '../api' // 接口函数
export default {
  // 保存用户信息
  saveUserInfo (state, user) {
    state.userInfo = user
  },
  // 获取用户信息
  getUserInfo (state) {
    return state.userInfo
  },
  // 清空用户信息（用户登出）
  userLogout (state) {
    state.userInfo = {}
  },
  // 获取卫星ID信息
  getSatelliteID (state, satelliteID) {
    state.satelliteInfo.SatelliteID = satelliteID
  }
  // 获取卫星数据大小
  /* getDataSize (state, value) {
    const result = reqDataSize(value) // 返回的是一个Promise对象
    result.then(response => { // response为promise里的数据
      state.satelliteInfo.Size = response.data
    })
  } */
}
