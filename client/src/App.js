import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CountryDetails from './components/CountryDetails/CountryDetails';
import CreateActivity from './components/ActivityForm/CreateActivity';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component= {Landing}/>
        <Route exact path ='/home' component= {Home}/>  
        <Route exact path ='/countries/:id' component= {CountryDetails}/>
        <Route exact path ='/postActivity' component= {CreateActivity}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
