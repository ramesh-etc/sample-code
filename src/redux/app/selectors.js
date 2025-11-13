import { createSelector } from "@reduxjs/toolkit";

export const selectSession = () => (state) => state ? state.authentication : Map();

export const selectRouter = () => (state) => state ? state.router : Map();

export const selectLoggedIn = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.loggedIn || false,
);

export const selectToken = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.secret || false,
);

export const selectUser = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.user || {},
);

export const selectVersion = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.user && { version: sessionState.user.version || false } || {},
);

export const selectActiveSession = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.activeSession,
);

export const selectError = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.error || {},
);

export const selectSuccess = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.success || {},
);

export const selectSessionExpand = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.expand || false,
);

export const selectLocation = () => createSelector(
    selectRouter(),
    (routerState) => routerState && routerState.location || {},
);

export const selectTimeout = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.timeout || false,
);

export const selectPayment = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.payment || {},
);

export const selectLoading = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.loading || false,
);

export const selectMetaData = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.metaData || {},
);

export const selectAppVersion = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.appVersion || false,
);

export const selectsignupUserData = () => createSelector(
    selectSession(),
    (sessionState) => sessionState && sessionState.signupdata || {}
);

export default {
    selectSession,
    selectToken,
    selectLoggedIn,
    selectUser,
    selectVersion,
    selectActiveSession,
    selectError,
    selectSuccess,
    selectSessionExpand,
    selectLocation,
    selectTimeout,
    selectPayment,
    selectLoading,
    selectMetaData,
    selectAppVersion,
    selectsignupUserData
};
