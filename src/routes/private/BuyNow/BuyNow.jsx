import React ,{useEffect,useState}from "react";
import styles from "./BuyNow.module.css";
import Ajax from "../../../services/ajax";
import { AppCookies } from "../../../services/cookies";
import { ReadyToBuy } from "./ReadyToBuy";
import PaymentButton from "../../../components/shared/PaymentButton";

export const BuyNow = () => {
  const [address,setAddress] = useState([])
  const [totalAmount,setTotalAmount] = useState(0)
  const [products,setProducts] = useState([])
  const [selAddress,setSelAddress] = useState({})
  const [chekoutProductIds,setCheckoutProductIds] = useState([])


  const fnGetAddress = async () => {
    try {
        const res = await Ajax.get(`address/get?uid=${AppCookies.getCookie('uid')}`)
        console.log('dataaaaa',res?.data)
        setAddress(res?.data)
        const{pincode,fullName,phone,address} = res?.data[0]
        setSelAddress({ ind: 0, address: `${fullName}, ${phone}, ${address},${pincode}` })
    } catch (ex) {
        setAddress([])
        console.error("Address", ex)
    }
  }
  const updateTotalAmount = (amount)=>{
    setTotalAmount(totalAmount=>totalAmount+amount)
  }
  useEffect(() => {
    const calculateTotal = () => {
      const total = products?.reduce((sum, item) => {
        return sum + item.cost * (item.count || 1);          // by default count is 1
      }, 0);
      setTotalAmount(total);
    };
    calculateTotal();
  }, [products]);

  useEffect(()=>{
    fnGetAddress()
    const _products = JSON.parse(AppCookies.getCookie('readyToBuyList')) ||[]
    setProducts(_products)
    setCheckoutProductIds(_products.map((obj)=>obj._id))
  },[])

  const handleChangeAddress = (address,ind) =>{
    setSelAddress({ind,address})
  }

  return (
    <div className={styles.buyNowContainer}>
      <div className={styles.addressContainer}>
        <div className="text-center bg-primary p-2 text-white">Delivery Address</div>
        {address.map(({fullName,phone,address,pincode},ind)=>{
          return(
            <div className={` my-2 p-3 ${styles.address}`}>
              <input type='radio' checked={ind===selAddress.ind} onClick={()=>handleChangeAddress(`${fullName}, ${phone}, ${address},${pincode}`,ind)} name="add"/>
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
        {products?.map((item,index) =><ReadyToBuy itemDetails={item} key={index} updateTotalAmount={updateTotalAmount}/> )}
      <div className="mt-3 text-center">
        <h3>Total Amount:  {totalAmount}</h3>
      </div>
      <div className="text-end mt-5">
        {/* <button className="btn btn-primary">Proceed To Pay</button> */}
        <PaymentButton productDetails={chekoutProductIds} address={selAddress?.address} amount={totalAmount} email={AppCookies.getCookie("uid")} phone={AppCookies.getCookie("phone")}/>
      </div>
      </div>
    </div>
  );
};
