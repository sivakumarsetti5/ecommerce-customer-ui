import React, { useState,useEffect } from "react";
import styles from "./BuyNow.module.css";

export const ReadyToBuy = ({ itemDetails,updateTotalAmount }) => {
  const { name, cost, category } = itemDetails;
  const [itemCount, setItemCount] = useState(itemDetails.count || 1); 

  const fnDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount=>itemCount - 1);
      updateTotalAmount(-cost)
    }
  };

  const fnIncrement = () => {
    setItemCount(itemCount=>itemCount + 1);
    updateTotalAmount(cost)
  };


  return (
    <div className={`row border border-black m-2 p-3  ${styles.productDtls}` }>
      <div className="col-sm-3">{name}</div>
      <div className="col-sm-2">{category}</div>
      <div className="col-sm-3">
        <button onClick={fnDecrement} className="btn btn-dark">-</button>
        <span className="mx-2">{itemCount}</span>
        <button onClick={fnIncrement} className="btn btn-dark">+</button>
      </div>
      <div className="col-sm-1"><b>₹{itemCount * cost}</b></div>
    </div>
  );
};

