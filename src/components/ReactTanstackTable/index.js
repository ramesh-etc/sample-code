/**
 *
 * ReactTableWrapper
 *
 */

import React from 'react';
import Table from './Table';
import { Grid } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useLocation, useNavigate } from 'react-router-dom';
import Sort from '../../images/icons/sort.svg';
import useStyles from './styles';

function ReactTanstackTable(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { classes } = useStyles();

    const handleClick = (record, data, el) => {
        const { id } = record || {};
        const targetId = el && el.target && el.target.id || false;
        const { path, locationState, schemaId, user } = props;

        if ((id && !targetId) || (id && targetId && targetId !== id))
            navigate(`/${path}/${id}/view`, {
                state: Object.assign({}, { ...locationState }, { id })
            });
    }

    const { name, records, columns, children, path, locationState = {}, view, sm, metaData = {}, totalPageCount, onChangeData, headersData, loading, tableName, parentPath, create, createName, upload, filters, totalPageItems, parentRecordFn, handleCreate, record, clearRecord, aditionalName, aditionalActions, noHeader, clearNotifications, createRecord, headerStyle, bodyStyle } = props;

    const activePath = location.pathname;
    const tableColumns = children ? columns.filter((column) => column.visible && column.viewMode) : columns.filter((column) => column.visible);

    let rows = records.map((record) => Object.assign(
        {},
        record, {
        onClickHandler: view ? handleClick.bind(this, record, locationState) : null,
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
                        [column.value]: column.html ? column.html(row, metaData) : row[column.value],
                    },
                ));
                break;
            default:
                rows = rows.map((row, i) => Object.assign(
                    row,
                    {
                        [column.value]:
                            column.html ? column.html(row, records[i], metaData) : column.limit && row[column.value] && row[column.value].length > 60 ? `${row[column.value].toString().substring(0, 60)}...` : row[column.value] != null ? row[column.value] : '' || '',
                    },
                ));
                break;
        }
    });

    const columnHelper = createColumnHelper()

    return (
        <>
            <>
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
                                                        // width: column.width || 'auto'
                                                    }}>
                                                        {column.label}
                                                    </Grid>
                                                    <Grid><img src={Sort} alt="Sort Icon" /></Grid>
                                                </Grid>
                                            );
                                        } else {
                                            // Otherwise, just display the label
                                            return column.label;
                                        }
                                    },
                                    // size: column.width || 'auto',
                                    footer: info => info.column.id,
                                    sortDescFirst: column.sort,
                                    enableSorting: column.sort,
                                    manualSorting: column.sort,
                                    sort: column.sort,
                                    sortType: 'basic',
                                    sortColumn: column.sortColumn,
                                    accessor: ''
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
                    clearRecord={clearRecord}
                    aditionalName={aditionalName}
                    aditionalActions={aditionalActions}
                    noHeader={noHeader}
                    clearNotifications={clearNotifications}
                    createRecord={createRecord}
                    headerStyle={headerStyle}
                    bodyStyle={bodyStyle}
                // record={record}
                />
            </>
        </>
    );



}

export default ReactTanstackTable;
