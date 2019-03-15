import {combineReducers} from 'redux'
import user from './userGlobal'
import Product from './userGlobal'

export default combineReducers({
    user : user,
    Product : Product // untuk membuat manage(list product) di navbar sebagai admin
})