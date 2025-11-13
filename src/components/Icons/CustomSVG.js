import React from "react";
import Subtract from "./CustomSvgIcons/Subtract";
import Logout from "./CustomSvgIcons/Logout";
import Calendar from "./CustomSvgIcons/Calendar";
import Hospitals from "./CustomSvgIcons/Hospitals";
import SMS from "./CustomSvgIcons/Sms";
import Docs from "./CustomSvgIcons/Docs";

const CustomSVG = (props) => {
    const { iconname, color } = props;
    const icons = {
        Subtract: Subtract,
        Logout: Logout,
        Calendar: Calendar,
        Hospitals: Hospitals,
        SMS: SMS,
        Docs: Docs
    }

    const Component = icons[iconname];

    if (!Component) {
        console.error(`Invalid icon name: ${iconname}`);
        return null;
    }
    return <Component color={color} {...props} />
}

export default CustomSVG;