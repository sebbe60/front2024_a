import Image from 'next/image';
import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";

const ProjectCard = ({status, emoj, bg_emoj, title,color, description, casting, Due_date}) => {

    return(
       <div className=' w-[270px] p-2 bg-white rounded-lg'>
         <div className='flex justify-between p-2'>

            <div className={`p-3 rounded-lg bg-gradient-to-b from-pink-400 from-5% to-pink-500 via-90% text-yellow-300 text-3xl bg-slate-400`} >
               {emoj} {/* Emoje */}
            </div>
            <div className='w-full mx-2'>
            <div className='flex justify-between mb-3'>
                <div>{title}</div>{/* Title*/}
                <div>{status==="completed"? <FaRegCheckCircle className='text-green-300' /> : <BsThreeDots className='text-slate-400'/>}</div>{/* Contributers*/}
            </div>
            <div className='flex  space-x-[-8px]'>
               <div className='rounded-full border-2 border-white w-[30px] h-[30px]'>
                  <Image src='/home/loginImage.jpg' width={50} height={100} className='w-full h-full object-fill rounded-full'/>
               </div>
               <div className='rounded-full border-2   border-white w-[30px] h-[30px]'>
                  <Image src='/home/loginImage.jpg' width={50} height={100} className='w-full h-full object-fill rounded-full'/>
               </div>
               <div className='rounded-full border-2 border-white w-[30px] h-[30px]'>
                  <Image src='/home/loginImage.jpg' width={50} height={100} className='w-full h-full object-fill rounded-full'/>
               </div>
               <div className='rounded-full border-2 border-white w-[30px] h-[30px]'>
                  <Image src='/home/loginImage.jpg' width={50} height={100} className='w-full h-full object-fill rounded-full'/>
               </div>
            </div>
            </div>

         </div>

         <div className='text-slate-400 p-2'>
            {description}{/* Description */}
         </div>
        
        <div className='flex justify-between p-2'>
            <div>
               <div>{casting}</div>
               <div className='text-slate-400'>casting</div>
                {/* Casting */}
            </div>

            <div>
               <div>{Due_date}</div>
                <div className='text-slate-400'>Due date</div>{/* date */}
            </div>
         </div>

       </div>
    )
}


export default ProjectCard;