import { ToastContainer } from 'react-toastify';
import {  BrowserRouter, Switch,Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path ="/" component={home} />
        <Route path="/addcontact" component={AddEdit}/>
        <Route path="/update/:id" component={AddEdit}/>
        <Route path="/view/:id" component={View}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
