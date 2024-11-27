import React, { useEffect, useRef, useState } from 'react'

export const Animations = ({children,animClass}) => {
    const [isInTheViewport,setIsInTheViewport] = useState(false)
    const eleRef = useRef()
    useEffect(()=>{
        const observObj = new IntersectionObserver(function(entries){
            const {isIntersecting} = entries[0]
            setIsInTheViewport(isIntersecting)
        },{threshold:0.5})
        observObj.observe(eleRef.current)
    },[])
  return (
    <div className={isInTheViewport && animClass} ref={eleRef}>
        {children}
    </div>
  )
}
