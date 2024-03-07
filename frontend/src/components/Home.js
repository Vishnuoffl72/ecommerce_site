import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product1"
import { toast } from "react-toastify";
import Pagination from 'react-js-pagination'


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading ,error, productsCount, resPerPage} = useSelector((state) => state.productsState);
  const [currentPage,setCurrentPage]=useState(1)

  const setCurrrentPageno=(pageNo)=>{
    setCurrentPage(pageNo)
  }

  useEffect(() => {

      if(error){
        toast.error(error,{
        position: "bottom-center"
      })
      return
    }
    dispatch(getProducts(currentPage));
  }, [error,dispatch,currentPage]);

  return (
    <Fragment>
    {loading?<Loader/>:
      <Fragment>
        <MetaData title={"buy best Products"} />
        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
          <div className="row">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product}/>
              ))}
          </div>
        </section>
        {productsCount>0?
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            onChange={setCurrrentPageno}
            totalItemsCount={productsCount}
            itemsCountPerPage={resPerPage}
            nextPageText={'Next'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass={"page-item"}
            linkClass={"page-link"}
          />
        </div>
        :null
        }
      </Fragment>
    }
    </Fragment>
  );
};

export default Home;
