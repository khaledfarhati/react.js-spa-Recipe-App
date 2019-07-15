import React, { Component } from "react";
import classes from "./EditRecipe.css";
import Aux from "../../../hoc/Auxi/Auxiliary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import axios from "../../../axios-recipe";
import { storage } from "../../../base";
import Stars from "../../Ui/Stars/Stars";
import Spinner from "../../Ui/Spinner/Spinner";
const ingrElm = "ingredients";
const stpElm = "steps";
class EditRecipe extends Component {
  state = {
    IsInEditMode: true,
    uploading: false,
    progress: 0
  };

  handleChange = e => {
    this.props.editRecipeHandler();
    const recipe = { ...this.props.recipes[this.props.recipekey] };
    const updatedRecipe = {
      ...recipe,
      [e.currentTarget.name]: e.currentTarget.value
    };
    console.log(updatedRecipe);
    this.props.updatedRecipe(this.props.recipekey, updatedRecipe);
  };
  handleChangeInputForm = (e, identifierElm, key) => {
    this.props.editRecipeHandler();
    const recipe = { ...this.state.editRecipe[this.props.recipekey] };
    const updatedElm = {
      ...recipe[identifierElm][key],
      [e.currentTarget.name]: e.currentTarget.value
    };

    const updatedRecipe = { ...recipe };
    updatedRecipe[identifierElm][key] = updatedElm;
    this.props.updatedRecipe(this.props.recipekey, updatedRecipe);
  };
  onchangeFileHandler = event => {
    this.props.editRecipeHandler();
    const { recipes, recipekey } = this.props;
    const recipe = { ...recipes[recipekey] };
    if (event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file.name);
      this.setState({
        uploading: true
      });
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....

          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(url => {
              recipe.image = url;
              this.setState({
                uploading: false
              });
            });
          this.props.updatedRecipe(this.props.recipekey, recipe);
        }
      );
    }
  };
  updateOnRecipe = async e => {
    e.preventDefault();
    const { recipekey, recipes } = this.props;
    // const { editRecipe } = this.state;
    await axios
      .put(`/recipes/${recipekey}.json`, recipes[recipekey])
      .then(response => {
        this.props.modalClosed();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { recipekey, recipes } = this.props;

    const recipe = { ...recipes[recipekey] };

    const starsArray = Array.from({ length: 5 }, (v, i) => 1 * 1).fill(
      0,
      recipe.stars,
      5
    );

    const imageContent = () => {
      switch (true) {
        case this.state.uploading:
          return (
            <div className={classes.Upload}>
              <Spinner />
            </div>
          );
        case recipe.image !== "":
          return (
            <div className={classes.Upload}>
              <img src={recipe.image} alt="" />
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ color: "#3c4858" }}
                size="2x"
                className={classes.Delete}
                onClick={() => {
                  this.props.clearInputHandler(recipekey, "image");
                }}
              />
            </div>
          );
        default:
          return (
            <div className={classes.Upload}>
              <input
                type="file"
                name="image"
                onChange={e => this.onchangeFileHandler(e)}
              />
            </div>
          );
      }
    };
    let EditRecipe = null;
    if (this.props.recipekey !== null) {
      EditRecipe = (
        <div className={classes.RecipeBlock}>
          <form onSubmit={this.updateOnRecipe}>
            <div className={classes.Recipe}>
              <div className={classes.GridParent}>
                <div
                  className={[classes.HeadingSection, classes.GridChild].join(
                    " "
                  )}
                >
                  <h2>{this.props.recipename + " Recipe"}</h2>
                </div>

                <div className={[classes.BtnCntrlBlock].join(" ")}>
                  <button
                    className={[classes.Btn, classes.Primary].join(" ")}
                    disabled={!this.props.editRecipe}
                    onClick={this.updateOnRecipe}
                  >
                    Update
                  </button>
                  <button
                    className={[classes.Btn, classes.Danger].join(" ")}
                    onClick={this.props.modalClosed}
                  >
                    Cancel
                  </button>
                </div>
                <hr />
              </div>
              <div className={classes.Row}>
                <div
                  className={[classes.RowChild, classes.RecipeEachForm].join(
                    " "
                  )}
                >
                  {imageContent()}
                </div>
                <div
                  className={[classes.RowChild, classes.RecipeEachForm].join(
                    " "
                  )}
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
                  className={[classes.RowChild, classes.RecipeEachForm].join(
                    " "
                  )}
                >
                  <h3> Ingredients</h3>
                  {Object.keys(recipe.ingredients).map(key => (
                    <div className={classes.Form} key={`ingr${key}`}>
                      <input
                        key={`name${key}`}
                        type="text"
                        value={recipe.ingredients[key].name}
                        name="name"
                        placeholder="Name"
                        onChange={e =>
                          this.handleChangeInputForm(e, ingrElm, key)
                        }
                      />
                      <input
                        key={`quantity${key}`}
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
                        key={`type${key}`}
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
                        onClick={() => {
                          this.props.handleRemoveElement(
                            recipekey,
                            "ingredients",
                            key
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className={[classes.RowChild, classes.RecipeEachForm].join(
                    " "
                  )}
                >
                  <h3>Steps</h3>

                  {Object.keys(recipe.steps).map(key => (
                    <div className={classes.Form} key={key}>
                      <textarea
                        key={`texterea${key}`}
                        name="step"
                        value={recipe.steps[key].step}
                        placeholder="Step"
                        onChange={e =>
                          this.handleChangeInputForm(e, stpElm, key)
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        style={{ color: "#3c4858" }}
                        size="1x"
                        onClick={() => {
                          this.props.handleRemoveElement(
                            recipekey,
                            "steps",
                            key
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }

    return <Aux>{EditRecipe}</Aux>;
  }
}
export default EditRecipe;
