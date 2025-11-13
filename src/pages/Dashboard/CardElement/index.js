
import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import Skeleton from '@mui/material/Skeleton';
import BoxToTable from "../BoxToTable";

const CardElement = (props) => {
    const { data, columns, title, cardColor, leftTitleIcon, rightTitleIcon, loading, tableColumns, parentPath, recordsActions, filterName, changedFilter, boxData } = props;
    const decimalPlaces = 2;

    const cardData = columns.map(item => ({
        ...item,
        value:
            (item.name == 'pending_total_amount' || item.name == 'collected_total_amount'
            )
                ? `$${Math.round(data[item.name] * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)}`
                :
                (item.name == 'avg_days_to_process' || item.name == 'average_texts_sent')
                    ? (data[item.name] || "NA")
                    : (data[item.name] || 0)
    }));
    const theme = useTheme();
    const xl = useMediaQuery(theme.breakpoints.up('xl'));

    return <>
        <Grid name='iconHeader' sx={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Grid>{leftTitleIcon}</Grid>
            <Grid>{rightTitleIcon}</Grid>
        </Grid>
        <Grid name='titleHeader'>
            <Typography variant="bodySpan1" sx={{
                color: "#202020",
                fontFamily: "Poppins-SemiBold",
                fontSize: xl ? '23px' : "20px",
                // lineHeight: "32px"
            }}>
                {title}
            </Typography>
        </Grid>
        <Grid name='cardContent'>
            {
                cardData.map((cardItem, i) => {
                    return (
                        <Grid key={i} container sx={{
                            justifyContent: 'space-between',
                            padding: ''
                        }}>
                            <Grid item xs={9}>
                                <Typography variant="subTitle2" sx={{
                                    color: '#425166',
                                    fontSize: xl ? '16px' : '14px',
                                    fontFamily: 'Poppins-Light'
                                }}>{cardItem.label}</Typography>
                            </Grid>
                            <Grid item xs={3}
                                sx={{
                                    textAlign: 'end'
                                }}>
                                {loading ? <Skeleton /> :
                                    cardItem.table && cardItem.value ?
                                        <BoxToTable
                                            showValue={cardItem.value}
                                            // columns={tableColumns}
                                            // name='collectedInvoices'
                                            parentPath={parentPath}
                                            // recordsActions={recordsActions}
                                            // filterName={filterName}
                                            changedFilter={changedFilter}
                                            columns={boxData?.columns}
                                            recordsActions={boxData?.actions}
                                            filterName={boxData?.name || ""}
                                        />
                                        :
                                        <Typography variant="subTitle2" sx={{
                                            color: '#425166',
                                            fontSize: xl ? '16px' : '14px',
                                            fontFamily: 'Poppins-Regular'
                                        }}>
                                            {cardItem.value}
                                        </Typography>}
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}

export default CardElement;