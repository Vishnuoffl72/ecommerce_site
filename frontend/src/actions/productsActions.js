import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slics/productsSlice'

export const getProducts =(currentPage)=> async(dispatch)=>{
    try {

        dispatch(productsRequest())
        const {data}=await axios.get(`http://localhost:3000/api/v1/products?page=${currentPage}`)
        dispatch(productsSuccess(data))

    } catch (error) {
        
        dispatch(productsFail(error.response.data.message))

    }
}