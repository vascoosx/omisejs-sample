/**
 * Mocking client-server processing
 */
const _products = [
  { id: 1, title: "Air purifier", price: 50000, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10000, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19000, inventory: 5 }
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100);
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      Math.random() > 0.5 || navigator.userAgent.indexOf("PhantomJS") > -1
        ? cb()
        : errorCb();
    }, 100);
  }
};
