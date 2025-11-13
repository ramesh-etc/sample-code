import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import CustomSVG from './CustomSVG';
import Key from '../../images/icons/Key.svg';
import HistoryIcon from '@mui/icons-material/History';

/**
 * 
 * @param {object} props 
 * @returns 
 */
export default function Icons(props) {
    // const classes = Styles();

    switch (props.type) {
        case 'ChevronLeftIcon':
            return <ChevronLeftIcon {...props} sx={{
                color: props.color
            }} />
        case 'ChevronRightIcon':
            return <ChevronRightIcon sx={{
                color: props.color
            }} />
        case 'Substract':
            return <CustomSVG iconname={"Subtract"} color={props.color} {...props} />
        case 'GroupIcon':
            return <GroupIcon {...props} sx={{
                color: props.color
            }} />
        case 'Logout':
            return <CustomSVG iconname={"Logout"} color={props.color} {...props} />
        case 'profile':
            return <AccountCircleIcon sx={{ color: props.color, width: props.width }} fontSize={props?.fontSize || ''} {...props} />
        case 'settings':
            return <SettingsIcon sx={{ color: props.color }} fontSize={props?.fontSize || ''} {...props} />
        case 'history':
            return <HistoryIcon sx={{ color: props.color }} fontSize={props?.fontSize || ''} {...props} />
        case 'edit':
            return <EditIcon sx={{ color: props.color }} fontSize={props?.fontSize || ''} {...props} />
        case 'Calendar':
            return <CustomSVG iconname={"Calendar"} color={props.color} {...props} />
        case 'Hospitals':
            return <CustomSVG iconname={"Hospitals"} color={props.color} {...props} />
        case 'SMS':
            return <CustomSVG iconname={"SMS"} color={props.color} {...props} />
        case 'Docs':
            return <CustomSVG iconname={"Docs"} color={props.color} {...props} />
        case 'Key':
            return <img src={Key} alt="Key svg" {...props} />
        default:
            return <DashboardIcon {...props} sx={{
                color: props.color
            }} />
    }
}