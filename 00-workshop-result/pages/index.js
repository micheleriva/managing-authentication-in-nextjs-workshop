import { gql } from "graphql-request";
import client from "../lib/graphql";
import { ProductCard } from "../components/ProductCard";

export async function getServerSideProps() {
  const { product } = await client.request(gql`
    query GetAllProducts {
      product {
        id
        image
        price
        rating
        category
        title
      }
    }
  `);

  return {
    props: {
      products: product,
    },
  };
}

export default function Home(props) {
  return (
    <div className="grid grid-cols-4 gap-12">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
