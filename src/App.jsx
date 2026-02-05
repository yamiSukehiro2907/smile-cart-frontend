import { Route, Switch, Redirect } from "react-router-dom";

// import Home from "./components/Home";
import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import routes from "./route";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Redirect exact from={routes.root} to={routes.products} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);
export default App;
