import React, { Fragment, Component } from "react";
import classes from "./Stars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const getItems = count => {
  return Array.from({ length: count }, (v, i) => (i + 1) * 1).map(k => {
    let deci = k;
    return {
      integer: `${k}`,
      deci: `${deci}`,
      vol: `vol${k}`,
      level: `Volume Level ${k}/100`,
      checked: true
    };
  }); // END MAP
}; // END ARROW

class Stars extends Component {
  state = {
    starList: getItems(5)
  };
  handleOnClick = index => {
    const starList = [...this.state.starList];

    for (let i = 0; i <= index; i++) {
      starList[i].checked = true;
    }
    for (let i = index + 1; i < 5; i++) {
      starList[i].checked = null;
    }
    this.setState({ starList });
  };
  render() {
    return (
      <div>
        {this.state.starList.map((item, index) => (
          <Fragment key={item.integer}>
            <input
              onClick={() => {
                this.handleOnClick(index);
              }}
              onChange={this.props.changed}
              type="radio"
              name="stars"
              value={item.deci}
              id={item.vol}
              className={classes.Sr}
            />
            <label
              htmlFor={item.vol}
              style={item.checked ? { color: "#cccccc" } : { color: "#777777" }}
              className={classes.Label}
            >
              <FontAwesomeIcon icon={faStar} size="1x" />
            </label>
          </Fragment>
        ))}
      </div>
    );
  }
}
export default Stars;
