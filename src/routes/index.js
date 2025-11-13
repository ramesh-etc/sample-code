import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../components/Spinner";
import routeSwitcher from "../utils/routing/routeSwitcher";
import { useAppSelector } from "../redux/hooks";
import { store } from '../redux/store';
import records from "../redux/records";
import store2 from 'store2';
import { useClearCache } from "react-clear-cache";

const Layout = React.lazy(() => import('../pages/Layout'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

export default function CustomRoute() {
    const loggedIn = useAppSelector((state) => state?.authentication?.loggedIn);
    const user = useAppSelector((state) => state?.authentication?.user);
    // const appVersion = useAppSelector((state) => state?.authentication?.appVersion) || 0;
    const { version } = user || {};

    const { emptyCacheStorage } = useClearCache({ auto: true });
    const storeVersion = store2.get('version');


    // if ((!version && appVersion && storeVersion && appVersion !== storeVersion) || (appVersion && !version && !storeVersion)) {
    //     store2.set('version', appVersion);
    //     emptyCacheStorage();
    // }

    React.useEffect(() => {
        if ((!storeVersion && version) || (version && storeVersion && version !== storeVersion)) {
            store2.set('version', version);
            emptyCacheStorage();
        }
    }, [storeVersion, version]);

    let routesProvider = React.useMemo(() => routeSwitcher(user, loggedIn), [user, loggedIn]);

    return (


        <Routes>
            <Route element={<React.Suspense fallback={<Spinner showHeight />}>
                <Layout pages={routesProvider.filter(_ => _.data && !_.data.route)} />
            </React.Suspense>}
            >
                {(routesProvider || []).map((route, i) => {
                    const { path, childRoutes = [], Component, index, pageName, data, name, exact, columns = {}, view, create, edit, recordName, upload, filters, chunk, aditionalName, category } = route;
                    const totalActions = {};
                    const names = {};
                    const boxActions = [];
                    const additionalActions = [];
                    const categories = {
                        ...(category && { categories: childRoutes } || {})
                    };

                    const LazyComp = chunk
                        ? lazy(() =>
                            Promise.all(
                                chunk.map((pages, i) => {
                                    if (!pages.page) {
                                        // If `pages.page` doesn't exist, return a promise that resolves to null or an empty function
                                        if (pages?.box) {
                                            // const box = [];
                                            // box.push({ [`actions`]: actions, columns: pages.columns, name: pages.name })
                                            // boxActions.push({ [pages.boxName]: box })
                                            boxActions.push({ [`actions`]: {}, columns: pages.columns, name: pages.name });
                                        } else if (pages?.additional) {
                                            additionalActions.push({ actions: {}, columns: pages.columns, name: pages.name });
                                            totalActions[`${pages.actionName}Actions`] = [...additionalActions];
                                        } else {
                                            totalActions[`${pages.actionName}Actions`] = {};
                                            names[`${pages.actionName}Actions`] = pages.name;
                                        }
                                        return Promise.resolve(null);
                                    }
                                    return import(`../redux/${pages.page}`).then((module) => {
                                        const mod = module.default;
                                        const { actions, reducer, saga } = mod(pages.name);
                                        if (pages?.box) {
                                            // const box = [];
                                            // box.push({ [`actions`]: actions, columns: pages.columns, name: pages.name })
                                            // boxActions.push({ [pages.boxName]: box })
                                            boxActions.push({ [`actions`]: actions, columns: pages.columns, name: pages.name });
                                        } else if (pages?.additional) {
                                            additionalActions.push({ actions: actions, columns: pages.columns, name: pages.name });
                                            totalActions[`${pages.actionName}Actions`] = [...additionalActions];
                                        } else {
                                            totalActions[`${pages.actionName}Actions`] = actions;
                                            names[`${pages.actionName}Actions`] = pages.name;
                                        }
                                        store.injectReducer(pages.name, reducer);
                                        store.injectSaga(pages.name, saga);
                                        // Return the imported Redux-related module, not the page module
                                        return module;
                                    })
                                })
                            ).then(() => import(`../pages/${pageName}`))
                        )
                        : lazy(() => import(`../pages/${pageName}`));


                    return (
                        <Route
                            key={i}
                            path={`${path}`}
                            exact={exact}
                            element={
                                <React.Suspense fallback={<Spinner showHeight />}>
                                    <LazyComp
                                        actions={totalActions}
                                        boxActions={boxActions}
                                        name={names}
                                        columns={columns}
                                        parentPath={path}
                                        view={view}
                                        create={create}
                                        edit={edit}
                                        upload={upload}
                                        filters={filters}
                                        {...categories}
                                        {...route}
                                    />
                                </React.Suspense>
                            } >

                            {(childRoutes || []).map((child, c) => {
                                const { childRoutes: additionalRoutes = [], pageName: childpageName, columns: childColumns = {}, chunk: childChunk, view: childView, create: childCreate, edit: childEdit, upload: childUpload, filters: childFilters } = child;

                                // const LazyComp = name ? lazy(() => import(`../redux/records`).then(module => {
                                //     const mod = module.default;
                                //     const { actions, reducer, saga } = mod(name);

                                //     store.injectReducer(name, reducer);
                                //     store.injectSaga(name, saga);
                                //     return import(`../pages/${childpageName}`);
                                // })) : lazy(() => import(`../pages/${childpageName}`));
                                const totalChildActions = {};
                                const namesChild = {};

                                const LazyComp = childChunk
                                    ? lazy(() =>
                                        Promise.all(
                                            childChunk.map((pages, i) =>
                                                import(`../redux/${pages.page}`).then((module) => {
                                                    const mod = module.default;
                                                    const { actions, reducer, saga } = mod(pages.name);
                                                    totalChildActions[`${pages.actionName}Actions`] = actions;
                                                    namesChild[`${pages.actionName}Actions`] = pages.name;
                                                    store.injectReducer(pages.name, reducer);
                                                    store.injectSaga(pages.name, saga);
                                                    return module;
                                                })
                                            )
                                        ).then(() => import(`../pages/${childpageName}`))
                                    )
                                    : lazy(() => import(`../pages/${childpageName}`));

                                return (
                                    <Route
                                        key={`${c}_${i}`}
                                        path={`${child.path}`}
                                        element={
                                            <React.Suspense fallback={<Spinner showHeight />}>
                                                <LazyComp
                                                    actions={totalChildActions}
                                                    name={namesChild}
                                                    columns={childColumns}
                                                    parentPath={path}
                                                    view={childView}
                                                    create={childCreate}
                                                    edit={childEdit}
                                                    upload={childUpload}
                                                    filters={childFilters}
                                                    {...child}
                                                />
                                            </React.Suspense>
                                        } >

                                        {additionalRoutes.map((additionalchild, d) => {
                                            const { childRoutes: additionalRoutes = [], pageName: additionalchildpageName, columns: additionalChildColumns = {} } = additionalchild;
                                            const LazyComp = name ? lazy(() => import(`../redux/records`).then(module => {
                                                const mod = module.default;
                                                const { actions, reducer, saga } = mod(name);

                                                store.injectReducer(name, reducer);
                                                store.injectSaga(name, saga);
                                                return import(`../pages/${additionalchildpageName}`);
                                            })) : lazy(() => import(`../pages/${additionalchildpageName}`));

                                            return <Route
                                                key={`${d}_${c}_${i}`}
                                                path={`${additionalchild.path}`}
                                                element={
                                                    <React.Suspense fallback={<Spinner showHeight />}>
                                                        <LazyComp
                                                            actions={Object.assign({}, { recordActions: name ? records(name).actions : {} })}
                                                            name={name}
                                                            columns={additionalChildColumns}
                                                            parentPath={path}
                                                        />
                                                    </React.Suspense>
                                                }
                                            />
                                        })}
                                    </Route>)
                            })}
                        </Route>)
                })}
                <Route path="*" element={<React.Suspense fallback={<Spinner showHeight />}>
                    <NotFound />
                </React.Suspense>} />
            </Route>
        </Routes>

    );
}
