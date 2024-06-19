"use client"
import React, { useEffect } from 'react'
import { FaUserSecret } from "react-icons/fa";
import Link from "next/link";
import { Input } from "antd";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
export default function NavBar() {
    const pathname = usePathname();
  return (
    <nav className=" z-50 fixed top-0 w-full bg-slate-400 h-10 justify-between items-center flex">
    <Link href={'/'}><FaUserSecret size={36} className=" ml-4 left-6 text-3xl m-0"/></Link>
        <div className=" flex w-80 justify-between">
          <div>
          <Link className={` ${pathname=='/tablepag'&& 'border border-white-300 px-3 rounded-md '}  hover:text-blue-500 hover:bg-slate-200 hover:rounded-md hover:px-1 text-white text-xl`} href={'/tablepag'}>Table</Link>
          </div>
          <div>
          <Link className={` ${pathname=='/calander'&& 'border border-white-300 px-3 rounded-md '}  hover:text-blue-500 hover:bg-slate-200 hover:rounded-md hover:px-1 text-white text-xl`} href={'/calander'}>Calendar</Link>
          </div>
        </div>
        <div className=" mr-4">
      <Input disabled type="search" placeholder="Search" suffix={<BiSearch/>}/>
      </div>
    </nav>
  )
}
