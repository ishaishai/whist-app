import {
  Modal,
  Header,
  Image,
  Button,
  TextArea,
  Table,
  Input,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { addProduct } from "../../actions";

const AddModal = ({ setItems, setToggleAdd }) => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);

  const handleAdd = () => {
    const newItem = { title, price, image, description };

    addProduct(newItem).then((product) => {
      setItems((prev) => [...prev, newItem]);
    });
    setToggleAdd(false);
  };

  return (
    <Modal
      onClose={() => {
        setToggleAdd(false);
      }}
      open={true}
    >
      <Modal.Header>Add a product</Modal.Header>
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
              <Table.Row>
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
            setToggleAdd(false);
            // setOpen(false);
          }}
        >
          Close
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleAdd()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddModal;
