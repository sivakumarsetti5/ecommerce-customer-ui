import { init } from "./init";

export const appReducer = (state=init,action) =>{
    switch (action.type) {
        case "LOGIN":
            state={
                ...state,
                isLoggedIn:action.payload
            }
            break;
        case "LOADER":
            state={
                ...state,
                isShowLoader:action.payload
            }
            break;
        case "CART":
            state={
                ...state,
                cartItemsCount:action.payload
            }
            break;
        case "BUYNOW":
            state={
                ...state,
                readyToBuyList:action.payload
            }
            break;
        case "TOASTER":
            state={
                ...state,
                toaster:action.payload
            }
            break;
        case "MODAL":
            state={
                ...state,
                modal:action.payload
            }
            break;
        default:
            break    
    }
    return state
}