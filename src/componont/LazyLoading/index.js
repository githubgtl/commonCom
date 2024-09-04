import React,{ useEffect } from "react";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const LazyLoading = function ({elements, callback}){
    console.log(elements)
    if(! callback instanceof Function){
        throw "only callback function can apply"
    }
    useEffect(()=>{
        const ob = new IntersectionObserver((entries)=>{
            for(const entry  of entries){
                if(entry.isIntersecting){
                    callback(entry.target)
                    ob.unobserve(entry.target)
                }
            }
        }, {
            threshold: 0
        })
        if(Array.isArray(elements)){ // 还可以通过 JSON.parse() Object.prototype.toString.call() 但是这个是c++写的，直接判断的数据结构
            
            for(let i=0;i<elements.length;i++){
                ob.observe(elements[i])
            }
        }
    }, [elements, callback])
    return (<></>)
}

export default LazyLoading