import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slics/productsSlice'

export const getProducts =(keyword,currentPage)=> async(dispatch)=>{
    try {

        dispatch(productsRequest())
        let link=`http://localhost:3000/api/v1/products?page=${currentPage}`
        if(keyword){
            link +=`&keyword=${keyword}`
        }
        const {data}=await axios.get(link)
        dispatch(productsSuccess(data))

    } catch (error) {
        
        dispatch(productsFail(error.response.data.message))

    }
}