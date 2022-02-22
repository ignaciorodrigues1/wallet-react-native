import Address from "../screens/Address";
import Checkout from "../screens/Checkout";
import Deposit from "../screens/Deposit";
import Home from "../screens/Home";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import Notifications from "../screens/Notifications";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import React from "react";
import Sell from "../screens/Sell";
import Tabs from "../components/tabs";
import Withdraw from "../screens/Withdraw";
import { createStackNavigator } from "@react-navigation/stack";

const BreadStack = createStackNavigator();

const BreadNavigator = () => (
  <BreadStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={"MainLayout"}
  >
    <BreadStack.Screen name="MainLayout" component={Tabs} />
    <BreadStack.Screen name="Home" component={Home} />
    <BreadStack.Screen name="Withdraw" component={Withdraw} />
    <BreadStack.Screen name="Checkout" component={Checkout} />
    <BreadStack.Screen name="Sell" component={Sell} />
    <BreadStack.Screen name="Deposit" component={Deposit} />
    <BreadStack.Screen name="Notifications" component={Notifications} />
    <BreadStack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
    <BreadStack.Screen name="NuevaDireccion" component={NewPlaceScreen} />
    <BreadStack.Screen name="Map" component={MapScreen} />
    <BreadStack.Screen name="Direcciones" component={Address} />
  </BreadStack.Navigator>
);

export default BreadNavigator;
