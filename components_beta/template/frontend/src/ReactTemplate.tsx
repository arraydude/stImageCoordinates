import React, {ReactElement, RefObject, useEffect} from "react"
import {
    withStreamlitConnection,
    Streamlit,
    ComponentProps,
} from "./streamlit"

// We import bootstrap.css and streamlit.css to get some simple default
// styling for our text and button. You can remove or replace these!
import "bootstrap/dist/css/bootstrap.min.css"
import "./streamlit.css"

/**
 * This is a React-based component template. It's an alternative to the
 * event-based component pattern. Rather than handling RENDER_EVENT events,
 * you write your rendering logic in the render() function, which is
 * called automatically when appropriate.
 */
const ImageCoordinates = ({args}: ComponentProps): ReactElement => {
    const {image, width, height} = args
    const canvasRef: RefObject<HTMLCanvasElement> = React.createRef()

    const drawimage = () => {
        const canvas = canvasRef.current

        if (canvas) {
            const ctx = canvas.getContext("2d")

            const imageCanvas = new Image()

            imageCanvas.src = `data:image/png;base64, ${image}`

            imageCanvas.onload = function () {
                // @ts-ignore
                ctx.drawImage(imageCanvas, 0, 0);
            }
        }
    }

    useEffect(() => {
        drawimage()
        Streamlit.setFrameHeight()
    }, [image])

    const getCoords = (e: any): void => {
        // @ts-ignore
        const rect = canvasRef.current.getBoundingClientRect();

        const coords = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }

        Streamlit.setComponentValue(coords)
    }

    console.log("== args", args)

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} onClick={getCoords} />
        </div>
    )
}

export default withStreamlitConnection(ImageCoordinates)
