import { Menu, Dropdown } from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
const Navbar = ({ cartItems, dispatchOrder }) => {
  const [activeItem, setActiveItem] = useState(window.location.pathname);

  const handleItemClick = (e) => {
    setActiveItem((e.target.innerHTML).toLowerCase());
  };
  return (
    <Menu className="navbar">
      <Menu.Item header>Whist</Menu.Item>
      <Menu.Item
        as={Link}
        to="/home"
        name="Home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={Link}
        to="/admin"
        name="/admin"
        active={activeItem === "admin"}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={Link}
        to="/stats"
        name="/stats"
        active={activeItem === "stats"}
        onClick={handleItemClick}
      />
      <ShoppingCart cartItems={cartItems} dispatchOrder={dispatchOrder} />
    </Menu>
  );
};
export default Navbar;
