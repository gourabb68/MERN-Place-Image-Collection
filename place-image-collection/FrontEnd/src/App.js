import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlaces';
import Auth from './user/pages/Auth'
import {AuthContext} from './shared/components/context/auth-context'


const App=()=> {
const [isLoggedIn, setIsLoggedIn] =useState(false);
const login = useCallback (()=>{
   setIsLoggedIn(true);

},[])
const logout = useCallback (()=>{
   setIsLoggedIn(false);
   
},[])

let routes;
if(isLoggedIn){
  routes= (
    <Switch>
    <Route path='/' exact>
    <Users />
  </Route>
   <Route path='/:userId/places' exact>
   <UserPlaces />
 </Route>
 <Route path='/place/new' exact>
      <NewPlace />
    </Route>
    <Route path='/places/:placeId' exact>
      <UpdatePlace />
    </Route>
      <Redirect to ='/' />
 </Switch>
  );
}else {
  routes =(
<Switch>
    <Route path='/' exact>
    <Users />
  </Route>
   <Route path='/:userId/places' exact>
   <UserPlaces />
 </Route>
 <Route path='/auth'>
      <Auth />
      </Route>
      <Redirect to ='/auth' />
 </Switch>
  );
}
  return (
    <AuthContext.Provider value=
    {{isLoggedIn: isLoggedIn,login: login, logout: logout}}>
  <Router>
    <MainNavigation />
    <main>
    {/* <Switch> */}
    {/* <Route path='/' exact>
      <Users />
    </Route>
    <Route path='/:userId/places' exact>
      <UserPlaces />
    </Route>
  
    <Route path='/place/new' exact>
      <NewPlace />
    </Route>
    <Route path='/places/:placeId' exact>
      <UpdatePlace />
    </Route>
    <Route path='/auth'>
      <Auth />
    </Route>
    <Redirect to ='/' /> */

    }
       {routes}
    {/* </Switch> */}
    </main>
  </Router>
  </AuthContext.Provider>
    
  )

}

export default App;
