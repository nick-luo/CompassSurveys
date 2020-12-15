import React from "react";
import { Route, Switch } from "react-router";
import { HomeView } from "./views/Home";
import { SurveyView } from "./views/Survey";
import { Container } from "react-bootstrap";

import "./custom.css";

export const App = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/survey/:id" component={SurveyView} />
      </Switch>
    </Container>
  );
};
