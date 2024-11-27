const regEx = {
    "REQUIRED":{
        pattern:/.+/,
        message:'Required field !!!'
    },
    "EMAIL":{
        pattern:/^[a-zA-Z]{1}[a-zA-Z0-9._/]*@[a-zA-z]{3,10}\.[a-zA-Z]{2,3}$/,
        message:"Should be in the email format"
    },
    "MIN5CHAR":{
        pattern:/[a-zA-Z0-9@_.]{5,}/,
        message:"Minimum 5 characters required"
    },
    "PHONENUMBER":{
        pattern:/^[0-9]{10}$/,
        message:"Exactly 10 digits required"
    },
    "RETYPEPWD":{
        message:"Password not match"
    },
    "CAPTCHA":{
        message:"Invalid Captcha"
    },
    "IMG_ONLY":{
        message:"Please select image"
    },
    "IMG_MAXSIZE_5KB":{
        message:"image with size < 15kb height < 500px width < 500px"
    }
}
function getImageWidthAndHeight(file){
    return new Promise((resolve, reject) => {

        const img = new Image();
        // Load the image file as a data URL
        img.src = URL.createObjectURL(file);
        // When the image loads, get its width and height
        img.onload = function () {
            const width = img.width;
            const height = img.height;
            resolve([width, height])
            // Release the object URL after use
            URL.revokeObjectURL(img.src);
        }
    })
}

function getFileInfo(file){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
            resolve(reader.result)
        }
        reader.onerror = () =>{
        }
    })
}
async function validate(inputObj,clonedInputControls,files){
    inputObj.errorMsg = ""
    outerloop: for(let val of inputObj?.criteria){
        const{pattern,message} = regEx[val]
        switch(val){
            case "RETYPEPWD":
                const newPwdObj = clonedInputControls.find((obj)=>obj.name === "newPwd")
                const confirmPwdObj = clonedInputControls.find((obj)=>obj.name === "ConfirmPwd")
                newPwdObj.errorMsg = ""
                confirmPwdObj.errorMsg = ""
                if(newPwdObj?.value && confirmPwdObj?.value && newPwdObj?.value !== confirmPwdObj?.value){
                    inputObj.errorMsg = message
                    break outerloop;
                }
                break
            case "IMG_ONLY":
                if(!files) return
                const{type} = files[0]
                if(!type?.startsWith('image/')){
                    inputObj.errorMsg = message
                    break outerloop
                }else{
                    const fileData = await getFileInfo(files[0])
                    //console.log(fileData)
                    inputObj.src=fileData
                }
                break
            case "IMG_MAXSIZE_5KB":
                if(!files) return
                const {size} = files?.[0]
                const [width,height] = await getImageWidthAndHeight(files[0]) 
                console.log("image info",size,width,height)
                if(!(size<=150000 && width<=1200 && height<=1200)){
                    inputObj.errorMsg = message
                    break outerloop
                }
                break
            default:
                if (pattern && !pattern.test(inputObj?.type==="file" ?(inputObj?.selFile || inputObj?.value) :inputObj?.value)) {
                    // if(!pattern?.test(inputObj?.value)){
                        inputObj.errorMsg = message
                        break outerloop
                    }
        }
        }
}
export async function handleFieldLevelValidation(event,inputControls,setinputControls){
    debugger
    const{name,value,type,files} = event?.target
    //const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    const clonedInputControls = Object.assign([],inputControls)
    let inputObj  = clonedInputControls.find((obj)=>obj.name === name)
    if(type === 'file'){
        inputObj.selFile = files
    }else{
        inputObj.value = value
    }  
    await validate(inputObj,clonedInputControls,files)
    // console.log(inputControls)
    setinputControls(clonedInputControls)
}


export async function handleFormLevelValidation(inputControls,setInputControls,isEdit){
    debugger
    const dataObj  = {}
    const clonedInputControls = Object.assign([],inputControls)
    //console.log(123123,clonedInputControls)
    await Promise.allSettled(
    clonedInputControls.map(async(obj ) =>{                            //check each input field have data or not
        dataObj[obj.name] =obj.type==='file'?obj.selFile: obj.value
        if(isEdit){
            if(obj.type==="file"){
                dataObj.filePath = obj.value
            }
        }
        await validate(obj,clonedInputControls,obj.selFile)                           //if data is there then update hasError is false otherwise true
    })
)
    const isInValid = clonedInputControls.some((obj)=> obj.errorMsg) //If any of the input object with hasError is true then it is invalid
    setInputControls(clonedInputControls)
    return[isInValid,dataObj]
}

export function setFormData(inputControls,setInputControls,rowData,isEdit,fieldName){
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    //console.log(888,rowData)
    clonedInputControls.forEach((obj ) =>{    
        if(isEdit && obj.name === fieldName){
            obj.isDisabled = true
        }     
        if(obj.type==='file'){
            obj.value= rowData["filePath"]
        }else{
            obj.value = rowData[obj.name]
        }         
    })
    //console.log(999,clonedInputControls)
    setInputControls(clonedInputControls)
}

export function clearFormData(inputControls,setInputControls){
    const clonedInputControls = Object.assign([],inputControls)
    clonedInputControls.forEach((obj ) =>{       
        obj.value = ""
        if(obj.type === 'file'){
            obj.src=""
            obj.selFile="" 
        }     
    })
    setInputControls(clonedInputControls)
}
