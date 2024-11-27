export function updateStoreData(dispatch,type,payload){
    dispatch({type,payload})
}

export function getDate(days){
    const date = new Date()
    date.setDate(date.getDate()+days)
    return date
}

export function getPrevDate(){
    const date = new Date()
    date.setDate(date.getDate()-1)
    return date
}

export function getCookiesObj(){
    const cookieArr = document.cookie?.split(';')
    return cookieArr.reduce((init,val)=>{
        const[key,value]=val?.split('=') || []              // [] is excuited if val.split('=') is undefined 
        init[key?.trim?.()] = value?.trim?.()
        return init
    },{})
}
