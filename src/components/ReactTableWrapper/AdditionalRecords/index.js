
import React from "react";
import ReactTanstackTable from "../../ReactTanstackTable";
import TabComponent from "../../TabComponent";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const checkThereisPresent = (arr, obj) => {
    for (const item of arr) {
        if (obj[item.name]) {
            return item;
        }
    }
    return {}; // If no matching object is found
};

const AdditionRecords = (props) => {
    const { additionalActions = [], defaultRecords = {}, setSelectedTable } = props;
    const { name, columns, actions } = checkThereisPresent(additionalActions, defaultRecords) || {};
    const [selectedTab, setSelectedTab] = React.useState(0);

    React.useEffect(() => {
        setSelectedTab(0);
    }, []);

    const handleTabs = (e, tabIndex) => {
        setSelectedTab(tabIndex);
    }

    return (additionalActions.length != Object.keys(defaultRecords).length && Object.keys(defaultRecords).length == 1) ? <AdditionalTableWrappers
        name={name}
        columns={columns}
        actions={actions}
        defaultRecords={defaultRecords}
        setSelectedTable={setSelectedTable}
    />
        :
        <TabComponent
            categories={(additionalActions || []).map(e => Object.assign({}, e, { title: e.name }))}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            handleTabs={handleTabs}
        >
            {(additionalActions || []).map((additional, index) => {
                return index == selectedTab ? <AdditionalTableWrappers
                    key={index}
                    name={additional?.name}
                    columns={additional?.columns}
                    actions={additional?.actions}
                    defaultRecords={defaultRecords}
                    setSelectedTable={setSelectedTable}
                /> : null

            })
            }
        </TabComponent>
}


export default AdditionRecords;

const AdditionalTableWrappers = (props) => {
    const { additionalActions, name, columns, actions, defaultRecords, setSelectedTable } = props;
    // ------------------------------Enable it for api calling to get table records -------------
    // const { loadRecords } = actions || {};
    // const dispatch = useAppDispatch();
    // const records = useAppSelector(state => state?.[name]?.records) || [];

    // React.useEffect(() => {
    //     dispatch(loadRecords());
    // }, []);
    // ------------------------------------

    let tableName = React.useMemo(() => {
        let showName = name;
        if (name == "failed") {
            showName = 'Failed Accounts'
        } else if (name == "duplicates") {
            showName = 'Duplicate Accounts (These accounts are already uploaded in EzTekPAY)'
        }
        setSelectedTable(showName);
        return showName
    }, [name]);

    return <ReactTanstackTable
        records={defaultRecords?.[name] || []}
        columns={typeof columns == 'function' ? columns().columns : columns}
        tableName={`${tableName}`}
        name={tableName}
        // locationState={location.state}
        headersData={{
            offset: 0,
            limit: 25,
            search: false,
            filter: false,
            // sort: false,
            page: 1
        }}
        totalPageCount={false}
        totalPageItems={-1}
        noHeader={true}
        headerStyle={{ fontSize: '12px' }}
        bodyStyle={{ fontSize: '12px' }}
    />
}