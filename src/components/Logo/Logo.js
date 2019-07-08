import React from "react";
import classes from "./Logo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
const logo = props => (
  <div className={classes.Logo}>
    <FontAwesomeIcon icon={faUtensils} style={{ color: "#ff4527" }} size="2x" />
  </div>
);
export default logo;
