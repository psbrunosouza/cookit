import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ingredientReducer from "./src/reducer/ingredientReducer";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./src/navigation/MainNavigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2CAC60",
    accent: "#2CAC60",
  },
};

const store = createStore(ingredientReducer);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
