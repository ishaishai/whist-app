import { useEffect, useState } from "react";
import { getStats } from "../actions";
import { Grid, Card, Button, Image, Icon } from "semantic-ui-react";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats()
      .then((data) => {
        console.log(data);
        setStats(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="Stats">
      {stats && (
        <>
          <Grid relaxed columns={2} className="stats-grid">
            <Grid.Column className="stats-title-col" key="item-title">
              <div>Title</div>
            </Grid.Column>
            <Grid.Column className="stats-title-col" key="item-amount">
              <div>Amount</div>
            </Grid.Column>
            {stats.top5products.map((item) => {
              return (
                <>
                  <Grid.Column key={item.title}>
                    <div>{item.title}</div>
                  </Grid.Column>
                  <Grid.Column key={item.amount}>
                    <div>{item.amount}</div>
                  </Grid.Column>
                </>
              );
            })}
          </Grid>
          <Grid relaxed columns={2} className="stats-grid">
            <Grid.Column className="stats-title-col" key="uitem-title">
              <div>Title</div>
            </Grid.Column>
            <Grid.Column className="stats-title-col" key="uitem-amount">
              <div>Amount</div>
            </Grid.Column>
            {stats.top5UniqueProducts.map((item) => {
              return (
                <>
                  <Grid.Column key={item.title}>
                    <div>{item.title}</div>
                  </Grid.Column>
                  <Grid.Column key={item.amount}>
                    <div>{item.amount}</div>
                  </Grid.Column>
                </>
              );
            })}
          </Grid>

          <Grid relaxed columns={2} className="stats-grid">
            <Grid.Column className="stats-title-col" key="order-date">
              <div>Date</div>
            </Grid.Column>
            <Grid.Column className="stats-title-col" key="oreder-total">
              <div>Total</div>
            </Grid.Column>
            {stats.orders.map((order) => {
              return (
                <>
                  <Grid.Column key={order.date}>
                    <div>{order.date}</div>
                  </Grid.Column>
                  <Grid.Column key={order.total}>
                    <div>{order.total}</div>
                  </Grid.Column>
                </>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Stats;
