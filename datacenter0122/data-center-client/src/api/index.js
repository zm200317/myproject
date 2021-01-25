/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://192.168.110.158:8080'// 钱渠的服务器IP地址
const BASE_URL = 'http://127.0.0.1:8080'// 本机的服务器地址
// const BASE_URL = 'http://192.168.137.40:8080'// 钱渠的服务器地址
// const BASE_URL = '/api'
// 获取卫星信息总条数
export const reqTotalNumb = (SatelliteID) => ajax(BASE_URL + '/totalnumb', { SatelliteID })
// 获取卫星信息总条数
export const reqTotalNumbL0 = (SatelliteID) => ajax(BASE_URL + '/totalnumbL0', { SatelliteID })
// 获取卫星信数据大小
export const reqDataSize = (SatelliteID) => ajax(BASE_URL + '/dataSize', { SatelliteID })
// 获取ZY1E L0 级卫星数据
export const reqZy1eL0 = (SatelliteID, currentPage, pagesize) => ajax(BASE_URL + '/zy1eL0', { SatelliteID, currentPage, pagesize })
// 获取每页显示的卫星信息数据
export const reqSatellites = (info) => ajax(BASE_URL + '/satellites', info, 'POST')
// 退出界面后需要删除卫星数据缩略图
export const resDelThumb = () => ajax(BASE_URL + '/delThumb')
// 收藏卫星数据
export const reqCollect = (userInfo) => ajax(BASE_URL + '/collect', userInfo, 'POST')
// 我的收藏
export const reqMyCollection = (userID) => ajax(BASE_URL + '/mycollect', { userID })
// 我的收藏里面的删除按钮
export const reqDelete = (info) => ajax(BASE_URL + '/delete', info, 'POST')
// 下载卫星数据
export const reqDownload = (dir, name) => ajax(BASE_URL + '/download', { dir, name }, 'GET', { responseType: 'blob' })//, { responseType: 'blob' }
// 获取XML详细信息
export const reqXmlDetail = (XMLName) => ajax(BASE_URL + '/detail', { XMLName })
// 发送邮箱验证码
export const reqMeilCode = (useremail) => ajax(BASE_URL + '/getMailCode', { useremail })
// 用户注册接口
export const reqRegister = (user) => ajax(BASE_URL + '/register', user, 'POST')
// 用户登录接口
export const reqLogin = (user) => ajax(BASE_URL + '/login', user, 'POST')
// 用户密码重置
export const reqResetPass = (user) => ajax(BASE_URL + '/reset_pass', user, 'POST')
// 获取用户信息
export const reqUserInfo = (userid) => ajax(BASE_URL + '/userinfo', { userid }, 'POST')
// 用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')
// 获得一次性验证码
export const reqCaptcha = () => ajax(BASE_URL + '/captcha')
// 上传用户头像
export const reqUploadHeader = (srcUrl, userId) => ajax(BASE_URL + '/uploadHeader', { srcUrl, userId })
// 完善个人信息
export const reqImproveUserInfo = (ruleForm) => ajax(BASE_URL + '/improveuserinfo', ruleForm, 'POST')
// 获取所有用户信息，用于后台管理
export const reqUserNumb = () => ajax(BASE_URL + '/userNumb')
// 获取所有用户信息，用于后台管理
export const reqAccount = (currentPage, pagesize) => ajax(BASE_URL + '/usersManage', { currentPage, pagesize })
