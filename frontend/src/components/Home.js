import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product1"
import { toast } from "react-toastify";


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading ,error} = useSelector((state) => state.productsState);

  useEffect(() => {

      if(error){
        toast.error(error,{
        position: "bottom-center"
      })
      return
    }
    dispatch(getProducts);
  }, [error]);

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
                <Product product={product}/>
              ))}
          </div>
        </section>
      </Fragment>
    }
    </Fragment>
  );
};

export default Home;
