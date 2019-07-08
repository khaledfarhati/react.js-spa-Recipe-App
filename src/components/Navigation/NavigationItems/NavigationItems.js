import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Recipes
    </NavigationItem>
    <NavigationItem link="/createRecipe">Create Recipe</NavigationItem>
  </ul>
);

export default navigationItems;
