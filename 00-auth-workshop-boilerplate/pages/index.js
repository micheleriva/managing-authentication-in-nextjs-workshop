import { ProductCard } from "../components/ProductCard";

export async function getServerSideProps() {
  const { HOST } = process.env;
  const productsReq = await fetch(`${HOST}/api/products`);
  const productsData = await productsReq.json();

  return {
    props: {
      products: productsData
    }
  }
}

export default function Home(props) {
  return (
    <div className="grid grid-cols-4 gap-12">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
