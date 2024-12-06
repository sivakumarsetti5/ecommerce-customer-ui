import React, { useState,useEffect } from 'react'
import { Pagination } from './Pagination'

export const AppTable = ({ths,data,tds,handleEdit,handleDelete,imgTds,imgThs}) => {
    const perPage = 5;
    const [currPage, setCurrPage] = React.useState(1)
    const [currData, setCurrData] = useState([])

    useEffect(() => {
        const end = currPage * perPage;
        const start = end - perPage;
        setCurrData(data?.slice?.(start, end))
    }, [currPage, data])
  return (
    <div className='table-responsive mx-3'>
        {data && data?.length ? 
        <>
        <table className='table table-bordered'>
            <thead>
                <tr className='text-center align-middle'>
                    {imgThs?.map((val,index)=>{
                        return <th key={`th ${index}`}>{val}</th>
                    })}
                    {ths?.map((val,index)=>{
                        return <th key={`th ${index}`}>{val}</th>
                    })}
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {currData?.map((obj,index)=>{
                    return <tr key={`tr ${index}`} className='text-center align-middle'>
                        {imgTds?.map((val,index)=>{
                            return <td key={`td ${index}`}>
                                     <img src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${obj[val]}?date=${Date.now()}`} width={100} height={100} alt='product image'/>
                                    </td>
                        })}
                        {tds?.map((val,index)=>{
                            return <td key={`td ${index}`} >{obj[val]}</td>
                        })}
                        <td><button className='btn btn-outline-success' onClick={()=>handleEdit(obj)}>Edit</button></td>
                        <td><button className='btn btn-outline-danger' onClick={()=>handleDelete(obj)}>Delete</button></td>
                    </tr>
                })}
            </tbody>
        </table>
        <div>
        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(data?.length/perPage)} />
        </div>
        </>
        :
        <div className='text-center pt-5'>No Data Found</div>}
    </div>
  )
}
