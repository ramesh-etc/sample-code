/**
 * 
 * Customer
 * 
 */

import schema from './schema';

const patientsColumns = schema().patients().columns;
const invoicessColumns = schema().invoices().columns;
const usersColumns = schema().users().columns;
const collectedInvoicesColumns = schema().collectedInvoices().columns;
const hospitalProfileColumns = schema().hospitalProfile;
// const reminderSettingsColumns = schema().reminderSettings;
const docsColumns = schema().docs().columns;
const invoiceFilterColumns = schema().invoiceFilter;
const uploadHistoryColumns = schema().uploadHistory().columns;
const uploadHistoryFilter = schema().uploadHistoryFilter;

export default function customerRoute(simpleLazyLoadedRoute, user) {

    let obj = [
        {
            path: '/',
            pageName: 'LoginPage',
            exact: true,
            index: true,
            data: {
                title: 'Home',
                path: '/',
                route: true
            },
        },
        {
            path: '/dashboard',
            pageName: 'Dashboard',
            // name: 'dashboard',
            data: {
                title: 'Dashboard',
                path: '/dashboard',
                route: false,
                icon: 'Substract',
            },
            columns: { recordColumns: patientsColumns, aditionalColumns: invoicessColumns, filterColumns: collectedInvoicesColumns, recordFilterColumns: invoiceFilterColumns },
            chunk: [{
                page: 'dashboard',
                name: 'dashboard',
                actionName: 'dashboard'
            },
            {
                page: 'records',
                name: 'invoices',
                actionName: 'records'
            },
            {
                page: 'records',
                name: 'collectedInvoices',
                actionName: 'box0',
                box: true,
                boxName: 'box0',
                columns: collectedInvoicesColumns
            },
            {
                page: 'records',
                name: 'report',
                actionName: 'report'
            },
            {
                additional: true,
                // page: 'records',
                name: 'duplicates',
                actionName: 'additional',
                columns: invoicessColumns
            },
            {
                additional: true,
                // page: 'records',
                name: 'failed',
                actionName: 'additional',
                columns: invoicessColumns
            }
            ],
            upload: true,
            filters: true
        },
        {
            path: `/users`,
            // name: 'users',
            recordName: 'users',
            exact: true,
            pageName: 'RecordsPage',
            id: 'Users',
            data: {
                path: '/users',
                title: 'Users',

                icon: 'GroupIcon',
            },
            chunk: [{
                page: 'records',
                name: 'users',
                actionName: 'records'
            },
            ],
            columns: { recordColumns: usersColumns },
            view: true,
            edit: true,
            create: true,
        },
        {
            path: `/docs`,
            exact: true,
            pageName: 'RecordsPage',
            id: 'Docs',
            data: {
                path: '/docs',
                title: 'Docs',
                // iconstyle: { fontSize: '1.6rem', width: '1em' },
                icon: 'Docs',
            },
            chunk: [{
                page: 'records',
                name: 'docs',
                actionName: 'records'
            },
            ],
            columns: { recordColumns: docsColumns },
            view: true,
            edit: true,
            upload: true,
        },
        // {
        //     path: `/settings`,
        //     // name: 'settings',
        //     recordName: 'settings',
        //     exact: true,
        //     pageName: 'CategoriesPage',
        //     // require: ['RecordsPage', 'rest/users'],
        //     id: 'Settings',
        //     data: {
        //         title: 'Settings',
        //         path: '/settings',
        //         route: false,
        //         icon: 'settings',
        //         iconstyle: { fontSize: '1.5rem' }
        //         // separator: true
        //     },
        //     category: true,
        //     paperStyle: {
        //         padding: '0px 36px',
        //         borderRadius: '20px 20px 0px 0px'
        //     },
        //     variant: "scrollable",
        //     tabStyle: {
        //         borderBottom: 1, borderColor: 'divider', '& .MuiButtonBase-root.MuiTab-root': {
        //             padding: '0px',
        //             minWidth: 'auto',
        //             marginLeft: '20px',
        //         }
        //     },
        //     chileRouteStyle: { marginTop: '0px !important' },
        //     containerStyle: { borderRadius: '20px' },
        //     childRoutes: [
        // {
        //     path: 'provider',
        //     pageName: 'SettingsPage',
        //     // name: 'provider',
        //     data: {
        //         title: 'Provider profile',
        //         path: '/provider',
        //         icon: 'settings',
        //         iconstyle: { fontSize: '1.5rem' }
        //     },
        //     columns: { settingsColumns: hospitalProfileColumns },
        //     chunk: [{
        //         page: 'settings',
        //         name: 'provider',
        //         actionName: 'provider'
        //     },
        //     ],
        //     // boxStyle: { borderRadius: '0px 0px 20px 20px !important', boxShadow: 'none !important', border: 'none !important' }
        // },
        // {
        //     path: `reminders`,
        //     // name: 'reminders',
        //     exact: true,
        //     pageName: 'SettingsPage',
        //     // require: ['RecordsPage', 'rest/users'],
        //     id: 'Reminders',
        //     data: {
        //         path: '/reminders',
        //         title: 'Reminders',
        //     },
        //     chunk: [{
        //         page: 'settings',
        //         name: 'reminders',
        //         actionName: 'reminders'
        //     },
        //     ],
        //     columns: { settingsColumns: reminderSettingsColumns },
        //     boxStyle: { borderRadius: '0px 0px 20px 20px !important', boxShadow: 'none !important', border: 'none !important' }
        // },
        //     ]
        // },

        {
            path: `/settings`,
            recordName: 'settings',
            exact: true,
            pageName: 'SettingsPage',
            id: 'Settings',
            data: {
                title: 'Settings',
                path: '/settings',
                route: false,
                icon: 'settings',
                iconstyle: { fontSize: '1.5rem' }
            },
            columns: { settingsColumns: hospitalProfileColumns },
            chunk: [{
                page: 'settings',
                name: 'provider',
                actionName: 'provider'
            },]
        },

        // {
        //     path: '/*',
        //     exact: true,
        //     pageName: 'NotFound',
        // }
    ].filter(route => route && typeof route === 'object')

    if (["senthilnathan.rifluxyss@gmail.com", "selva.rifluxyss@gmail.com"].includes(user?.email)) {
        obj = obj.toSpliced(obj.length - 1, 0, {
            path: `uploadHistory`,
            // name: 'providers',
            // recordName: 'providers',
            exact: true,
            pageName: 'RecordsPage',
            // require: ['RecordsPage', 'rest/users'],
            id: 'uploadHistory',
            data: {
                path: '/uploadHistory',
                title: 'Upload History',
                icon: 'history',
                iconstyle: { fontSize: '1.5rem' }
            },
            chunk: [{
                page: 'records',
                name: 'uploadHistory',
                actionName: 'records'
            },
            ],
            columns: { recordColumns: uploadHistoryColumns, recordFilterColumns: uploadHistoryFilter },
            filters: true,
            initialFilter: true
            // view: true,
            // edit: true,
            // create: true,
        })
    }

    return obj
}