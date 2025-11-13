import React from "react";
import MUITheme from "./muiTheme";
import CustomRoute from "./routes";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
// import history from "./utils/history";
import { history } from './redux/store';

export default function App() {

  return <MUITheme>
    <HistoryRouter history={history}>
      <CustomRoute />
    </HistoryRouter>
  </MUITheme>
}
