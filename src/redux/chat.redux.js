import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:8081')

// action
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatMsg: [],
    users: {},
    unread: 0          
}

// reducer
export function chat(state=initState, action) {
    switch(action.type) {
        case MSG_LIST:
            return {
                ...state, 
                chatMsg: action.payload.msgs, 
                users: action.payload.users, 
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            }
        case MSG_RECV:
            const n = action.payload.to === action.userid? 1 : 0
            return {
                ...state,
                chatMsg: [...state.chatMsg, action.payload],
                unread: state.unread + n
            }
        case MSG_READ:
            const {from, num} = action.payload
            return {
                ...state,
                chatMsg: state.chatMsg.map(v => ({...v, read: from === v.from? true : v.read})),
                unread: state.unread - num
            }
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return {type: 'MSG_LIST', payload: {msgs, users, userid}}
}

function msgRecv(msg, userid) {
    return {type: MSG_RECV, payload: msg, userid}
}

function msgRead({from, to, num}) {
    return {type: MSG_READ, payload: {from, to, num}}
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendMsg', {from, to, msg})
    }
}

export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                const userid = getState().user._id
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({userid, from, num: res.data.num}))
                }
            })
    }
}

export function receiveMsg() {
    return (dispatch, getState) => {
        socket.on('receiveMsg', (data) => {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}
