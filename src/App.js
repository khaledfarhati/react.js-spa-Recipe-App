import React, { Component } from "react";
import Recipes from "./containers/Recipes/Recipes";
import CreateRecipe from "./containers/CreateRecipe/CreateRecipe";
import Layout from "../src/hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Recipes} />
          <Route path="/createRecipe" component={CreateRecipe} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
