"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

export default function AsideComp() {
    const sideRef = useRef(null)
    const [sideDir, setSideDir] = useState('right')

    const handleClickOutside = (ev:any) => {
        if (sideRef.current && !sideRef.current.includes(ev.target)) {
            setSideDir('right');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  return (
      <aside ref={sideRef} className=" h-screen fixed left-0 mt-10 flex justify-center min-h-screen">
         <div className=' z-40 top-0  p-1 w-12 bg-gray-800 min-h-screen'>
            {
                sideDir==='right'?
                <FaChevronRight className=' cursor-pointer hover:bg-cyan-300 p-1 size-8 rounded-full' onClick={()=>setSideDir('left')} color="white"/>
                :
                <FaChevronLeft className=' cursor-pointer hover:bg-cyan-300 p-1 size-8 rounded-full' onClick={()=>setSideDir('right')} color="white"/>
            }
         <div className=' items-center flex flex-col mt-3 gap-8'>
            <p><IoHome color='white' className=' cursor-pointer' size={22}/></p>
            <p><IoHome color='white' className=' cursor-pointer' size={22}/></p>
            <p><IoHome color='white' className=' cursor-pointer' size={22}/></p>
            <p><IoHome color='white' className=' cursor-pointer' size={22}/></p>
            <p><IoHome color='white' className=' cursor-pointer' size={22}/></p>
            <p><IoHome color='white' className=' cursor-pointer' size={22}/></p>
         </div>
         </div>
        <div  onClick={(ev)=>ev.preventDefault()} className={` p-3 left-0 z-0  fixed w-60 h-screen pl-12 bg-sky-300 transition-all duration-1000 ${sideDir === 'right' ? '-translate-x-full' : 'translate-x-12 w-60'}`}>
            <div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
                <div className=' hover:bg-cyan-700 rounded-full p-3 flex gap-3 items-center my-2 cursor-pointer'><IoSettingsOutline/>Setting</div>
            </div>
    </div>
    </aside>
  )
}
