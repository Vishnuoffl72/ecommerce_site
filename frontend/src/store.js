import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk  from 'redux-thunk'
import productsReducer from './slics/productsSlice'

const reducer = combineReducers({
    productsState: productsReducer
})

const store= configureStore({
    reducer,
    middleware: ()=>{
        return [thunk]
    }
})

export default store