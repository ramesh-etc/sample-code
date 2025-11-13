import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

function NotFound() {
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowPage(true), 3000);
    }, []);


    return showPage ? <Grid container sx={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Grid sx={{
            textAlign: 'center'
        }}>
            <Typography variant='h6'>Not found</Typography>
            <Grid>
                <Link to='/'>
                    <Button sx={{
                        textTransform: 'none',
                        color: '#fff'
                    }}><Typography variant="subtitle2">Go to Home page</Typography></Button>
                </Link>
            </Grid>
        </Grid>
    </Grid> : <Spinner showHeight />

}

export default NotFound;

