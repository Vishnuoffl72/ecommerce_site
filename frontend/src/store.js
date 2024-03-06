import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk  from 'redux-thunk'
import productsReducer from './slics/productsSlice'
import productReducer from './slics/productSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer
})

const store= configureStore({
    reducer,
    middleware: ()=>{
        return [thunk]
    }
})

export default store