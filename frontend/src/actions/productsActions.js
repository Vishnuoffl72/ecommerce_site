import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slics/productsSlice'

export const getProducts = async(dispatch)=>{
    try {

        dispatch(productsRequest())
        const {data}=await axios.get('http://localhost:3000/api/v1/products')
        dispatch(productsSuccess(data))

    } catch (error) {
        
        dispatch(productsFail(error.response.data.message))

    }
}