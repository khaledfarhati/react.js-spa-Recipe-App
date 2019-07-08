import React from "react";
import classes from "./Input.css";
import Aux from "../../../hoc/Auxi/Auxiliary";
const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  if (props.elementName === "name") {
    inputClasses.push(classes.InputName);
  }
  if (props.elementName === "ingQuantity") {
    inputClasses.push(classes.Quantity);
  }
  if (props.elementName === "ingType") {
    inputClasses.push(classes.Type);
  }
  if (props.elementConfig.type === "file") {
    inputClasses.length = 0;
    console.log(inputClasses);
  }
  switch (props.elementType) {
    case "input":
      /*case "name":*/

      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  console.log(inputElement);
  return (
    //<div className={classes.Input}>
    <Aux className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </Aux>
    //</div>
  );
};
export default input;
