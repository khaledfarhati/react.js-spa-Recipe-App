import React, { Component } from "react";
import Recipe from "../../components/Recipe/Recipe";
import Aux from "../../hoc/Auxi/Auxiliary";
import Modal from "../../components/Ui/Modal/Modal";
import EditRecipe from "../../components/Recipe/EditRecipe/EditRecipe";
import Sample from "../../Sample";
import classes from "./Recipes.css";
import RecipeData from "../CreateRecipe/RecipeData/RecipeData";
import Spinner from "../../components/Ui/Spinner/Spinner";
import axios from "axios";

import { faStar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-solid-svg-icons";

class Recipes extends Component {
  state = {
    recipes: {},
    editable: false,
    selectedRecipe: null,
    loading: false,
    recipekey: null,
    recipename: "",
    editRecipe: false,
    options: [
      { value: "meat", displayValue: "Meat" },
      { value: "baking", displayValue: "Baking" },
      { value: "condiments", displayValue: "Condiments" },
      { value: "drinks", displayValue: "Drinks" },
      { value: "produce", displayValue: "Produce" },
      { value: "misc", displayValue: "Misc" }
    ]
  };

  addToEdit = (e, index, name) => {
    e.preventDefault();

    this.setState({ recipekey: index, editable: true, recipename: name });
  };
  updatedRecipe = (key, updatedRecipe) => {
    const recipes = { ...this.state.recipes };
    recipes[key] = updatedRecipe;
    this.setState({ recipes });
  };
  editingCancelHandler = () => {
    this.setState({ editable: false });
  };

  shouldComponentUpdate(prevState) {
    return this.state.recipes !== prevState.recipes;
  }
  hydrateStateWithLocalstorage() {
    /*for(let key in this.state){

    }*/
    if (localStorage.hasOwnProperty("recipes")) {
      let recipes = localStorage.getItem("recipes");
      try {
        recipes = JSON.parse(recipes);
        this.setState({ recipes });
      } catch (e) {
        //handle empty string
        this.setState({ recipes });
      }
    }
  }
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://react-my-recipe-cf95f.firebaseio.com/recipes.json")
      .then(response =>
        this.setState({ recipes: response.data, loading: false })
      )
      .catch(error => this.setState({ loading: false }));
    this.hydrateStateWithLocalstorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalstorage.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalstorage.bind(this)
    );
    //saves if component haschance to unmount
    this.hydrateStateWithLocalstorage();
  }
  saveStateToLocalstorage() {
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
  }
  editRecipeHandler = () => {
    this.setState({ editRecipe: true });
  };
  clearInputHandler = (rcpkey, elm) => {
    const recipes = { ...this.state.recipes };
    recipes[rcpkey][elm] = "";
    this.setState({ recipes });
  };
  handleRemoveElement = (rcpkey, elm, key) => {
    const recipes = { ...this.state.recipes };
    recipes[rcpkey][elm].splice(key, 1);
    this.setState({ recipes });
  };
  render() {
    let editrecipe = null;
    editrecipe = (
      <EditRecipe
        recipes={this.state.recipes}
        updatedRecipe={this.updatedRecipe}
        recipekey={this.state.recipekey}
        options={this.state.options}
        recipename={this.state.recipename}
        editRecipeHandler={this.editRecipeHandler}
        editRecipe={this.state.editRecipe}
        modalClosed={this.editingCancelHandler}
        handleRemoveElement={this.handleRemoveElement}
        clearInputHandler={this.clearInputHandler}
      />
    );

    return (
      <Aux>
        <main className={classes.Recipes}>
          <section>
            <div className={classes.Background}>
              <div className={classes.Content}>
                <h1>Recipes</h1>
                <div className={classes.GroupTitle}>
                  <div className={classes.Ftitle}>
                    {Object.keys(this.state.recipes).length} recipes
                  </div>
                  <div className={classes.STitle}>published By khaled</div>
                </div>
              </div>
            </div>
          </section>
          <main className={classes.Parent}>
            <div>
              <section className={classes.Search}>
                <div>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={[classes.IconStar, "fa-1x"].join(" ")}
                  />
                  <input
                    type="text"
                    placeholder="search this recipe"
                    className={classes.InputSearch}
                  />
                </div>
              </section>
              <ul>
                {Object.keys(this.state.recipes).map(key => {
                  return (
                    <Recipe
                      key={key}
                      index={key}
                      details={this.state.recipes[key]}
                      addtoedit={this.addToEdit}
                    />
                  );
                })}
              </ul>
            </div>
            <footer
              style={{
                margin: "8px auto 12px 12px"
              }}
            >
              <FontAwesomeIcon
                icon={faLaugh}
                className={[classes.IconStar, "fa-1x"].join(" ")}
                style={{
                  marginRight: "5px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  width: "auto",
                  maxWidth: "10%"
                }}
              />
              <strong
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "5px",
                  width: "auto",
                  maxWidth: "20%"
                }}
              >
                ProTip!
              </strong>
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  width: "auto",
                  maxWidth: "70%"
                }}
              >
                select any recipe you want and you can edit also
              </span>
            </footer>
          </main>
        </main>
        <Modal
          show={this.state.editable}
          modalClosed={this.editingCancelHandler}
        >
          {editrecipe}
        </Modal>
      </Aux>
    );
  }
}
export default Recipes;
