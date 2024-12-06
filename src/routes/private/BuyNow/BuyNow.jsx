import React ,{useEffect,useState}from "react";
import styles from "./BuyNow.module.css";
import { useSelector } from "react-redux";
import Ajax from "../../../services/ajax";
import { AppCookies } from "../../../services/cookies";
import { ReadyToBuy } from "./ReadyToBuy";

export const BuyNow = () => {
  const readyToBuyList = useSelector((state) => state?.appReducer?.readyToBuyList); //list of objects
  const [address,setAddress] = useState([])
  const [totalAmount,setTotalAmount] = useState(0)
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
const updateTotalAmount = (amount)=>{
  setTotalAmount(totalAmount+amount)
}
useEffect(() => {
  const calculateTotal = () => {
    const total = readyToBuyList.reduce((sum, item) => {
      return sum + item.cost * (item.count || 1); // Ensure count is 1 by default
    }, 0);
    setTotalAmount(total);
  };

  calculateTotal();
}, [readyToBuyList]);
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
        {readyToBuyList.map((item,index) =><ReadyToBuy itemDetails={item} key={index} updateTotalAmount={updateTotalAmount}/> )}
      <div className="mt-3 text-center">
        <h3>Total Amount:  {totalAmount}</h3>
      </div>
      <div className="text-end mt-5">
        <button className="btn btn-primary">Proceed To Pay</button>
      </div>
      </div>
    </div>
  );
};
