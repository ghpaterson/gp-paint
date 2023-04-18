'use client'

import { useDraw } from "@/hooks/useDraw";
import {FC, useState} from 'react';
import {ChromePicker} from 'react-color'

interface pageProps {

}

const page: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')
  const {canvasRef, onMouseDown, reset} = useDraw(drawLine)

  function drawLine({prevPoint, currentPoint, contextCanvas}: Draw) {
    const {x: currX, y: currY} = currentPoint
    const lineColor = color
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    contextCanvas.beginPath()
    contextCanvas.lineWidth = lineWidth
    contextCanvas.strokeStyle = lineColor
    contextCanvas.moveTo(startPoint.x, startPoint.y)
    contextCanvas.lineTo(currX, currY)
    contextCanvas.stroke()

    contextCanvas.fillStyle = lineColor
    contextCanvas.beginPath()
    contextCanvas.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI) //radius 2, start angle 0, end angle 2* Math.PI
    contextCanvas.fill()
    
  }

  return (
  <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
    <div className="flex flex-col gap-10 mr-10">
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)}/>
      <button type="button" onClick={reset} className="bg-green-800 text-white py-2 rounded-lg">Reset</button>
    </div>
    <canvas 
      onMouseDown={onMouseDown} 
      ref={canvasRef} 
      width={650} 
      height={650} 
      className='border border-black rounded-md' />
  </div>
  )
}

export default page;

