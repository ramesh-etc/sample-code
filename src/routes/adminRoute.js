/**
 * 
 * Admin
 * 
 */
import React, { lazy } from "react";
import schema from "./schema";

const adminUsersColumns = schema().adminUsers().columns;
const hospitalUsersColumns = schema().hospitalUsers().columns;
const hospitalColumns = schema().hospitals().columns;
const reminderSettingsColumns = schema().reminderSettings;
const adminDocsColumns = schema().adminDocs().columns;
const hipaaSettingsColumns = schema().hipaaSettings;
const versionSettingsColumns = schema().appVersionSettings;
// const uploadHistoryColumns = schema().uploadHistory().columns;
// const uploadHistoryFilter = schema().uploadHistoryFilter;

export default function adminRoute(simpleLazyLoadedRoute, user) {
  const settingspage = user?.email == "siva@miotiv.com" ? {
    path: `/settings`,
    // name: 'settings',
    recordName: 'settings',
    exact: true,
    pageName: 'CategoriesPage',
    // require: ['RecordsPage', 'rest/users'],
    id: 'Settings',
    data: {
      title: 'Settings',
      path: '/settings',
      route: false,
      icon: 'settings',
      iconstyle: { fontSize: '1.5rem' }
      // separator: true
    },
    category: true,
    paperStyle: {
      padding: '0px 36px',
      borderRadius: '20px 20px 0px 0px'
    },
    variant: "scrollable",
    tabStyle: {
      borderBottom: 1, borderColor: 'divider', '& .MuiButtonBase-root.MuiTab-root': {
        padding: '0px',
        minWidth: 'auto',
        marginLeft: '20px',
      }
    },
    chileRouteStyle: { marginTop: '0px !important' },
    containerStyle: { borderRadius: '20px' },
    childRoutes: [

      {
        path: `messaging`,
        // name: 'reminders',
        exact: true,
        pageName: 'SettingsPage',
        // require: ['RecordsPage', 'rest/users'],
        id: 'Messaging',
        data: {
          path: '/messaging',
          title: 'Messaging',
          icon: 'settings',
          iconstyle: { fontSize: '1.5rem' }
        },
        chunk: [{
          page: 'settings',
          name: 'reminders',
          actionName: 'reminders'
        },
        ],
        columns: { settingsColumns: reminderSettingsColumns },
        boxStyle: { borderRadius: '0px 0px 20px 20px !important', boxShadow: 'none !important', border: 'none !important' }
      },
      {
        path: `hipaa`,
        // name: 'reminders',
        exact: true,
        pageName: 'SettingsPage',
        // require: ['RecordsPage', 'rest/users'],
        id: 'hipaa',
        data: {
          path: '/hipaa',
          title: 'HIPAA Compliance',
          icon: 'settings',
          iconstyle: { fontSize: '1.5rem' }
        },
        chunk: [{
          page: 'settings',
          name: 'hipaa',
          actionName: 'hipaa'
        },
        ],
        columns: { settingsColumns: hipaaSettingsColumns },
        boxStyle: { borderRadius: '0px 0px 20px 20px !important', boxShadow: 'none !important', border: 'none !important' }
      },
      {
        path: `version`,
        // name: 'reminders',
        exact: true,
        pageName: 'SettingsPage',
        // require: ['RecordsPage', 'rest/users'],
        id: 'version',
        data: {
          path: '/version',
          title: 'App Version',
          icon: 'settings',
          iconstyle: { fontSize: '1.5rem' }
        },
        chunk: [{
          page: 'settings',
          name: 'version',
          actionName: 'version'
        },
        ],
        columns: { settingsColumns: versionSettingsColumns },
        boxStyle: { borderRadius: '0px 0px 20px 20px !important', boxShadow: 'none !important', border: 'none !important' }
      },
    ]
  } :

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
      chunk: [{
        page: 'settings',
        name: 'reminders',
        actionName: 'reminders'
      },
      ],
      columns: { settingsColumns: reminderSettingsColumns },
    }

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
      container: 'LoginPage'
    },
    {
      path: `providers`,
      // name: 'providers',
      // recordName: 'providers',
      exact: true,
      pageName: 'RecordsPage',
      // require: ['RecordsPage', 'rest/users'],
      id: 'Providers',
      data: {
        path: '/providers',
        title: 'Providers',

        icon: 'Hospitals',
        // separator: true
      },
      chunk: [{
        page: 'records',
        name: 'hospitals',
        actionName: 'records'
      },
      ],
      columns: { recordColumns: hospitalColumns },
      view: true,
      edit: true,
      create: true,
    },
    {
      path: `/usersCategories`,
      // name: 'usersCategories',
      // recordName: 'usersCategories',
      exact: true,
      pageName: 'CategoriesPage',
      // require: ['RecordsPage', 'rest/users'],
      id: 'UsersCategories',
      data: {
        path: '/usersCategories',
        title: 'Users',

        icon: 'GroupIcon',
        // separator: true
      },
      category: true,
      // chunk: [{
      //     page: 'records',
      //     name: 'users',
      //     actionName: 'records'
      // },
      // ],
      // columns: { recordColumns: usersColumns },
      // view: true,
      // edit: true,
      // create: true,
      // container: function RecordsPage(users) {
      //     return this('users', `${process.env.PUBLIC_PATH || ''}/rest/users`, usersColumns, users.actions, users.selectors)
      // },
      childRoutes: [
        {
          path: `admin`,
          // name: 'admin',
          // recordName: 'admin',
          exact: true,
          pageName: 'RecordsPage',
          // require: ['RecordsPage', 'rest/users'],
          id: 'Admins',
          data: {
            path: '/admin',
            title: 'EzTekPAY users',

            icon: 'GroupIcon',
            // separator: true
          },
          chunk: [{
            page: 'records',
            name: 'adminUsers',
            actionName: 'records'
          },
          ],
          columns: { recordColumns: adminUsersColumns },
          view: true,
          edit: true,
          create: true,
        },
        {
          path: `provider`,
          // name: 'provider',
          // recordName: 'provider',
          exact: true,
          pageName: 'RecordsPage',
          // require: ['RecordsPage', 'rest/users'],
          id: 'providers',
          data: {
            path: '/provider',
            title: 'provider users',

            icon: 'GroupIcon',
            // separator: true
          },
          chunk: [{
            page: 'records',
            name: 'hospitalUsers',
            actionName: 'records'
          },
          ],
          columns: { recordColumns: hospitalUsersColumns },
          view: true,
          edit: true,
          create: true,
        },

      ]
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
        name: 'adminDocs',
        actionName: 'records'
      },
      ],
      columns: { recordColumns: adminDocsColumns },
      // view: true,
      // edit: true,
      // upload: true,
    },
    settingspage
  ]

  // if (user?.email == "siva@miotiv.com") {
  //   obj = obj.toSpliced(obj.length - 1, 0, {
  //     path: `uploadHistory`,
  //     // name: 'providers',
  //     // recordName: 'providers',
  //     exact: true,
  //     pageName: 'RecordsPage',
  //     // require: ['RecordsPage', 'rest/users'],
  //     id: 'uploadHistory',
  //     data: {
  //       path: '/uploadHistory',
  //       title: 'Upload History',
  //       icon: 'history',
  //       iconstyle: { fontSize: '1.5rem' }
  //     },
  //     chunk: [{
  //       page: 'records',
  //       name: 'uploadHistory',
  //       actionName: 'records'
  //     },
  //     ],
  //     columns: { recordColumns: uploadHistoryColumns, recordFilterColumns: uploadHistoryFilter },
  //     filters: true,
  //     initialFilter: true
  //     // view: true,
  //     // edit: true,
  //     // create: true,
  //   })
  // }
  return obj
}
