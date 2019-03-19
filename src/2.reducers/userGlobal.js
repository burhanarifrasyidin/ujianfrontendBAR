const INITIAL_STATE = {
    id: 0,
    username: "",
    error: "",
    loading: false,
    role : '',
    cookie: false
}

export default (state = INITIAL_STATE, action) => {
    // if (action.type === 'LOGIN_SUCCESS') {
    //     return {
    //         ...INITIAL_STATE,
    //         username : action.payload.username, role : action.payload.role
    //     }
    // } else if (action.type === 'LOADING') {
    //     return {
    //         ...INITIAL_STATE,
    //         loading: true
    //     }
    // } else if (action.type === 'USER_NOT_FOUND') {
    //     return {
    //         ...INITIAL_STATE,
    //         error: 'username atau password salah'
    //     }
    // } else if (action.type === 'SYSTEM_ERROR') {
    //     return {
    //         ...INITIAL_STATE,
    //         error: 'System error, coba lagi'
    //     }
    // } else if (action.type === 'RESET_USER') {
    //     return {
    //         ...INITIAL_STATE
    //     }
    //     // untuk form register
    // } else if (action.type === 'USERNAME_NOT_AVAILABLE') {
    //     return {
    //         ...INITIAL_STATE,
    //         error: 'username not available'
    //     }
    // } else {
    //     return state
    // }

    switch(action.type){
        case 'LOGIN_SUCCESS' :
        return {
            ...INITIAL_STATE,
            username : action.payload.username, role : action.payload.role, id : action.payload.id,cookie : true
        }
        case 'LOADING' :
        return {
            ...INITIAL_STATE,
            loading: true,cookie : true
        }
        case 'USER_NOT_FOUND' :
        return {
            ...INITIAL_STATE,cookie : true,
            error: 'username atau password salah'
        }
        case 'SYSTEM_ERROR' :
        return {
            ...INITIAL_STATE,cookie : true,
            error: 'System error, coba lagi'
        }
        case 'RESET_USER' :
        return {
            ...INITIAL_STATE,cookie : true,
        }
        case 'USERNAME_NOT_AVAILABLE' :
        return {
            ...INITIAL_STATE,cookie : true,
            error: 'username not available'
        }
        case 'COOKIE_CHECKED' :
        return {
            ...state,cookie : true
        }
        default :
        return state
    }

}