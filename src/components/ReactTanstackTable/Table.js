/**
 *
 * Table
 *
 */

import React, { useState, useEffect } from 'react';
import {
    Table as ReactTable,
    // PaginationState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    // ColumnDef,
    // OnChangeFn,
    flexRender,

} from '@tanstack/react-table';
import Skeleton from '@mui/material/Skeleton';
import useStyles from './styles';
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { appColor } from '../../utils/tools';

function Table({ name, columns, data = [], totalPageCount, totalPageItems, onChangeData, headersData, loading, tableName, parentPath, create, createName, upload, filters, recordColumns, parentRecordFn, handleCreate, clearRecord, aditionalName, aditionalActions, noHeader, clearNotifications, createRecord, headerStyle, bodyStyle = {} }) {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const { state: routeState } = location;
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState({
            pageIndex: 0,
            pageSize: 25,
        })
    const [pageCountItems, setPageCountItems] = useState(data.length);
    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState('')
    const [columnFilters, setColumnFilters] = React.useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
            sorting,
            columnFilters,
            globalFilter,
        },
        //  onSortingChange: setSorting,
        //  pageCount: pageCountData,
        initialState: {
            pagination,
        },
        //  onColumnFiltersChange: setColumnFilters,
        //  onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // manualPagination: true,
        getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
        getSortedRowModel: getSortedRowModel(),
        // debugTable: true,
    });

    // const pageSize = table.getState().pagination.pageSize;


    const totalPageOptions = data.length && pageSize ? Math.ceil(parseInt(data.length) / parseInt(pageSize)) : 0;
    const [visiblePages, setVisiblePages] = useState(
        getVisiblePages(0, totalPageOptions)
    );

    useEffect(() => {
        if (data.length.toString() !== pageCountItems.toString()) {
            setPageCountItems(data.length);
            const visiblePages = getVisiblePages(0, totalPageOptions);
            setVisiblePages(filterPages(visiblePages, totalPageOptions));
        }
    }, [data.length, pageCountItems, totalPageOptions])

    const navigationBtn = page => {
        table.setPageIndex(page - 1);
        changePage(page);
    };

    const changePage = page => {
        const visiblePages = getVisiblePages(page, totalPageOptions);
        setVisiblePages(filterPages(visiblePages, totalPageOptions));
    };

    function filterPages(visiblePages, totalPages) {
        return visiblePages.filter(page => page <= totalPages);
    }

    function getVisiblePages(page, total) {
        if (total < 7) {
            return filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
            if (page % 3 >= 0 && page > 2 && page + 1 < total) {
                return [1, page - 1, page, page + 1, total];
            } else if (page % 3 >= 0 && page > 2 && page + 1 >= total) {
                return [1, total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, total];
            }
        }
    }

    const handlePreviousPage = () => {
        if (table.getState().pagination.pageIndex > 0)
            navigationBtn(table.getState().pagination.pageIndex);
    }

    const handleNextPage = () => {
        if (((table.getState().pagination.pageIndex + 1) * pageSize) < data.length)
            navigationBtn(table.getState().pagination.pageIndex + 2);
    }

    return (
        <>
            <Grid className={classes.tableContainer}>
                {!noHeader ? <Grid
                    container
                    sx={{
                        padding: '15px',
                        alignItems: 'center',
                        // position: 'sticky', top: '-16px',
                        // backgroundColor: '#fff',
                        transition: 'position 0.3s ease, padding 0.3s ease',
                    }}
                >
                    <Grid
                        item
                    // xs={2}
                    >
                        <Typography variant="h6">
                            {`${tableName}`}
                        </Typography>
                    </Grid>
                </Grid> : null}
                <Grid sx={{
                    // overflow: 'auto'
                }}>
                    <table
                        className={classes.table}
                    >
                        <thead style={{ position: 'sticky', top: '-16px', transition: 'position 0.3s ease, padding 0.3s ease', }}>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}
                                    style={{
                                        // position: 'sticky', top: 0,
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className={classes.tableHeaderData}
                                                style={headerStyle}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        style={header?.column?.columnDef?.sort ? { cursor: 'pointer' } : null}
                                                    //  onClick={
                                                    //      header?.column?.columnDef?.sort ? () => handleSort(Object.assign({}, header?.column, { isSortedDesc: sortData && sortData.orderBy && sortData.orderBy === header?.column?.columnDef?.sortColumn && sortData.orderType === 'ASC' ? true : false })) : null}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getCanFilter() ? (
                                                            <div>
                                                                {/* <Filter column={header.column} table={table} /> */}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row, index) => {
                                return (
                                    <tr key={row.id}
                                        style={{
                                            backgroundColor: index % 2 == 0 ? "#F8FCFF" : "#FFF"
                                        }}
                                        className={classes.row}
                                    >
                                        {(row?.getVisibleCells() || []).map(cell => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className={classes.tableBodyData}
                                                    style={{
                                                        ...(row.original.onClickHandler !== null && !loading
                                                            ? { cursor: 'pointer' }
                                                            : null),
                                                        ...(bodyStyle && bodyStyle)
                                                        // width: cell.column.getSize(),
                                                    }}
                                                    onClick={() => row.original.onClickHandler && !loading ? row.original.onClickHandler(row.original) : null}
                                                >
                                                    {loading ?
                                                        <Skeleton animation="wave" />
                                                        : flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
            {visiblePages.length && visiblePages.length > 1 ? <Grid className={classes.paginationContainer}>
                <ToggleButtonGroup
                    exclusive
                    size={'small'}
                    aria-label="text alignment"
                    className={classes.toggleGroup}
                >
                    <ToggleButton
                        value="left"
                        aria-label="left aligned"
                        disabled={!table.getCanPreviousPage()}
                        onClick={handlePreviousPage}
                        className={classes.toggleBtn}
                    >
                        <KeyboardArrowLeftIcon size="small" sx={{
                            fontSize: '18px'
                        }} />
                        Back
                    </ToggleButton>
                    {visiblePages.map((page, index, array) => (
                        <ToggleButton
                            key={index}
                            value={array[index - 1] + 1 < page ? `${page}` : page}
                            aria-label="centered"
                            selected={table.getState().pagination.pageIndex === page - 1}
                            //  selected={currentPageIndex === page - 1}
                            className={classes.toggleBtnNumber}
                            style={{
                                color: table.getState().pagination.pageIndex === page - 1 ? appColor : '#6B7280',
                                fontFamily: 'Poppins-Bold'
                            }}
                            onClick={() => navigationBtn(page)}>
                            {array[index - 1] + 1 < page ? `${page}` : page}
                        </ToggleButton>
                    ))}
                    <ToggleButton
                        value='right'
                        aria-label="right aligned"
                        onClick={handleNextPage}
                        disabled={!table.getCanNextPage()}
                        className={classes.toggleBtn}
                    >
                        Next
                        <KeyboardArrowRightIcon size="small" sx={{
                            fontSize: '18px'
                        }} />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid> : null}
        </>
    )

}

export default Table
