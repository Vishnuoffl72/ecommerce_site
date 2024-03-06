import axios from 'axios'
import { productFail, productRequest, productSuccess } from '../slics/productSlice'

export const getProduct = id=> async(dispatch)=>{
    try {

        dispatch(productRequest())
        const {data}=await axios.get(`http://localhost:3000/api/v1/product/${id}`)
        dispatch(productSuccess(data))

    } catch (error) {
        
        dispatch(productFail(error.response.data.message))

    }
}