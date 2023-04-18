import { useEffect, useRef, useState } from "react"

export const useDraw = (onDraw: ({contextCanvas, currentPoint, prevPoint}: Draw) => void) => {
    
  const [mouseDown, setMouseDown] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<null | Point>(null)

  const onMouseDown = () => setMouseDown(true)

  const reset = () => {
    const canvas = canvasRef.current
    if (!canvas) return 

    const contextCanvas = canvas.getContext('2d')
    if (!contextCanvas) return

    contextCanvas.clearRect(0, 0, canvas.width, canvas.height)
  }

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (!mouseDown) return
        const currentPoint = computePointInCanvas(e)

        const contextCanvas = canvasRef.current?.getContext('2d')
        if (!contextCanvas || !currentPoint) return

        onDraw({contextCanvas, currentPoint, prevPoint: prevPoint.current})
        prevPoint.current = currentPoint
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

      const mouseUpHandler = () => {
        setMouseDown(false)
        prevPoint.current = null
      }

      //add eventlister
      canvasRef.current?.addEventListener('mousemove', handler)
      window.addEventListener('mouseup', mouseUpHandler)

      //remove event listener
      return () => {
        canvasRef.current?.removeEventListener('mousemove', handler)
        window.removeEventListener('mouseup', mouseUpHandler)
         }
    }, [onDraw])

    return {canvasRef, onMouseDown, reset}
}