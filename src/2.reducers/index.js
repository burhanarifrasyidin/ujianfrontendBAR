import {combineReducers} from 'redux'
import user from './userGlobal'
import cart from './cartGlobal'

export default combineReducers({
    user : user,
    cart : cart
})