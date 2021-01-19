import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthContext from './contexts/AuthContext';
import AddCategory from './pages/AddCategory';
import AddItem from './pages/AddItem';
import Admin from './pages/Admin';

import Home from './pages/Home'
import Login from './pages/Login'
import UpdateCategory from './pages/UpdateCategory';
import UpdateItem from './pages/UpdateItem';

const Routes: React.FC = () => {

  const auth = useContext(AuthContext)

  if(!auth.signed){
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/addCategory" component={AddCategory} />
        <Route path="/addItem" component={AddItem} />
        <Route path="/updateCategory/:id" component={UpdateCategory} />
        <Route path="/updateItem/:id" component={UpdateItem} />
        <Route path="/"  component={Admin}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;