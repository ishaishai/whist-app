import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllItems, makeOrder } from "../actions";
import Admin from "./Admin";
import Home from "./Home";
import Navbar from "./Navbar";
import Stats from "./Stats";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const dispatchOrder = () => {
    makeOrder(cartItems).then((res) => {
      setCartItems([]);
      console.log(res);
    });
  };

  const addToCart = (e, itemId) => {
    console.log(cartItems);
    let cartItemsCpy = [...cartItems];
    const indexInCart = cartItemsCpy.findIndex((item) => {
      if (item["_id"] === itemId) return true;
      else return false;
    });
    console.log(indexInCart);
    if (indexInCart > -1) {
      let itemExist = cartItemsCpy[indexInCart];
      itemExist.count++;
      cartItemsCpy[indexInCart] = itemExist;
      setCartItems(cartItemsCpy);
    } else {
      let itemToAdd = products.filter((item) => item["_id"] === itemId)[0];
      itemToAdd = {
        ...itemToAdd,
        count: 1,
      };
      setCartItems((prev) => [...prev, itemToAdd]);
    }

    console.log(cartItems);
  };

  useEffect(() => {
    getAllItems()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar cartItems={cartItems} dispatchOrder={dispatchOrder} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route
            path="/home"
            render={(props) => (
              <Home products={products} addToCart={addToCart} {...props} />
            )}
            exact
          />
          <Route
            path="/admin"
            exact
            render={(props) => <Admin products={products} {...props} />}
          />
          <Route path="/stats" exact component={Stats} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
