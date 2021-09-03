import UserForm from './Components/UserInputForm/UserForm';
import DynamicUserInfo from './Components/DynamicUserInfomation/DynamicUserInfo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { StoreProvider } from 'easy-peasy'
import store from './Easy-peasy/Store'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff1744'
    },
    secondary: {
      main: '#69f0ae'
    },
    error: {
      main: '#ff1744'
    }
  },
  spacing: 15 ,

})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <StoreProvider store={store}>
      <BrowserRouter basename="/userform-typescript/">
        <Switch>
          <Route exact path="/" component={UserForm}></Route>
          <Route exact path="/information/:userId" component={DynamicUserInfo} ></Route>
        </Switch>
      </BrowserRouter>
    </StoreProvider >
    </ThemeProvider>
  );
}

export default App;
