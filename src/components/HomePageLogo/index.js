
import React from "react";
import { Grid, Typography } from "@mui/material";
import EzpayTekLogo from '../../images/EzTekPAY.svg';
import { spanColor } from "../../utils/tools";

const HomePageLogo = () => {
    return <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <img src={EzpayTekLogo} style={{ width: '40%' }} />
        <Typography
            variant='subTitle2'
            component={"div"}
            sx={{
                fontSize: '14px',
                width: "100%",
                textAlign: "center",
                color: spanColor
            }}>A platform for digital recovery of small bills</Typography>
    </Grid>
}

export default HomePageLogo;