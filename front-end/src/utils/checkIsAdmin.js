const checkIsAdmin = (role) => {
    if(role === 'Admin'){
        return true
    }
    return false
}

export default checkIsAdmin