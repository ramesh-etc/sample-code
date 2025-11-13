/**
 * 
 * File Uploader
 * 
 */
import schema from "./schema";
const docsColumns = schema().docs().columns;

export default function fileUploaderRoute(simpleLazyLoadedRoute, user) {

    return [
        {
            path: '/',
            pageName: 'LoginPage',
            exact: true,
            data: {
                title: 'Home',
                path: '/',
                route: true
            },
        },
        {
            path: `/docs`,
            exact: true,
            index: true,
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
    ]
}