import Image from "next/image";
import Link from "next/link";
import Rating from "react-star-ratings";
import { gql } from "graphql-request";
import client from "../../lib/graphql";

export async function getServerSideProps({ query }) {
  const { product } = await client.request(
    gql`
      query GetAllProducts($id: uuid!) {
        product(where: { id: { _eq: $id } }) {
          id
          image
          price
          rating
          description
          category
          title
        }
      }
    `,
    { id: query?.id }
  );

  if (!product.length) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      product: product.shift(),
    },
  };
}

export default function ProductPage({ product }) {
  return (
    <div className="flex mt-24">
      <div className="relative w-11/12 mr-16">
        <Image src={product.image} layout="fill" objectFit="contain" />
      </div>
      <div className="ml-10">
        <h1 className="text-4xl font-bold"> {product.title} </h1>
        <div className="flex items-center mt-3">
          <Rating
            rating={product.rating}
            numberOfStars={5}
            starRatedColor="orange"
            starDimension="24px"
            starSpacing="4px"
          />
          <span className="ml-3 translate-y-0.5">1032 reviews</span>
        </div>
        <div className="mt-3 text-xl">{product.description}</div>
        <div className="mt-5">
          <span className="mr-2 font-bold text-lg text-sky-900">
            ${product.price.toFixed(2)}
          </span>
          <Link href="/login" passHref>
            <button className="bg-sky-900 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700">
              {" "}
              Add to cart{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
