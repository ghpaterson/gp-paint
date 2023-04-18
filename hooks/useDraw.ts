import { useEffect, useRef, useState } from "react"

export const useDraw = (onDraw: ({contextCanvas, currentPoint, prevPoint}: Draw) => void) => {
    
  const [mouseDown, setMouseDown] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<null | Point>(null)

  const onMouseDown = () => setMouseDown(true)

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        console.log({x: e.clientX, y: e.clientY})
        const currentPoint = computePointInCanvas(e)

        const contextCanvas = canvasRef.current?.getContext('2d')
        if (!contextCanvas || !currentPoint) return
      }

      //mouse position relevant to canvas not screen
      const computePointInCanvas = (e: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return 

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        return {x, y}
      }
      //add eventlister
      canvasRef.current?.addEventListener('mousemove', handler)

      //remove event listener
      return () => canvasRef.current?.addEventListener('mousemove', handler)
    }, [])

    return {canvasRef, onMouseDown}
}