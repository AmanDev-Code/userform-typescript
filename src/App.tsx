
import UserForm from './Components/UserInputForm/UserForm';
import DynamicUserInfo from './Components/DynamicUserInfomation/DynamicUserInfo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { StoreProvider } from 'easy-peasy'
import store from './Easy-peasy/Store'


function App() {
  return (
    <StoreProvider store={store}>
      
            <BrowserRouter basename="/userform-typescript/">
              <Switch>
                <Route exact path="/" component={UserForm}></Route>
                <Route exact path="/information/:userId" component={DynamicUserInfo} ></Route>
              </Switch>
            </BrowserRouter>
          
    </StoreProvider >
  );
}

export default App;
