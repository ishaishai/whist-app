import {
  Grid,
  Image,
  Card,
  Icon,
  Button,
} from "semantic-ui-react";

const Home = ({ products, addToCart }) => {
  return (
    <div className="Home">
      <Grid relaxed columns={3} className="home-grid">
        {products.map((item) => {
          return (
            <Grid.Column key={item["_id"]}>
              <Card>
                <Image src={item.image} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{item.title}</Card.Header>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    {item.price}
                    <Icon name="dollar" />
                  </div>

                  <Button
                    color="blue"
                    onClick={(e) => {
                      addToCart(e, item["_id"]);
                    }}
                  >
                    Buy
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
