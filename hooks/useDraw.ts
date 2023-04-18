import { useEffect, useRef } from "react"

export const useDraw = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        console.log({x: e.clientX, y: e.clientY})
      }
      //add eventlister
      canvasRef.current?.addEventListener('mousemove', handler)

      //remove event listener
      return () => canvasRef.current?.addEventListener('mousemove', handler)
    }, [])

    return {canvasRef}
}