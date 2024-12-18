import { AppCookies } from "../services/cookies";

export const init = {
    isLoggedIn: AppCookies.isUserLoggedIn(),
    readyToBuyList:[],
    cartItemsCount:0,
    isShowLoader:false,
    toaster:{
        isShowToaster:false,
        toasterMsg:'',
        color:''
    },
    modal:{
        message:'',
        isShowModal:false,
        modalAction:()=>{}
    }
    
}