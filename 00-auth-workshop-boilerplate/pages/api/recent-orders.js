import products from '../../data/json/products.json';
import orders from '../../data/json/recent-orders.json';

export default function handler(req, res) {
  const { id } = req.query;

  const recentOrders = orders
    .filter(({ userId }) => userId === id)
    .map((order) => {
      const fullProducts = order.products.map((productId) => products.find(({ id }) => id === productId));
      return { ...order, products: fullProducts }
    });

  res.json({
    orders: recentOrders
  });
}