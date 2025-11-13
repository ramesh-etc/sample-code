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
    // getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    // ColumnDef,
    // OnChangeFn,
    flexRender,

} from '@tanstack/react-table';
import Skeleton from '@mui/material/Skeleton';
import useStyles from './styles';
import { useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import Header from './Header';
import { useTheme } from "@mui/system";
// import Spinner from '../Spinner';
// import { appColor } from '../../utils/tools';

function Table({ name,
    columns,
    data,
    totalPageCount,
    totalPageItems,
    onChangeData,
    headersData,
    loading,
    tableName,
    parentPath,
    create,
    createName,
    upload,
    filters,
    recordColumns,
    parentRecordFn,
    handleCreate,
    aditionalName,
    aditionalActions,
    noHeader,
    aditionalColumns,
    tableClassName,
    sticky,
    tableCreateBtn,
    noSearch,
    clearInitial,
    clearRecord,
    clearNotifications,
    createRecord,
    recordActions,
    updateLoader,
    handlePageChange,
    setTableProps, setTable }) {
    const { classes } = useStyles();
    const location = useLocation();
    const { state: routeState } = location;
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState({
            pageIndex: 0,
            pageSize: 25,
        })
    const [pageCountData, setPageCountData] = useState(totalPageCount);
    const [pageCountItems, setPageCountItems] = useState(totalPageItems);
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
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
            sorting,
            columnFilters,
            // globalFilter,
            // sorting: []
            //     [
            //     {
            //       id: 'columnId', // Replace with the ID of the column you want to sort
            //       desc: true,     // Set to `true` for descending order, or `false` for ascending
            //     }
            //   ]
        },
        onSortingChange: setSorting,
        pageCount: pageCountData,
        initialState: {
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        // onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
        getSortedRowModel: getSortedRowModel(),
        //
        // debugTable: true,
    });

    // const pageSize = table.getState().pagination.pageSize;

    const totalPageOptions = totalPageItems && pageSize ? Math.ceil(parseInt(totalPageItems) / parseInt(pageSize)) : 0;
    const currentPageIndex = headersData && headersData.page && (headersData.page - 1) || 0;
    const sortData = headersData && headersData.orderBy && Object.assign({}, { orderBy: headersData.orderBy, orderType: headersData.orderType }) || false;
    const [visiblePages, setVisiblePages] = useState(
        getVisiblePages(0, totalPageOptions)
    );

    useEffect(() => {
        if (totalPageItems.toString() !== pageCountItems.toString()) {
            setPageCountItems(totalPageItems);
            const visiblePages = getVisiblePages(0, totalPageOptions);
            setVisiblePages(filterPages(visiblePages, totalPageOptions));
        }
    }, [totalPageItems, pageCountItems, totalPageOptions])

    useEffect(() => {
        if (totalPageCount.toString() !== pageCountData.toString()) {
            setPageCountData(totalPageCount);
        }
    }, [totalPageCount])

    useEffect(() => {
        if (headersData && headersData.page) {
            table.setPageIndex((headersData.page - 1) || 0)
        }
    }, [headersData && headersData.page])

    const navigationBtn = (page) => {
        table.setPageIndex(page - 1);
        changePage(page);
        onChangeData({ offset: (page - 1) * pageSize, page, limit: pageSize });
    }

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

    const handlePreviousPage = React.useCallback(() => {
        if (currentPageIndex > 0)
            navigationBtn(currentPageIndex);
    }, [currentPageIndex]);

    const handleNextPage = React.useCallback(() => {
        if (((currentPageIndex + 1) * pageSize) < totalPageItems)
            navigationBtn(currentPageIndex + 2);
    }, [currentPageIndex, pageSize, totalPageItems]);

    React.useMemo(() => {
        // handlePageChange({ table: table, handleNextPage: handleNextPage, handlePreviousPage: handlePreviousPage, navigationBtn: navigationBtn, currentPageIndex: currentPageIndex, visiblePages: visiblePages });
        setTable(table);
    }, [table]);

    React.useMemo(() => {
        // handlePageChange({ table: table, handleNextPage: handleNextPage, handlePreviousPage: handlePreviousPage, navigationBtn: navigationBtn, currentPageIndex: currentPageIndex, visiblePages: visiblePages });
        setTableProps({
            handlePreviousPage,
            handleNextPage,
            currentPageIndex,
            navigationBtn,
            visiblePages
        });
    }, [currentPageIndex, visiblePages, handleNextPage, handlePreviousPage]);

    const handleSort = (e) => {
        onChangeData({ offset: 0, limit: 25, orderBy: e.columnDef.sortColumn, orderType: e.isSortedDesc ? 'DESC' : 'ASC', page: 1 });
    }

    return (
        <React.Fragment>
            <table
                className={classes.table}

            >
                <thead style={sticky ? {
                    position: 'sticky',
                    top: 60,
                    backgroundColor: '#fff',
                    zIndex: 1
                } : {}}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={classes.rowHeader}
                        >
                            {headerGroup.headers.map((header, index) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={classes.tableHeaderData}
                                        style={
                                            // Object.assign(
                                            //     {
                                            //         minWidth: header?.column?.columnDef?.size,
                                            //     },
                                            //     header?.column?.columnDef?.sort && {
                                            //         cursor: 'pointer',
                                            //     },
                                            //     header?.column?.columnDef?.type === 'action' && {
                                            //         maxWidth: header.column.columnDef.size,
                                            //         // textAlign: 'center',
                                            //     },
                                            //     name == "invoices" && {
                                            //         padding: ((index + 1) == headerGroup.headers?.length) ? '0px 0px 15px 0px' : '0px 15px 15px 0px'
                                            //     }
                                            // )
                                            {
                                                ...(header?.column?.columnDef?.sort
                                                    ? { cursor: 'pointer', minWidth: header?.column?.columnDef?.size }
                                                    : (header?.column?.columnDef?.type === "action") ?
                                                        {
                                                            maxWidth: header.column.columnDef.size,
                                                            // textAlign: 'center'
                                                        } : {
                                                            minWidth: header.column.columnDef.size
                                                        }),
                                                ...(name == "invoices" && {
                                                    padding: ((index + 1) == headerGroup.headers?.length) ? '0px 0px 15px 0px' : '0px 15px 15px 0px'
                                                })
                                                // width: cell.column.getSize(),
                                            }
                                        }
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                onClick={header?.column?.columnDef?.sort ? () => handleSort(Object.assign({}, header?.column, { isSortedDesc: sortData && sortData.orderBy && sortData.orderBy === header?.column?.columnDef?.sortColumn && sortData.orderType === 'ASC' ? true : false })) : null}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length ? table.getRowModel().rows.map((row, index) => {

                        return (
                            <tr key={row.id}
                                style={{
                                    backgroundColor: index % 2 == 0 ? "#F8FCFF" : "#FFF"
                                }}
                                className={classes.row}
                            >
                                {(row?.getVisibleCells() || []).map((cell, i) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className={classes.tableBodyData}
                                            style={{
                                                ...(row.original.onClickHandler && !loading
                                                    ? { cursor: 'pointer', minWidth: cell.column.columnDef.size }
                                                    : (cell?.column?.columnDef?.type === "action") ?
                                                        {
                                                            maxWidth: cell.column.columnDef.size,
                                                            // textAlign: 'center'
                                                        } : {
                                                            minWidth: cell.column.columnDef.size
                                                        }),
                                                ...(name == "invoices" && {
                                                    padding: ((i + 1) == row?.getVisibleCells()?.length) ? '15px 0px 15px 0px' : '15px 15px 15px 0px',
                                                    wordBreak: (cell?.column?.columnDef?.type === "detailView") ? "unset" : 'break-word'
                                                })
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
                    })
                        : (
                            <tr style={{
                                backgroundColor: "#F8FCFF"
                            }}
                                className={classes.row}>
                                <td colSpan={'100%'} className={classes.tableBodyData} style={{ textAlign: 'center' }}>
                                    No records found
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>



        </React.Fragment>
    )

}

export default Table
