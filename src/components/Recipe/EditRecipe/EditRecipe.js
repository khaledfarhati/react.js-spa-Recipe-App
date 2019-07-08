import React, { Component } from "react";
import classes from "./EditRecipe.css";
import Aux from "../../../hoc/Auxi/Auxiliary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import Stars from "../../Ui/Stars/Stars";
const ingrElm = "ingredients";
const stpElm = "steps";
class EditRecipe extends Component {
  state = {
    IsInEditMode: true
  };
  handleChange = e => {
    //const recipe = this.props.recipes[key];
    console.log(e.currentTarget.name);
    const recipe = { ...this.props.recipes[this.props.recipekey] };

    const updatedRecipe = {
      ...recipe,
      [e.currentTarget.name]: e.currentTarget.value
    };
    console.log(updatedRecipe);
    this.props.updatedRecipe(this.props.recipekey, updatedRecipe);
  };
  handleChangeInputForm = (e, identifierElm, key) => {
    const recipe = { ...this.props.recipes[this.props.recipekey] };
    console.log(recipe[key]);
    const updatedElm = {
      ...recipe[identifierElm][key],
      [e.currentTarget.name]: e.currentTarget.value
    };

    const updatedRecipe = { ...recipe };
    updatedRecipe[identifierElm][key] = updatedElm;
    this.props.updatedRecipe(this.props.recipekey, updatedRecipe);
  };

  render() {
    const recipe = { ...this.props.recipes[this.props.recipekey] };

    const starsArray = Array.from({ length: 5 }, (v, i) => 1 * 1).fill(
      0,
      recipe.stars,
      5
    );

    const imageContent = () => {
      switch (true) {
        case recipe.image !== null:
          return (
            <div className={classes.Upload}>
              <img src={recipe.image} alt="" />
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ color: "#3c4858" }}
                size="2x"
                className={classes.Delete}
              />
            </div>
          );
        default:
          return (
            <div className={classes.Upload}>
              <input type="file" name="image" onChange={this.handleChange} />
            </div>
          );
      }
    };
    let EditRecipe = null;
    if (this.props.recipekey !== null) {
      EditRecipe = (
        <div className={classes.RecipeBlock}>
          <div className={classes.Recipe}>
            <h2>{this.props.recipename + " Recipe"}</h2>
            <hr />
            <div className={classes.Row}>
              <div
                className={[classes.RowChild, classes.RecipeEachForm].join(" ")}
              >
                {imageContent()}
              </div>
              <div
                className={[classes.RowChild, classes.RecipeEachForm].join(" ")}
              >
                <div className={classes.Group}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Recipe Name"
                    value={recipe.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={classes.Group}>
                  <label>Timer</label>
                  <input
                    type="text"
                    name="timers"
                    placeholder="Timers"
                    value={recipe.timers}
                    onChange={this.handleChange}
                  />
                </div>

                <div className={classes.Group}>
                  <label>Comment</label>
                  <textarea
                    value={recipe.comments}
                    name="comments"
                    placeholder="Comments"
                    onChange={this.handleChange}
                  />
                </div>
                <div className={classes.Group}>
                  <label>Ratings</label>
                  <div className={classes.Stars}>
                    {this.state.IsInEditMode ? (
                      <Stars changed={this.handleChange} />
                    ) : (
                      <Aux>
                        {starsArray.map((v, i) => (
                          <FontAwesomeIcon
                            icon={faStar}
                            style={
                              v === 1
                                ? { color: "#cccccc" }
                                : { color: "#777777" }
                            }
                            size="1x"
                          />
                        ))}
                      </Aux>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.Row}>
              <div
                className={[classes.RowChild, classes.RecipeEachForm].join(" ")}
              >
                <h3> Ingredients</h3>
                {Object.keys(recipe.ingredients).map(key => (
                  <div className={classes.Form} key={key}>
                    <input
                      key={key}
                      type="text"
                      value={recipe.ingredients[key].name}
                      name="name"
                      placeholder="Name"
                      onChange={e =>
                        this.handleChangeInputForm(e, ingrElm, key)
                      }
                    />
                    <input
                      key={key}
                      type="text"
                      className={classes.Quantity}
                      value={recipe.ingredients[key].quantity}
                      name="quantity"
                      placeholder="Quantity"
                      onChange={e =>
                        this.handleChangeInputForm(e, ingrElm, key)
                      }
                    />
                    <select
                      key={key}
                      value={recipe.ingredients[key].type}
                      name="type"
                      className={classes.Type}
                      onChange={e =>
                        this.handleChangeInputForm(e, ingrElm, key)
                      }
                    >
                      {this.props.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.displayValue}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "#3c4858" }}
                      size="1x"
                    />
                  </div>
                ))}
              </div>
              <div
                className={[classes.RowChild, classes.RecipeEachForm].join(" ")}
              >
                <h3>Steps</h3>

                {Object.keys(recipe.steps).map(key => (
                  <div className={classes.Form}>
                    <textarea
                      name="step"
                      value={recipe.steps[key].step}
                      placeholder="Step"
                      onChange={e => this.handleChangeInputForm(e, stpElm, key)}
                    />
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "#3c4858" }}
                      size="1x"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <Aux>{EditRecipe}</Aux>;
  }
}
export default EditRecipe;
