class Api {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getProducts() {
    return fetch(this.baseURL).then((res) => res.json());
  }
}

export const api = new Api(
  "https://course-api.com/react-useReducer-cart-project"
);
