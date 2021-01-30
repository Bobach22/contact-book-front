import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { DotsLoader } from "./components/DotsLoader";
import Layout from "./containers/Layout/Layout";
import { CONTACTS } from "./settings/constants";

const Contacts = lazy(() => import("./containers/Contacts/Contacts"));

const Routes = () => {
  return (
    <Suspense fallback={<DotsLoader loading={true} size={20}/>}>
      <Switch>
        <Route exact={true} path={CONTACTS}>
          <Layout>
            <Suspense fallback={<DotsLoader loading={true}  size={20}/>}>
              <Contacts />
            </Suspense>
          </Layout>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
