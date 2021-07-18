import { Modal, Table, Input, TextArea, Button } from "semantic-ui-react";
import { useState } from "react";
import { editProduct } from "../../actions";

const EditModal = ({ item, setItemToEdit, setItems }) => {
  const [title, setTitle] = useState(item.title);
  const [image, setImage] = useState(item.image);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);

  const handleEdit = () => {
    const updatedItem = {
      _id: item["_id"],
      title: title,
      image: image,
      description: description,
      price: Number.parseInt(price),
    };
    editProduct({ id: item, updatedItem });
    //  editProduct({item["_id"],title,image,description,price});
    console.log(updatedItem);
    setItems((prev) => {
      const prevList = [...prev];
      prevList.forEach((element, i) => {
        if (element["_id"] === item["_id"]) {
          prevList[i] = updatedItem;
        }
      });
      console.log(prevList);
      return prevList;
      // ...[...prev].filter((prevItem) => prevItem["_id"] !== item["_id"]),
      // updatedItem,
    });
    setItemToEdit(null);
    //  setOpen(false);
  };
  return (
    <Modal
      onClose={() => {
        setItemToEdit(null);
      }}
      open={true}
    >
      <Modal.Header>Edit a product</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title </Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Price (USD)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row key={item["_id"]}>
                <Table.Cell>
                  <Input
                    focus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    focus
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextArea
                    focus
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Input
                    focus
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setItemToEdit(null);
            // setOpen(false);
          }}
        >
          Close
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleEdit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditModal;
