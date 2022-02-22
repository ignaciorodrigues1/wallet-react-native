import AppLoading from "expo-app-loading";
import MainNavigator from "./navigation";
import { Provider } from "react-redux";
import React from "react";
import { init } from "./db";
import store from "./stores";
import { useFonts } from "expo-font";

init()
  .then(() => console.log("Database initialized"))
  .catch((err) => {
    console.log("Database failed to connect");
    console.log(err.message);
  });

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Exo2-Black": require("./assets/fonts/Exo2-Black.ttf"),
    "Exo2-Bold": require("./assets/fonts/Exo2-Bold.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
