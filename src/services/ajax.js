import axios from "axios";

class Ajax {
    static get(url){
        return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`)
    }
    static post(url,data ){
        return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`,data)
    }
    static put(url,data ){
        return axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`,data)
    }
    static delete(url){
        return axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`)
    }
    static patch(){

    }
    static head(){

    }
}
export default Ajax