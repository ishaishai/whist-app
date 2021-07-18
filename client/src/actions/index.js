export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    console.log("before fetch");
    fetch("/items")
      .then((res) => res.json())
      .then((users) => {
        resolve(users.data);
      })
      .catch((error) => reject(error));
  });
};

export const makeOrder = (cartItems) => {
  return new Promise((resolve, reject) => {
    console.log("before fetch");
    fetch("/items/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cartItems }),
    })
      .then((res) => res.json())
      .then((users) => {
        resolve(users);
      })
      .catch((error) => reject(error));
  });
};

export const editProduct = (item) => {
  return new Promise((resolve, reject) => {
    console.log("before fetch");
    fetch("/items/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: item }),
    })
      .then((res) => resolve(true))
      .catch((error) => reject(error));
  });
};

export const deleteProduct = (itemId) => {
  return new Promise((resolve, reject) => {
    console.log("before delete");
    fetch("/items/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => {
        resolve(true);
      })
      .catch((error) => reject(error));
  });
};

export const addProduct = (item) => {
  return new Promise((resolve, reject) => {
    fetch("/items/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    })
      .then((res) =>
        res
          .json()
          .then((res) => {
            console.log(res);
            resolve(res.product);
          })
          .catch((error) => reject(error))
      )
      .catch((error) => reject(error));
  });
};

export const getStats = () => {
  return new Promise((resolve, reject) => {
    fetch("/items/stats")
      .then((res) => {
        res
          .json()
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};
