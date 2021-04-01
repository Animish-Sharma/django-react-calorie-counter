import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from './containers/NotFoundPage';
import Items from "./containers/Items";
import ItemDetail from './containers/ItemDetail';
import List from './containers/List';
import './App.css';
import Register from './containers/Register';
const App=()=>{
  return(
    <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/items" component={Items}/>
          <Route exact path="/item/:slug" component={ItemDetail} />
          <Route exact path="/list" component={List}/>
          <Route path="/:id" component={NotFound}/>
        </Switch>
      </Layout>
    </Router>
  </Provider>
  );
}
export default App;
