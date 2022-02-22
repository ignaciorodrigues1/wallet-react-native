import React, { useState } from "react";

import AuthNavigator from "./AuthNavigator";
import BreadNavigator from "./BreadNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default () => {
  const loggedIn = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      {loggedIn ? <BreadNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
