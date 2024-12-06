import React ,{useEffect,useState}from "react";
import styles from "./BuyNow.module.css";
import { useSelector } from "react-redux";
import Ajax from "../../../services/ajax";
import { AppCookies } from "../../../services/cookies";

export const BuyNow = () => {
  const readyToBuyList = useSelector((state) => state?.appReducer?.readyToBuyList); //list of objects
  const [address,setAddress] = useState([])
  const[itemCount,setItemCount] = useState(1)
  const fnGetAddress = async () => {
    try {
        const res = await Ajax.get(`address/get?uid=${AppCookies.getCookie('uid')}`)
        console.log('dataaaaa',res?.data)
        setAddress(res?.data)
    } catch (ex) {
        setAddress([])
        console.error("Address", ex)
    }

}
const fnDecrement = () =>{
  if(itemCount>=1){
    setItemCount(itemCount=>itemCount-1)
  }
}
const fnIncrement = () =>{
  setItemCount(itemCount=>itemCount+1)
}
  useEffect(()=>{
    fnGetAddress()
  },[])
  return (
    <div className={styles.buyNowContainer}>
      <div className={styles.addressContainer}>
        <div className="text-center bg-primary p-2 text-white">Delivery Address</div>
        {address.map(({fullName,phone,address,pincode})=>{
          return(
            <div className={` my-2 p-3 ${styles.address}`}>
              <div className="d-flex">
                <p className="me-5">{fullName}</p>
                <p>{phone}</p>
              </div>
              <p className="me-5">{address}</p>
              <p>Pincode:{pincode}</p>
            </div>
          )
        })}
      </div>
      <div className="container-fluid">
        <div className="p-3 fs-5"><b>Price Details</b></div>
        {readyToBuyList.map(({ name, cost, category }) => {
          return (
            <div className={`row border border-black m-2 p-3 ${styles.productDtls}`}>
              <div className='col-sm-3'>{name}</div>
              <div className='col-sm-2'>{category}</div>
              <div className='col-sm-3'>
                <button onClick={fnDecrement}>-</button>
                {itemCount}
                <button onClick={fnIncrement}>+</button>
              </div>
              <div className='col-sm-1'>{cost}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
