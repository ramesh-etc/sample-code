import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Form from "./Form";
import useStyles from "./styles";
import { useAppSelector } from "../../../redux/hooks";
import { useTheme } from "@mui/system";
import moment from "moment";
import Icons from "../../../components/Icons";
import Close from '../../../images/icons/Close.svg';
import { getFormValues } from "redux-form";
import { dateFormat } from "../../../utils/tools";

const DateFilter = (props) => {
    const { fields, submiterror, btnLabel, title, form, sectionSplit, paperClassName, handleFilter, setFilterObj, filterObj, btnColor, onSubmitClose, loading, btnClass, btnContent } = props;
    // const [showModal, setShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [btnLoad, setBtnLoad] = useState(false);
    const [filterDate, setFilterDate] = useState('Date Range');
    // const [filterObj, setFilterObj] = useState({ fromDate: new Date(), toDate: new Date() });

    // const dispatch = useAppDispatch();
    const { classes } = useStyles();
    const selector = useAppSelector(state => getFormValues(form)(state));
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const xldown = useMediaQuery(theme.breakpoints.down('xl'));

    useEffect(() => {
        setFilterDate("Date Range");
    }, [])

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = (data, dispatch, props) => {
        const dataFromDate = moment(data?.fromDate || new Date()).format('YYYY-MM-DD');
        const dataToDate = moment(data?.toDate || new Date()).format('YYYY-MM-DD');
        // const checkFromDate = moment(data?.fromDate || new Date()).isSame(moment(), 'day');
        // const checkToDate = moment(data?.toDate || new Date()).isSame(moment(), 'day');
        const payload = Object.assign({}, { fromDate: dataFromDate, toDate: dataToDate });
        // if (filterDate == "Date Range") {
        //     // setFilterDate("Date Range");
        //     handleFilter();
        //     // dispatch(setFilterObj({ record: { fromDate: new Date(), toDate: new Date() } }));
        // } else {
        // setFilterDate(<span style={{ whiteSpace: 'pre-wrap' }}>
        //     {`From ${moment(data?.fromDate || new Date()).format(dateFormat)} \n To ${moment(data?.toDate || new Date()).format(dateFormat)}`}</span>);

        // setFilterDate(<span>{`From ${moment(data?.fromDate || new Date()).format(dateFormat)}`} <br />{`To ${moment(data?.toDate || new Date()).format(dateFormat)}`}</span>);

        setFilterDate(`${moment(data?.fromDate || new Date()).format(dateFormat)} - ${moment(data?.toDate || new Date()).format(dateFormat)}`);
        // dispatch(setFilterObj({
        //     record: {
        //         fromDate: data?.fromDate || new Date(),
        //         toDate: data?.toDate || new Date(),
        //     }
        // }));
        handleFilter({ record: payload });
        // }

        if (onSubmitClose) {
            handleClose();
        }
    }

    return <>
        <Button
            className={btnClass}
            onClick={handleClick}
        >
            {btnContent ? btnContent : <>
                <Typography
                    variant="bodySpan1"
                    sx={{
                        marginRight: '2px',
                        marginTop: xldown ? '1px' : '2px'
                    }}
                >{filterDate}&nbsp;</Typography>
                <Icons type='Calendar' color={btnColor} />
            </>}
        </Button>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            // ripple={false}
            slotProps={
                {
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            maxWidth: '460px',
                            // '& .MuiAvatar-root': {
                            //     width: 32,
                            //     height: 32,
                            //     ml: -0.5,
                            //     mr: 1,
                            // },
                            left: sm ? '8px !important' : 'auto',
                            overflow: sm ? 'auto' : 'visible',
                            borderRadius: '10px',
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: sm ? 0 : 15,
                                left: sm ? 0 : -5,
                                // right: 14,
                                width: sm ? 0 : 10,
                                height: sm ? 0 : 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }
            }
            // PaperProps={{
            //     elevation: 0,
            //     sx: {
            //         overflow: 'visible',
            //         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            //         mt: 1.5,
            //         maxWidth: '460px',
            //         // '& .MuiAvatar-root': {
            //         //     width: 32,
            //         //     height: 32,
            //         //     ml: -0.5,
            //         //     mr: 1,
            //         // },
            //         left: sm ? '8px !important' : 'auto',
            //         overflow: sm ? 'auto' : 'visible',
            //         borderRadius: '10px',
            //         '&::before': {
            //             content: '""',
            //             display: 'block',
            //             position: 'absolute',
            //             top: sm ? 0 : 15,
            //             left: sm ? 0 : -5,
            //             // right: 14,
            //             width: sm ? 0 : 10,
            //             height: sm ? 0 : 10,
            //             bgcolor: 'background.paper',
            //             transform: 'translateY(-50%) rotate(45deg)',
            //             zIndex: 0,
            //         },
            //     },
            // }}
            // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            // anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            transformOrigin={{
                vertical: sm ? 'center' : 15,
                horizontal: sm ? 'center' : -15,
            }}
            anchorOrigin={{
                horizontal: sm ? 'center' : 'right',
                vertical: sm ? 'center' : 'top'
            }}
        >
            <MenuItem
                // ripple={false}
                disableTouchRipple={true}
                disableFocusRipple={true}
                onClick={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                }}
                className={classes.menuItem}
            >
                <Grid
                    className={classes.imgContainer}
                >
                    {/* <CloseIcon onClick={onClose} className={classes.closeIcon} /> */}
                    <img src={Close} alt='Close.svg' className={classes.img} onClick={handleClose} />
                </Grid>
                <Form
                    initialValues={filterObj}
                    fields={(typeof fields === 'function' ? fields({ fromDate: selector?.fromDate || "", toDate: selector?.toDate || "" }).columns : fields).filter(_ => _.editRecord)}
                    submiterror={submiterror}
                    btnLabel={btnLabel}
                    loading={btnLoad || loading}
                    title={title}
                    form={form}
                    sectionSplit={sectionSplit}
                    paperClassName={paperClassName}
                    fieldContainer={classes.fieldContainer}
                    onSubmit={handleSubmit}
                    onSubmitbtn={true}
                />
            </MenuItem>
        </Menu>
    </>
}

export default DateFilter;