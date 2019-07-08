import React from "react";
import classes from "./Recipe.css";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const recipe = props => {
  const { details, index } = props;
  console.log(index);
  const starsArray = Array.from({ length: 5 }, (v, i) => 1 * 1).fill(
    0,
    details.stars,
    5
  );

  return (
    <li className={classes.Recipe}>
      <a
        href="link"
        onClick={e => {
          props.addtoedit(e, index, details.name);
        }}
      >
        <div className={classes.RightIcon}>
          <div className={classes.TimeCp}>
            <FontAwesomeIcon
              icon={faClock}
              className={[classes.IconStar, "fa-1x"].join(" ")}
              style={{
                display: "inline-block",
                verticalAlign: "middle"
              }}
            />
            <span
              style={{
                marginLeft: "2px",
                display: "inline-block",
                verticalAlign: "middle"
              }}
            >
              15 Mins
            </span>
          </div>
          <div className={classes.StarsCp}>
            {starsArray.map((v, i) => (
              <FontAwesomeIcon
                icon={faStar}
                className={"fa-1x"}
                style={
                  v === 1
                    ? { color: "rgb(192, 204, 218)" }
                    : { color: "#777777" }
                }
              />
            ))}
          </div>
        </div>
        <h3>{details.name}</h3>
        <p>{details.comments}</p>
      </a>
    </li>
  );
};
export default recipe;
