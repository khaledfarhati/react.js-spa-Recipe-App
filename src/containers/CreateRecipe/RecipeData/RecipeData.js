import React, { Component } from "react";
import Input from "../../../components/Ui/Input/Input";
import classes from "./RecipeData.css";
import Aux from "../../../hoc/Auxi/Auxiliary";
import IngredientBox from "../../../components/Ui/IngredientBox/IngredientBox";
import Stars from "../../../components/Ui/Stars/Stars";
import axios from "../../../axios-recipe";
import { storage } from "../../../base";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

class RecipeData extends Component {
  constructor(prop) {
    super(prop);
    this.i = 0;
    this.textareaInput = React.createRef();
  }
  state = {
    recipeform: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your recipe name"
        },
        label: "Name",
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      steps: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Your steps there"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      timers: {
        elementType: "input",
        elementConfig: {
          type: "time",
          placeholder: "Your timers"
        },
        label: "Timer",
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      comments: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        label: "Comment",
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      image: {
        elementType: "input",
        elementConfig: {
          type: "file",
          placeholder: "Your ingredient image"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      stars: {
        value: ""
      }
    },

    formIsValid: false,
    loading: false,
    ingredientBox: null,
    ingredient: {
      name: {
        elementName: "ingName",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      quantity: {
        elementName: "ingQuantity",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      type: {
        elementName: "ingType",
        elementType: "select",
        elementConfig: {
          options: [
            { value: "meat", displayValue: "Meat" },
            { value: "baking", displayValue: "Baking" },
            { value: "condiments", displayValue: "Condiments" },
            { value: "drinks", displayValue: "Drinks" },
            { value: "produce", displayValue: "Produce" },
            { value: "misc", displayValue: "Misc" }
          ]
        },
        value: "",
        validation: {},
        valid: true
      }
    },
    periods: 1,
    formIsValid: false,
    boxIngredient: true,
    uploading: false,
    progress: 0
  };

  handleAddIngredient = () => {
    const ingredient = { ...this.state.recipeform };
    const ing = { ...this.state.ingredient };
    ingredient[`ingredient ${this.i}`] = ing;

    this.setState({ recipeform: ingredient, boxIngredient: true });
    this.i += 1;
  };
  handleAddStep = () => {
    const recipeSteps = { ...this.state.recipeform };
    const steps = { ...this.state.recipeform["steps"] };
    recipeSteps[`steps${this.i}`] = steps;
    this.setState({ recipeform: recipeSteps });
    this.i += 1;
  };
  handleRemoveInput = id => {
    const recipeform = { ...this.state.recipeform };
    delete recipeform[id];
    this.setState({ recipeform });
  };

  addPeriodHandler = () => {
    this.setState(previousState => {
      return { periods: previousState.periods };
    });
  };
  clickHandler = () => {
    this.handleAddIngredient();
    this.addPeriodHandler();
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  };
  inputFormBoxChangeHandler = (
    event,
    identifierElement,
    identifierSubElement
  ) => {
    const ingredientUpdated = { ...this.state.recipeform };
    const updatedElements = {
      ...ingredientUpdated[identifierElement][identifierSubElement]
    };
    updatedElements.value = event.target.value;
    updatedElements.valid = this.checkValidity(
      updatedElements.value,
      updatedElements.validation
    );
    updatedElements.touched = true;
    ingredientUpdated[identifierElement][
      identifierSubElement
    ] = updatedElements;
    let formIsValid = true;

    for (let identifierSubElement in ingredientUpdated[identifierElement]) {
      formIsValid =
        ingredientUpdated[identifierElement][identifierSubElement].valid &&
        formIsValid;
    }

    this.setState({ recipeform: ingredientUpdated, formIsValid });
  };
  inputChangeHandler = (event, identifierElement) => {
    const stepsUpdated = { ...this.state.recipeform };
    const updatedElement = { ...stepsUpdated[identifierElement] };
    updatedElement.value = event.target.value;
    stepsUpdated[identifierElement] = updatedElement;
    this.setState({ recipeform: stepsUpdated });
  };
  inputStarsChangeHandler = event => {
    const starsUpdated = { ...this.state.recipeform };
    const updatedElement = { ...starsUpdated["stars"] };
    updatedElement.value = event.target.value;
    starsUpdated["stars"] = updatedElement;
    this.setState({ recipeform: starsUpdated });
  };
  addRecipeHandler = event => {
    event.preventDefault();
    const ingredientsData = Object.keys(this.state.recipeform)
      .filter(key => key.includes("ingredient"))
      .map(key => this.state.recipeform[key]);
    const stepsData = Object.keys(this.state.recipeform)
      .filter(key => key.includes("step"))
      .map(key => this.state.recipeform[key]);

    const formData = {};
    const recipeData = { ...this.state.recipeform };
    const recipeTransformedData = Object.keys(recipeData).reduce(
      (result, key) => {
        if (
          key.includes("name") ||
          key.includes("image") ||
          key.includes("stars") ||
          key.includes("timers") ||
          key.includes("comments")
        ) {
          result[key] = recipeData[key];
        }
        return result;
      },
      {}
    );
    for (let identifierElement in recipeTransformedData) {
      formData[identifierElement] =
        recipeTransformedData[identifierElement].value;
    }
    var ingredientArray = [];
    for (let ingredientItem of ingredientsData) {
      ingredientArray.push({
        quantity: ingredientItem.quantity.value,
        name: ingredientItem.name.value,
        type: ingredientItem.type.value
      });
    }
    const stepArray = [];
    for (let stepItem of stepsData) {
      stepArray.push({ step: stepItem.value });
    }
    formData["ingredients"] = ingredientArray;
    formData["steps"] = stepArray;

    axios
      .post("/recipes.json", formData)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  onchangeFileHandler = event => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
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
              const recipeform = { ...this.state.recipeform };
              recipeform["image"].value = url;
              this.setState({
                recipeform,
                uploading: false
              });
            });
        }
      );
    }
  };
  RemoveImage = () => {
    const recipeform = { ...this.state.recipeform };
    recipeform["image"].value = "";
    this.setState({ recipeform });
  };
  render() {
    const ingredientKey = Object.keys(this.state.recipeform).filter(key =>
      key.includes("ingredient")
    );
    const ingredientUpdated = Object.keys(this.state.recipeform).filter(key => {
      return this.state.recipeform[key.includes("ingredient")];
    });
    const ingredientRecipe = Object.keys(this.state.recipeform)
      .filter(key => ingredientKey.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.state.recipeform[key];
        return obj;
      }, {});

    const ingredientArray = [];

    for (let key in ingredientRecipe) {
      for (let innerKey in ingredientRecipe[key])
        ingredientArray.push({
          id: key,
          element: innerKey,
          config: ingredientRecipe[key][innerKey]
        });
    }
    const recipeSteps = Object.keys(this.state.recipeform).filter(key => {
      return key.includes("steps");
    });

    const stepsArray = [];

    for (let i = 0; i < recipeSteps.length; i++) {
      stepsArray.push({
        id: recipeSteps[i],
        config: this.state.recipeform[recipeSteps[i]]
      });
    }
    const imageArray = [
      { id: "image", config: this.state.recipeform["image"] }
    ];
    const timerArray = [
      { id: "timers", config: this.state.recipeform["timers"] }
    ];
    const commentArray = [
      { id: "comments", config: this.state.recipeform["comments"] }
    ];
    const nameArray = [{ id: "name", config: this.state.recipeform["name"] }];
    let ImagePreviewUrl = this.state.recipeform.image.value;
    let ImagePreview = null;
    if (ImagePreviewUrl !== null) {
      ImagePreview = (
        <div className={classes.UploadImg}>
          <div onClick={this.RemoveImage} className={classes.Delete}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ color: "#3c4858" }}
              size="2x"
            />
          </div>
          <img src={ImagePreviewUrl} />
        </div>
      );
    } else {
      ImagePreview = <div>Please select an Image for Preview</div>;
    }

    const imageContent = () => {
      switch (true) {
        case this.state.uploading:
          return (
            <div className={classes.Upload}>
              <Spinner />
            </div>
          );
        case this.state.recipeform["image"].value !== "":
          return (
            <Aux>
              <div onClick={this.RemoveImage} className={classes.Delete}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  style={{ color: "#3c4858" }}
                  size="2x"
                />
              </div>
              <div className={classes.Upload}>
                <img src={this.state.recipeform["image"].value} alt="" />
              </div>
            </Aux>
          );
        default:
          return (
            <div className={classes.Upload}>
              {imageArray.map(imageElement => (
                <Input
                  key={imageElement.id}
                  index={imageElement.id}
                  elementType={imageElement.config.elementType}
                  elementName={imageElement.config.elementName}
                  elementConfig={imageElement.config.elementConfig}
                  value={imageElement.config.value}
                  changed={event => this.onchangeFileHandler(event)}
                />
              ))}
            </div>
          );
      }
    };

    return (
      <main>
        <div className={classes.RecipeBlock}>
          <form onSubmit={this.addRecipeHandler}>
            <div className={classes.Recipe}>
              <div>
                <div className={classes.Row}>
                  <div
                    className={[
                      classes.GridChild,
                      classes.RecipeEachForm,
                      classes.Box
                    ].join(" ")}
                  >
                    {imageContent()}
                  </div>

                  <div
                    className={[
                      classes.GridChild,
                      classes.RecipeEachForm,
                      classes.Box
                    ].join(" ")}
                  >
                    <div className={classes.Group}>
                      {nameArray.map(nameElement => (
                        <Input
                          key={nameElement.id}
                          index={nameElement.id}
                          elementType={nameElement.config.elementType}
                          elementName={nameElement.config.elementName}
                          elementConfig={nameElement.config.elementConfig}
                          value={nameElement.config.value}
                          label={nameElement.config.label}
                          changed={event =>
                            this.inputChangeHandler(event, nameElement.id)
                          }
                        />
                      ))}
                    </div>
                    <div className={classes.Group}>
                      {timerArray.map(timerElement => (
                        <Input
                          key={timerElement.id}
                          index={timerElement.id}
                          elementType={timerElement.config.elementType}
                          elementName={timerElement.config.elementName}
                          elementConfig={timerElement.config.elementConfig}
                          value={timerElement.config.value}
                          label={timerElement.config.label}
                          changed={event =>
                            this.inputChangeHandler(event, timerElement.id)
                          }
                        />
                      ))}
                    </div>
                    <div className={classes.Group}>
                      {commentArray.map(commentElement => (
                        <Input
                          key={commentElement.id}
                          index={commentElement.id}
                          elementType={commentElement.config.elementType}
                          elementName={commentElement.config.elementName}
                          elementConfig={commentElement.config.elementConfig}
                          value={commentElement.config.value}
                          label={commentElement.config.label}
                          changed={event =>
                            this.inputChangeHandler(event, commentElement.id)
                          }
                        />
                      ))}
                    </div>
                    <div>
                      <h4>Ratings</h4>
                      <Stars changed={this.inputStarsChangeHandler} />
                    </div>
                  </div>
                </div>
                <div className={classes.Row}>
                  <div
                    className={[
                      classes.GridChild,
                      classes.RecipeEachForm,
                      classes.Box
                    ].join(" ")}
                  >
                    <div className={classes.Box}>
                      <h4> Ingredients</h4>

                      {ingredientKey.map(key => (
                        <IngredientBox
                          index={key}
                          key={key}
                          details={this.state.recipeform[key]}
                          removeIngredient={this.handleRemoveInput}
                          changed={this.inputFormBoxChangeHandler}
                          ingredient={this.state.recipeform}
                          changed={this.inputFormBoxChangeHandler}
                        />
                      ))}

                      <button
                        type="button"
                        onClick={this.handleAddIngredient}
                        disabled={
                          !this.state.formIsValid && this.state.ingredientBox
                        }
                        className={[classes.Btn, classes.Add].join(" ")}
                      >
                        Add Ingredient
                      </button>
                    </div>
                  </div>
                  <div
                    className={[
                      classes.GridChild,
                      classes.RecipeEachForm,
                      classes.Box
                    ].join(" ")}
                  >
                    <div className={classes.Steps}>
                      <h4>Steps</h4>
                      {stepsArray.map(stepElement => (
                        <div className={classes.Form} key={stepElement.id}>
                          <Input
                            key={stepElement.id}
                            index={stepElement.id}
                            elementType={stepElement.config.elementType}
                            elementName={stepElement.config.elementName}
                            elementConfig={stepElement.config.elementConfig}
                            value={stepElement.config.value}
                            changed={event =>
                              this.inputChangeHandler(event, stepElement.id)
                            }
                            //ref={this.textareaInput}
                          />

                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            style={{ color: "#3c4858", marginLeft: "10px" }}
                            size="1x"
                            onClick={() =>
                              this.handleRemoveInput(stepElement.id)
                            }
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        className={[classes.Btn, classes.Add].join(" ")}
                        onClick={this.handleAddStep}
                      >
                        Add Steps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <button
                  className={[classes.Btn, classes.Primary].join(" ")}
                  onClick={this.addRecipeHandler}
                  disabled={!this.state.formIsValid}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
export default RecipeData;
