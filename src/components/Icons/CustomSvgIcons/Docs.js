import React from "react";
import { SvgIcon } from "@mui/material";
import { spanColor } from "../../../utils/tools";

const Docs = (props) => {
    const { color, width, height, style } = props;

    return <SvgIcon sx={style || {}} >
        <svg width={width || "28"} height={height || "28"} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 18.1 22.8" style={{ enableBackground: "new 0 0 18.1 22.8" }} xmlSpace="preserve">

            <path fillRule="evenodd" clipRule="evenodd" fill={color || spanColor} d="M11.7,0.3c0-0.1,0-0.2-0.1-0.2C11.5,0,11.5,0,11.4,0H3.2C2.4,0,1.5,0.3,0.9,0.9S0,2.4,0,3.2v16.3
	c0,0.9,0.3,1.7,0.9,2.3c0.6,0.6,1.4,0.9,2.3,0.9h11.7c0.9,0,1.7-0.3,2.3-0.9c0.6-0.6,0.9-1.4,0.9-2.3V8c0-0.1,0-0.2-0.1-0.2
	c-0.1-0.1-0.1-0.1-0.2-0.1h-5.2c-0.2,0-0.5-0.1-0.6-0.3c-0.2-0.2-0.3-0.4-0.3-0.6V0.3z M12.5,11.7c0.2,0,0.5,0.1,0.6,0.3
	c0.2,0.2,0.3,0.4,0.3,0.6c0,0.2-0.1,0.5-0.3,0.6c-0.2,0.2-0.4,0.3-0.6,0.3h-7c-0.2,0-0.5-0.1-0.6-0.3c-0.2-0.2-0.3-0.4-0.3-0.6
	c0-0.2,0.1-0.5,0.3-0.6c0.2-0.2,0.4-0.3,0.6-0.3H12.5z M12.5,16.3c0.2,0,0.5,0.1,0.6,0.3c0.2,0.2,0.3,0.4,0.3,0.6
	c0,0.2-0.1,0.5-0.3,0.6c-0.2,0.2-0.4,0.3-0.6,0.3h-7c-0.2,0-0.5-0.1-0.6-0.3c-0.2-0.2-0.3-0.4-0.3-0.6c0-0.2,0.1-0.5,0.3-0.6
	c0.2-0.2,0.4-0.3,0.6-0.3H12.5z"/>
            <path fill={color || spanColor} d="M13.4,0.7c0-0.2,0.2-0.4,0.4-0.2c0.1,0.1,0.3,0.2,0.4,0.4l3.5,4.9c0.1,0.1,0,0.3-0.1,0.3h-3.8
	c-0.1,0-0.2,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2V0.7z"/>
        </svg>
    </SvgIcon>
}

export default Docs;
