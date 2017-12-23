import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    isAuth: '',
    msg: '',
    user: '',
    pwd: '',
    type: ''
}
//reducer
export function user(state=initState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload}
        case ERROR_MSG:
            return {...state, aiAuth: false, msg: action.msg}
        default:
            return state
    }
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return { msg, type:ERROR_MSG }
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
                    dispatch(registerSuccess({user, pwd, type}))
                }else {
                    dispatch(ERROR_MSG(res.data.msg))
                }
            })
    }  
}