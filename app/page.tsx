'use client'

import { useDraw } from "@/hooks/useDraw";
import {FC} from 'react';

interface pageProps {

}

const page: FC<pageProps> = ({}) => {

const {canvasRef} = useDraw()

  return (
  <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
    <canvas ref={canvasRef} width={650} height={650} className='border border-black rounded-md' />
  </div>
  )
}

export default page;

