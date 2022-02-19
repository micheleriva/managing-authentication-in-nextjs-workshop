const json = require("../../data/json/products.json");

export default function handler(req, res) {
  res.json(json);
}
