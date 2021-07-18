import {
  Item,
  Button,
  Segment,
  Icon,
  Image,
  Dropdown,
  DropdownItem,
  Label,
  Divider,
} from "semantic-ui-react";
import { useEffect, useState } from "react";

const ShoppingCart = ({ cartItems, dispatchOrder }) => {
  let totalsum = 0;
  console.log(cartItems);
  return (
    <Dropdown
      className={`cart ${cartItems.length > 0 ? "show" : "hide"}`}
      item
      text="Shopping Cart"
    >
      <Dropdown.Menu>
        {cartItems.map((item, i) => {
          totalsum += item.price * item.count;
          return (<>
            <DropdownItem key={i}>
              <div className="cart-item">
                <Image size="tiny" src={item.image} />
                <div className="content">
                  <div className="header">{item.title}</div>
                  <div className="price">
                    <Icon name="dollar" />
                    {item.price} X {item.count}
                  </div>
                </div>
              </div>
              
            </DropdownItem>{i<cartItems.length-1 && <Divider/>}</>
          );
        })}
        <Label size="large">Total: ${totalsum}</Label>
        <Button color="green" onClick={dispatchOrder}>
          Pay
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ShoppingCart;
