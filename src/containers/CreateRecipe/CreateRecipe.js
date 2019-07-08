import React, { Component } from "react";
import { Route } from "react-router-dom";
import classes from "./RecipeData/RecipeData.css";
import Aux from "../../hoc/Auxi/Auxiliary";
import RecipeData from "./RecipeData/RecipeData";
class CreateRecipe extends Component {
  CreateCancelledHandler = () => {
    this.props.history.goBack();
  };
  CreateContinuedHandler = () => {
    this.props.history.replace("/createRecipe/recipe-data");
  };
  render() {
    return (
      <Aux>
        <section className={classes.HeaderSection}>
          <div className={classes.FullContainer}>
            <div className={classes.GridParent}>
              <div
                className={[classes.HeadingSection, classes.GridChild].join(
                  " "
                )}
              >
                <h2 style={{ margin: "0" }}>Create Recipe</h2>
              </div>
              <div
                className={[classes.BtnCntrlBlock, classes.GridChild].join(" ")}
              >
                <button
                  className={[classes.Btn, classes.Primary].join(" ")}
                  onClick={this.CreateContinuedHandler}
                >
                  Continue
                </button>
                <button
                  className={[classes.Btn, classes.Danger].join(" ")}
                  onClick={this.CreateCancelledHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
        <Route
          path={this.props.match.path + "/recipe-data"}
          component={RecipeData}
        />
      </Aux>
    );
  }
}
export default CreateRecipe;
