/**
 *
 * ReactTableWrapper
 *
 */

import React from 'react';
import Table from './Table';
import { Grid } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useLocation } from 'react-router-dom';
import Sort from '../../images/icons/sort.svg';
import ActionComponent from './ActionComponent';
import { useAppDispatch } from '../../redux/hooks';

import Header from './Header';
// import { appColor } from '../../utils/tools';
import useStyles from './styles';
import TablePagination from './TablePagination';
import { HookWrapper } from './HookWrapper';
import DetailView from './DetailView';

function ReactTableWrapper(props) {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { classes } = useStyles();
    const { state: routeState } = location;

    const { name,
        records,
        columns,
        children,
        path,
        locationState = {},
        view, sm,
        metaData = {},
        totalPageCount,
        onChangeData,
        headersData,
        loading,
        tableName,
        parentPath,
        create,
        createName,
        upload,
        filters,
        totalPageItems,
        parentRecordFn,
        handleCreate,
        record,
        recordActions,
        aditionalName,
        additionalActions,
        noHeader,
        aditionalColumns,
        // clearNotifications,
        // createRecord,
        // clearRecord,
        // clearInitial,
        // updateRecord,
        // deleteRecord,
        // loadRecord,
        tableClassName,
        sticky,
        tableCreateBtn,
        noSearch,
        // updateLoader,
        recordFilterColumns,
        initialFilter
    } = props;

    const { clearRecord, createRecord, clearNotifications, clearInitial, deleteRecord, updateRecord, loadRecord, editRecordMetaData, loadAction } = recordActions || {};
    const activePath = location.pathname;
    const tableColumns = children ? columns.filter((column) => column.visible && column.viewMode) : columns.filter((column) => column.visible);

    // const handleCellClick = (rowId, setModalOpen) => {
    //     if (setModalOpen) {
    //         // setModalOpen(true);
    //         dispatch(loadRecord({ id: rowId, parentFn: () => setModalOpen(true) }));

    //     }
    //     // Perform actions based on the row ID
    // };

    let rows = records.map((record) => Object.assign(
        {},
        record, {
        // onClickHandler: view ? handleClick.bind(this, record, locationState) : null,
        isActive: activePath === `${path}/${record.id}` || activePath === `${path}/${record.id}/edit`,
    }),
    );

    tableColumns.forEach((column) => {
        switch (column.type) {
            case 'upload':
                rows = rows.map((row) => Object.assign(
                    row,
                    {
                        [column.value]:
                            column.html ? column.html(row, metaData) :
                                <img
                                    src={`${row[column.value] || ''}`}
                                    role="presentation" style={{ height: 64, padding: 4 }}
                                />,
                    },
                ));
                break;
            case 'download':
                rows = rows.map((row) => Object.assign(
                    row,
                    {
                        [column.value]: column.html ? column.html(row, metaData) : row[column.value]
                    },
                ));
                break;
            case 'checkbox':
                rows = rows.map((row) => Object.assign(
                    row,
                    {
                        [column.value]:
                            column.html ? column.html(row, metaData) : row[column.value] && 'Yes' || 'No',
                    },
                ));
                break;
            case 'select':
            case 'multiSelect':
                rows = rows.map((row) => Object.assign(
                    row,
                    {
                        [column.value]: column.html ? column.html(row, row[column.value], metaData) : row[column.value],
                    },
                ));
                break;

            case 'detailView':
                rows = rows.map((row, i) => Object.assign(
                    row,
                    {
                        [column.value]: <DetailView
                            row={records[i]}
                            col_name={column.value}
                            columns={column.innercolumn}
                        />,
                    },
                ));
                break;
            case 'action':
                rows = rows.map((row, i) => Object.assign(
                    row,
                    {
                        [column.value]: column.html ? column.html(row, metaData) : <ActionComponent
                            rowId={row.id}
                            // onClick={handleCellClick}
                            name={name}
                            updateRecord={updateRecord}
                            metaData={metaData}
                            clearNotifications={clearNotifications}
                            recordColumns={columns}
                            loadRecord={loadRecord}
                            deleteRecord={deleteRecord}
                            editing={column.edit}
                            deleting={column.delete}
                            editRecordMetaData={editRecordMetaData}
                            row={records[i]}
                            column={column}
                            loadAction={loadAction}
                            index={i}
                        // updateLoader={updateLoader}
                        />,
                    },
                ));
                break;
            default:
                rows = rows.map((row) => {
                    return Object.assign(
                        row,
                        {
                            [column.value]:
                                column.html ? column.html(row, row[column.value], metaData) : column.limit && row[column.value] && row[column.value].length > 60 ? `${row[column.value].toString().substring(0, 60)}...` : row[column.value] != null ? row[column.value] : '' || '',
                        },
                    )
                });
                break;
        }
    });

    const columnHelper = createColumnHelper()

    return (
        <Grid container className={classes.totalContainer} sx={{ position: 'relative' }}>
            {/* <> */}
            <HookWrapper>
                {(props) => {
                    const hookProps = { ...props };
                    return (<React.Fragment>
                        <Grid className={classes.tableHeaderContainer}
                            style={sticky ? { overflow: 'unset' } : sm ? { width: 'max-content' } : { overflow: 'auto' }}
                        >
                            {!noHeader ? <Header
                                onChangeData={onChangeData}
                                headersData={headersData}
                                name={name}
                                // globalFilter={globalFilter}
                                // setGlobalFilter={setGlobalFilter}
                                parentPath={parentPath}
                                routeState={routeState}
                                create={create}
                                createName={createName}
                                upload={upload}
                                filters={filters}
                                recordColumns={columns}
                                parentRecordFn={parentRecordFn}
                                handleCreate={handleCreate}
                                aditionalName={aditionalName}
                                additionalActions={additionalActions}
                                aditionalColumns={aditionalColumns}
                                rowsLength={rows.length || 0}
                                tableClassName={tableClassName}
                                sticky={sticky}
                                tableCreateBtn={tableCreateBtn}
                                noSearch={noSearch}
                                // clearInitial={clearInitial}
                                // createRecord={createRecord}
                                // clearRecord={clearRecord}
                                // clearNotifications={clearNotifications}
                                recordActions={recordActions}
                                recordFilterColumns={recordFilterColumns}
                                initialFilter={initialFilter}
                            // record={record}
                            /> : null}
                            <Table
                                tableName={tableName}
                                columns={
                                    tableColumns.map((column) =>
                                        columnHelper.accessor(row => row[column.value],
                                            {
                                                id: column.value,
                                                cell: info => info.renderValue(),
                                                header: () => {
                                                    if (column.sort) {
                                                        // If sorting is enabled, include the image //⇅
                                                        return (
                                                            <Grid container sx={{
                                                                flexFlow: 'row',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Grid sx={{
                                                                    paddingRight: '5px',
                                                                    flexBasis: 'auto'
                                                                    // width: column.width || 'auto'
                                                                }}>
                                                                    {column.label}
                                                                </Grid>
                                                                <Grid sx={{
                                                                    display: 'flex'
                                                                }}>
                                                                    <img src={Sort} alt="Sort Icon" />
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    } else {
                                                        // Otherwise, just display the label
                                                        return column.label;
                                                    }
                                                },
                                                size: column.width || 'auto',
                                                maxWidth: column.maxWidth || 'auto',
                                                footer: info => info.column.id,
                                                sortDescFirst: column.sort,
                                                enableSorting: column.sort,
                                                manualSorting: column.sort,
                                                sort: column.sort,
                                                sortType: 'basic',
                                                sortColumn: column.sortColumn,
                                                accessor: '',
                                                ...column
                                            })
                                    )
                                }
                                data={rows}
                                totalPageCount={totalPageCount || -1}
                                totalPageItems={totalPageItems || rows.length}
                                onChangeData={onChangeData}
                                headersData={headersData}
                                loading={loading}
                                name={name}
                                parentPath={parentPath}
                                create={create}
                                createName={createName}
                                upload={upload}
                                filters={filters}
                                recordColumns={columns}
                                parentRecordFn={parentRecordFn}
                                handleCreate={handleCreate}
                                aditionalName={aditionalName}
                                // aditionalActions={aditionalActions}
                                noHeader={noHeader}
                                aditionalColumns={aditionalColumns}
                                tableClassName={tableClassName}
                                sticky={sticky}
                                tableCreateBtn={tableCreateBtn}
                                noSearch={noSearch}
                                // clearRecord={clearRecord}
                                // clearNotifications={clearNotifications}
                                // createRecord={createRecord}
                                // clearInitial={clearInitial}
                                recordActions={recordActions}
                                {...hookProps}
                            // updateLoader={updateLoader}
                            // record={record}
                            />
                        </Grid>

                        <TablePagination
                            totalPageCount={totalPageCount || -1}
                            totalPageItems={totalPageItems || rows.length}
                            {...hookProps}
                        />
                    </React.Fragment>
                    )
                }
                }
            </HookWrapper>
        </Grid>
    );



}

export default ReactTableWrapper;
