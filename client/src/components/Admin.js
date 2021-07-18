import { useEffect, useState } from "react";
import { deleteProduct, getAllItems } from "../actions";
import { Table, Button, Modal, Header, Image } from "semantic-ui-react";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";

const Admin = () => {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [toggleAdd, setToggleAdd] = useState(false);

  useEffect(async () => {
    const items = await getAllItems();
    setItems(items);
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);
  const handleDelete = (e) => {
    deleteProduct(e).then((res) => {
      setItems(items.filter((item) => item["_id"] !== e));
    }).catch((error)=>console.log("FAILED TO REMOVE ITEM"));
  };

  const handleEdit = async (e) => {
    setItemToEdit(items.filter((item) => item["_id"] === e)[0]);
  };

  return (
    <div className="Admin">
      {toggleAdd && (
        <AddModal setToggleAdd={setToggleAdd} setItems={setItems} />
      )}
      {itemToEdit && (
        <EditModal
          setItems={setItems}
          item={itemToEdit}
          setItemToEdit={setItemToEdit}
        />
      )}
      <Button floated="right" primary onClick={() => setToggleAdd(true)}>
        Add Product
      </Button>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title </Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price (USD)</Table.HeaderCell>
            <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => {
            return (
              <Table.Row key={item["_id"]}>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>
                  <img src={item.image} width="50px" height="50px" />
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>
                  <Button color="blue" onClick={() => handleEdit(item["_id"])}>
                    Edit
                  </Button>
                  <Button color="red" onClick={() => handleDelete(item["_id"])}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Admin;
