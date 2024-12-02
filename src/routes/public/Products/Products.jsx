import React, { useEffect } from "react";
import { GET_ALL_PRODUCTS } from "../../../graphql/queries/getAllProducts";
import { useQuery } from "@apollo/client";
import styles from './Products.module.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Products = () => {
  const { loading, data} = useQuery(GET_ALL_PRODUCTS);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({
      type:"LOADER",
      payload:loading
    })
  },[loading])
  return (
    <div className={styles.productCon}>
      {data?.getProducts?.map(({ _id, name, cost, filePath,category }, index) => {
        return (
          <div key={index} className={styles.productCard} onClick={() => navigate(`/product-info/${_id}`)}>
            <div>
              <img
                src={`${
                  process.env.REACT_APP_VENDOR_BASE_URL
                }${filePath}?time=${Date.now()}`}
                loading="lazy"
                alt='product'
              />
            </div>
            <div>{name}</div>
            <div>{category}</div>
            <div>RS: {cost}/-</div>
          </div>
        );
      })}
    </div>
  );
};
