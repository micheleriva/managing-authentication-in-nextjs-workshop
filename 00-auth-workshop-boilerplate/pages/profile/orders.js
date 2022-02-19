import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { gql } from "graphql-request";
import client from "../../lib/graphql";

async function getOrders(userID) {
  const { orders } = await client.request(
    gql`
      query GetUserOrders($id: uuid!) {
        orders(where: { user_id: { _eq: $id } }) {
          id
          products
          date
        }
      }
    `,
    { id: userID }
  );

  return Promise.all(
    orders.map(async (order) => {
      const { product } = await client.request(
        gql`
          query GetOrderProducts($ids: [uuid!]) {
            product(where: { id: { _in: $ids } }) {
              title
              price
              id
            }
          }
        `,
        { ids: order.products }
      );

      return {
        ...order,
        date: dayjs(order.date).format("DD MMM YYYY"),
        products: product,
      };
    })
  );
}

export default function recentOrders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders("ff88a7aa-1f14-4f9e-a31e-99faf9ac9147")
      .then((data) => setOrders(data))
      .catch(console.log);
  }, []);

  if (!orders) {
    return <div>Loading recent orders...</div>;
  }

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="text-sm flex mt-6 p-6 border border-gray rounded-lg"
        >
          <div className="mr-10 pr-10 border-r border-gray-200">
            <div className="font-bold text-sky-900">
              {dayjs(order.date).format("DD MMM YYYY")}
            </div>
            <div className="text-gray-500"> {order.id} </div>
            <hr className="border-b border-t-0 border-gray-200 mt-2" />
            <div className="font-bold text-sky-900 mt-2"> Order total </div>
            <div className="text-gray-500">
              ${order.products.reduce((x, y) => x + y.price, 0).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="font-bold mb-2 text-sky-900"> Products </div>
            <div>
              {order.products.map((product) => (
                <>
                  <Link href={`/products/${product.id}`}>
                    <a
                      key={product.id}
                      className="text-gray-800 hover:underline"
                    >
                      {product.title}
                    </a>
                  </Link>
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
