import React from 'react';
// import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import SearchField from '../../SearchField';

import { Grid, Typography, useMediaQuery } from '@mui/material';
// import ModalRecordForm from '../ModalRecordForm';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import GlobalFilter from '../../GlobalFilter';
// import ReactTanstackTable from '../../ReactTanstackTable';
// import { useWindowScrollPositions } from '../../../utils/useWindowScrollPosition';
import { useTheme } from "@mui/system";
import CreateBtn from '../CreateBtn';
import UploadBtn from '../UploadBtn';

// function getOffset(id) {
//     if (!id) {
//         return false;
//     }
//     const main = document.getElementById(id);
//     return main && main.offsetHeight || 0;
// }

const Header = (props) => {
    const { name,
        globalFilter,
        setGlobalFilter,
        onChangeData,
        headersData,
        parentPath,
        routeState,
        create,
        createName,
        upload,
        filters,
        metaData = {},
        recordColumns,
        parentRecordFn,
        handleCreate,
        aditionalName,
        additionalActions,
        aditionalColumns,
        rowsLength,
        tableClassName,
        sticky,
        tableCreateBtn,
        noSearch,
        // clearRecord,
        // clearNotifications,
        // createRecord,
        // clearInitial,
        recordActions,
        recordFilterColumns,
        initialFilter } = props;

    const { clearInitial,
        clearRecord,
        clearNotifications,
        createRecord,
        editRecordMetaData
    } = recordActions;

    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    let showName = name;
    if (name == 'invoices') {
        showName = 'Accounts'
    } else if (name == 'users') {
        showName = ""
    } else if (name == 'collectedInvoices') {
        showName = "Account(s) Processed"
    } else if (name == 'report') {
        showName = "Report List"
    } else if (name == 'adminUsers') {
        showName = "EzTekPAY Users"
    } else if (name == 'hospitalUsers') {
        showName = "Provider Users"
    } else if (name == 'hospitals' || name == "uploadHistory") {
        showName = ""
    } else if (name == 'docs' || name == 'adminDocs') {
        showName = ""
    }

    let uploadName = name;
    if (name == 'invoices') {
        uploadName = 'New Accounts'
    } else if (name == 'docs') {
        uploadName = "Files"
    }

    let tableName = aditionalName;
    if (aditionalName == 'patientsInvoice') {
        tableName = 'Skipped Accounts (These accounts are already uploaded in EzTekPAY)'
    }

    return <Grid
        container
        className={tableClassName}
        sx={{
            // flexFlow: "row",
            padding: '15px 20px',
            alignItems: 'center',
            // position: lg || rowsLength < 4 ? 'unset' : 'sticky',
            // top: lg || rowsLength < 4 ? 'auto' : scrollY >= 60 ? containerHeight + 25 : 0,
            // zIndex: lg || rowsLength < 4 ? 0 : 1,
            background: "#fff",
            borderRadius: "20px 20px 0px 0px",
            transition: 'position 0.3s ease, padding 0.3s ease', // Add a smooth transition
            minWidth: 'max-content',

        }}
    >
        <Grid
            item
            // xs={2}
            sx={{
                display: 'flex',
                // maxWidth: '30%',
                // flexBasis: '30%'
            }}
            id='title'
        >
            <Typography variant="h6" className={classes.tableTitle}>
                {`${showName}`}
            </Typography>
            {initialFilter ? <Grid item sx={{
                // display: 'inline-block',
                // maxWidth: '430px',
                marginRight: sm ? '5px' : '15px',
                // maxWidth: '40%',
                // flexBasis: '35%'
            }}>
                <GlobalFilter
                    name={name}
                    onChangeData={onChangeData}
                    headersData={headersData}
                    fields={typeof recordFilterColumns == "function" ? recordFilterColumns().columns : recordFilterColumns}
                />
            </Grid> : null}
        </Grid>
        <Grid
            item
            // xs={10}
            sx={{
                // maxWidth: '70%',
                // flexBasis: '70%'
                display: 'flex',
                flexGrow: 1,
                marginLeft: '15px',
                minWidth: 'max-content'
            }}
            id='searchContainer'
        >
            <Grid
                container
                id={'searchGridContainer'}
                sx={{
                    flexFlow: "row wrap",
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                {!noSearch ? <Grid
                    sx={{
                        // display: 'inline-block',
                        marginRight: sm ? '5px' : '15px',
                        // maxWidth: '40%',
                        // flexBasis: '35%'
                    }}
                    item
                    // xs={7}
                    id={'searchGrid'}
                >
                    <SearchField
                        // globalFilter={globalFilter}
                        // setGlobalFilter={setGlobalFilter}
                        onChangeData={onChangeData}
                        headersData={headersData}
                    />
                </Grid> : null}
                {/* <Grid item xs={4} className={classes.btnContainer}> */}
                {(filters && !initialFilter) ? <Grid item sx={{
                    // display: 'inline-block',
                    // maxWidth: '430px',
                    marginRight: sm ? '5px' : '15px',
                    // maxWidth: '40%',
                    // flexBasis: '35%'
                }}>
                    <GlobalFilter
                        name={name}
                        onChangeData={onChangeData}
                        headersData={headersData}
                        fields={typeof recordFilterColumns == "function" ? recordFilterColumns().columns : recordFilterColumns}
                    />
                </Grid> : null}

                {/* <SearchField
                    // globalFilter={globalFilter}
                    // setGlobalFilter={setGlobalFilter}
                    onChangeData={onChangeData}
                    headersData={headersData}
                />
                {filters ?
                    <GlobalFilter
                        onChangeData={onChangeData}
                        headersData={headersData}
                    />
                    : null} */}
                <Grid item sx={{
                    // display: 'inline-block',
                    // maxWidth: '430px',
                    // marginRight: '15px',
                    // maxWidth: '30%',
                    // flexBasis: '20%'
                }}>
                    {upload ? <UploadBtn
                        uploadName={uploadName}
                        upload={upload}
                        name={name}
                        aditionalName={aditionalName}
                        additionalActions={additionalActions}
                        recordColumns={recordColumns}
                        parentRecordFn={parentRecordFn}
                        aditionalColumns={aditionalColumns}
                        clearInitial={clearInitial}
                        clearNotifications={() => dispatch(clearNotifications())}
                        clearRecord={clearRecord}
                        metaData={metaData}
                        tableName={tableName}
                        createRecord={createRecord}
                    /> : null}
                    {create ? tableCreateBtn ? tableCreateBtn : <CreateBtn
                        name={name}
                        createRecord={createRecord}
                        // metaData={metaData}
                        clearNotifications={() => dispatch(clearNotifications())}
                        recordColumns={recordColumns}
                        editRecordMetaData={(data) => {
                            dispatch(editRecordMetaData(data));
                        }}
                    /> : null}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default Header;