import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/backend-practice.js";
// import "../data/cart-class.js"

async function loadPage() {
  try {
    // throw "error1"
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      loadCart(() => {
        // reject("error3");
        resolve("value3");
      });
    });

    
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();



/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/  

/*
new Promise((resolve) => {
  console.log("Start promise")
  loadProducts(() => {
    resolve("value1");
  });
}).then((value) => {
  return new Promise((resolve) => {
    console.log("value");
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/