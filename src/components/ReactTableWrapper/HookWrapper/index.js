import React, { useState } from "react";

export const HookWrapper = (props) => {
    const [tableProps, setTableProps] = useState({});
    const [paginationtable, setTable] = useState(null);

    // const handlePageChange = ({ table, handlePreviousPage, handleNextPage, currentPageIndex, navigationBtn, visiblePages }) => {
    //     setTableProps({
    //         handlePreviousPage,
    //         handleNextPage,
    //         currentPageIndex,
    //         navigationBtn,
    //         visiblePages
    //     });
    //     setTable(table);
    // };

    return (
        <>
            {React.cloneElement(typeof props.children == "function" ? props.children({ tableProps, setTableProps, paginationtable, setTable }) : props.children, { tableProps, setTableProps, paginationtable, setTable })}
        </>
    );
};
