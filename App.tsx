import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers} from "redux";
import ingredientReducer from "./src/reducer/ingredientReducer";
import recipeReducer from './src/reducer/recipeReducer';
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

const allReducers = combineReducers({
    ingredientReducer,
    recipeReducer
 });

export const store = createStore(allReducers);
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
