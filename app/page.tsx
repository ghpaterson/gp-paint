'use client'

import { useDraw } from "@/hooks/useDraw";
import {FC} from 'react';

interface pageProps {

}

const page: FC<pageProps> = ({}) => {
  const {canvasRef} = useDraw(drawLine)

  function drawLine({prevPoint, currentPoint, contextCanvas}: Draw) {
    const {x: currX, y: currY} = currentPoint
    const lineColor = "#000"
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
    <canvas ref={canvasRef} width={650} height={650} className='border border-black rounded-md' />
  </div>
  )
}

export default page;

