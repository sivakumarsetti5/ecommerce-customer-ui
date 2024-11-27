import { init } from "./init";

export const appReducer = (state=init,action) =>{
    switch (action.type) {
        case "LOGIN":
            state={
                ...state,
                isLoggedIn:action.payload
            }
            break;
        default:
            return state
    }
}