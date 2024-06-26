import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" flex flex-col items-center justify-between p-4">
     <div className=' flex justify-between w-full items-center  bg-sky-400 p-1 rounded-md'>
             <p className=' w-full ml-5 text-2xl'>HOME </p>
       
        </div>
     <div className=' flex mt-12 flex-col  w-full items-center  p-1 rounded-md'>
             <div style={{width:'60'}} className=" border text-center  bg-white border-gray-100 rounded-lg">
             <p style={{ width: '95%' }} className='text-blue-400 my-3 ml-5 text-2xl'>
                {`This project has two routes: a `}
                <Link className={`text-yellow-500  hover:text-gray-700`} href={'/tablepag'}>Table</Link>
                {` with CRUD operations and a `}
                <Link className={`text-red-500  hover:text-gray-700`} href={'/tablepag'}>Calendar</Link>
                {` with add event and add reminder options`}
              </p>

            <p className=' w-full my-3 ml-5 text-lg'>OM PRAKASH MENARIA </p>
            <p className=' w-full my-3 ml-5 text-lg'>React Js/ Next Js Deveoper </p>
            <p className=' w-full my-3 ml-5 text-lg'>Udaipur Rajasthan </p>
              </div>
       
        </div>
      
    </main>
  );
}
