export function getRedirectPath({type, avatar}) {
    //user.type==>boss/genius,user.avatar==>bossinfo/gen...
    let url = (type ==='boss') ? '/boss' : '/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}