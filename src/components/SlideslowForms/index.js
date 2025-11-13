
import React from "react";
import useStyles from "./styles";
import { useTheme } from "@mui/system";
import { Grid, useMediaQuery } from "@mui/material";
import GroupLogo from '../../images/GroupLogo.svg';
import FrameLine from '../../images/FrameLine.svg';
import FrameRound from '../../images/FrameRound.svg';
import Diamond from '../../images/DiamondHome.svg';
import Slideshow from "./SlideShow";
import { appColor } from "../../utils/tools";

function getOffset(id) {
    if (!id) {
        return false;
    }
    const main = document.getElementById(id);
    return main && main.offsetWidth || 0;
}

const SlideslowForms = (props) => {

    const { containerHeight, children } = props;
    const [containerWidth, setWidth] = React.useState(getOffset('auto-play-container'));
    const { classes } = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        const handler = () => {
            setWidth(getOffset('auto-play-container'));
        }
        // Call the handler once to set the initial width
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return <Grid item xs={12} className={classes.FormPage}>
        <Grid container sx={{
            backgroundColor: sm ? '#F8F8FB' : appColor,
            height: '100%'
        }}>
            {!sm ? <Grid item md={6}
                className={classes.leftSideItem}
                sx={{
                    padding: "2%",
                    height: containerHeight,
                    overflow: 'hidden',
                    backgroundImage: `
                url(${FrameLine}),
                url(${FrameRound}),
                url(${Diamond})`,
                    backgroundPosition: '75% 95%,5% 92%,5% 5%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '60px,60px,50px',
                }}
            >
                <Grid container
                    sx={{
                        height: '100%',
                        width: '100%',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={GroupLogo}
                        className={classes.img}
                    />                        <Grid
                        sx={{
                            width: '100%',
                        }}
                        id='auto-play-container'
                    >
                        <Slideshow parentwidth={containerWidth || getOffset('auto-play-container')} timeDelay={5000} />
                    </Grid>

                </Grid>
            </Grid> : null}
            <Grid item md={6} xs={12} className={classes.component} id='right-container'
                sx={{
                    backgroundColor: '#F8F8FB',
                    height: sm ? '100%' : containerHeight,
                    overflow: 'auto',
                    position: 'relative'
                }}>
                {children}
            </Grid>
        </Grid>

    </Grid>
}

export default SlideslowForms;