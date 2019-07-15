import React, { Component } from "react";
import classes from "./IngredientBox.css";
import Aux from "../../../hoc/Auxi/Auxiliary";
import Input from "../Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

class IngredientBox extends Component {
  render() {
    const { index, details } = this.props;
    const [name, quantity, type] = [...Object.keys(details)];

    return (
      <div className={classes.Form}>
        <Input
          key={details.name.elementName + index}
          elementName={details.name.elementName}
          elementType={details.name.elementType}
          elementConfig={details.name.elementConfig}
          value={details.name.value}
          changed={event => this.props.changed(event, index, name)}
          invalid={!details.name.valid}
          shouldValidate={details.quantity.validation}
          touched={details.quantity.touched}
        />

        <Input
          key={details.quantity.elementName + index}
          elementName={details.quantity.elementName}
          elementType={details.quantity.elementType}
          elementConfig={details.quantity.elementConfig}
          value={details.quantity.value}
          changed={event => this.props.changed(event, index, quantity)}
          invalid={!details.quantity.valid}
          shouldValidate={details.quantity.validation}
          touched={details.quantity.touched}
        />
        <Input
          key={details.type.elementName + index}
          elementName={details.type.elementName}
          elementType={details.type.elementType}
          elementConfig={details.type.elementConfig}
          value={details.type.value}
          changed={event => this.props.changed(event, index, type)}
          shouldValidate={details.quantity.validation}
          touched={details.quantity.touched}
        />

        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ color: "#3c4858", marginLeft: "10px" }}
          size="1x"
          onClick={() => this.props.removeIngredient(index)}
        
        />
      </div>
    );
  }
}

export default IngredientBox;
