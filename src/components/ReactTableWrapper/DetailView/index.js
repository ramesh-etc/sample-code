import { Divider, IconButton, Grid, Tooltip, useMediaQuery } from "@mui/material";
import React from "react";
import Icons from "../../Icons";
import CommonDialog from "../../CommonDialog";
import useStyles from './styles';
import Close from '../../../images/icons/Close.svg';
// import { dateFormat } from "../../../utils/tools";
// import moment from "moment";
// import { AsYouType } from "libphonenumber-js";
// import Info from '../../../images/icons/info.svg';
import TabComponent from "../../TabComponent";
import { useTheme } from "@mui/system";

const DetailView = (props) => {
    const { row, col_name, columns = {} } = props;
    // const [showPopup, setShowPopup] = React.useState(null);
    const [popup, setPopup] = React.useState(false);
    const [containerHeight, setContainerHeight] = React.useState(window.innerHeight);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        setSelectedTab(0);
    }, []);

    React.useEffect(() => {
        const handler = () => {
            setContainerHeight(window.innerHeight);
            // setWidth(getOffset('auto-play-container'));
        }
        // Call the handler once to set the initial width
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    const handleTabs = (e, tabIndex) => {
        setSelectedTab(tabIndex);
    }

    const { classes } = useStyles();

    const setPopupDialogue = (row) => {
        setPopup(true)
    }

    const closePopup = () => {
        setPopup(false)
    }

    const hasNonEmptyArray = (record, column) => {
        return Object.keys(column).some((key) => {
            return record[key] && record[key].length > 0;
        });
    };

    const countNonEmptyArrays = (record, column) => {
        return Object.keys(column).filter(key => {
            return record[key] && record[key].length > 0;
        }).length;
    };

    const selectedKey = Object.keys(columns)[selectedTab];
    const selectedValue = columns[selectedKey];

    const showIcon = hasNonEmptyArray(row, columns);

    let tableTextContent = <></>;
    let popUpHeader = <></>;
    let popupcontent = <></>;

    const columValue = (column, record) => {
        return column.html && column.html(record, classes) || record[column?.value];
    }

    if (col_name == "message_status") {
        tableTextContent = <>
            {row?.message_status == 'sent' ?
                <span style={{
                    color: '#2DC146', fontFamily: 'Poppins-SemiBold'
                }}>Sent</span>
                : row?.message_status && row?.message_status == 'not_sent' ? <span style={{
                    color: '#F03249', fontFamily: 'Poppins-SemiBold'
                }}>Not Sent</span> : <span style={{
                    color: '#F03249', fontFamily: 'Poppins-SemiBold'
                }}>Failed</span>}
            {showIcon ?
                <IconButton
                    onClick={(e) => {
                        // e.stopProp
                        setPopupDialogue(row)
                    }}
                    size="small"
                >
                    <Icons type='history'
                    />
                </IconButton> : null}
        </>;

        popUpHeader = <div>
            <h3 className={classes.title}>Message History</h3>
            <span className={classes.smallText}>
                <span className={classes.headerlabel}> Name: </span> {row?.patient_name}; </span>
            <span className={classes.smallText}>
                <span className={classes.headerlabel}>Account #: </span>{row?.invoice_number} </span>
        </div>;

        popupcontent = <div style={{
            // maxHeight: '445px',
            maxHeight: (Object.keys(columns || {}).length > 1 && countNonEmptyArrays(row, columns) > 1) ? `${(containerHeight - 155)}px` : `${(containerHeight - 105)}px`,
            overflow: 'auto',
            // marginBottom: "17px"
            margin: sm ? "0px 25px 17px 25px" : "0px 0px 17px 0px",
        }}>
            {(row?.[selectedKey] || []).map((record, i) => {

                return <div key={i}
                    className={classes.rows}
                    style={((row?.[selectedKey]?.length - 1) == i) ? {
                        margin: sm ? "0px" : "0px 25px",
                        paddingTop: "17px"
                    } : {
                        borderStyle: "solid",
                        borderWidth: "0px 0px 1px 0px",
                        // borderColor: '#2D3F62',
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        margin: sm ? "0px" : "0px 27px",
                        paddingTop: "17px",
                        paddingBottom: "17px"
                    }}>
                    {
                        (Array.isArray(selectedValue) && selectedValue || []).map((ele, j) => {
                            return <div
                                key={j}
                                className={classes.dataRow}
                            >
                                <span className={`${classes.data} ${classes.label}`}>{ele.label}</span>
                                <span className={classes.colon}> : </span>
                                <span className={`${classes.data} ${classes.value}`}>{columValue(ele, record)}</span>
                            </div>
                        })
                    }
                </div>
            }
            )}
        </div>

    }


    return <div className={showIcon ? classes.historiesDetailContainer : classes.detailContainer}>
        {tableTextContent}
        {popup ?
            <CommonDialog open={popup} paperClass={classes.paper}>
                {/* <div> */}
                <div className={classes.popupHeader}>
                    {popUpHeader}
                    <div>
                        <img src={Close} alt='Close.svg' className={classes.img} onClick={() => closePopup()} />
                    </div>
                </div>
                <Divider />
                {/* {Object.keys(columns || {}).length > 1 && countNonEmptyArrays(row, columns) > 1 ? */}
                <TabComponent
                    categories={[{ title: 'SMS' }, { title: 'Email' }]}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    handleTabs={handleTabs}
                    chileRouteStyle={{ marginTop: '0px !important', overflow: 'auto' }}
                >
                    {row?.[selectedKey].length == 0 ? <div style={{ color: '#6D7689', textAlign: 'center', padding: '15px', fontSize: '14px' }}><span style={{ color: '#6D7689' }}>{`No ${selectedTab == 0 ? "SMS" : "Email"} History Found`}</span></div> : popupcontent}
                </TabComponent>
                {/* // : popupcontent} */}
            </CommonDialog>
            : null}
    </div>
}

export default DetailView;