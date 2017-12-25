import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}
//reducer
export function user(state=initState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload, pwd: ''}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}

function authSuccess(obj) {
    //过滤pwd
    const {pwd, ...data} = obj
    return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return { msg, type:ERROR_MSG }
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}

    
    //是否登录
    //当前url，login url不需要跳转
    //用户type（身份）
    //用户是否完善信息（选择头像，个人简介）
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if(res.status===200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('请输入用户名密码')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if(res.status===200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }  
}

export function register({user, pwd, repeatPwd, type}) {
    if(!user || !pwd) {
        return errorMsg('请输入用户名密码')
    }
    if(pwd !== repeatPwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, repeatPwd, type})
            .then(res => {
                if(res.status===200 && res.data.code===0) {
                    dispatch(authSuccess({user, pwd, type}))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }  
}