import Image from 'next/image';
import Link from 'next/link';
import Rating from 'react-star-ratings';

export async function getServerSideProps({ query }) {
  const { HOST } = process.env;
  const productReq = await fetch(`${HOST}/api/products`);
  const productsData = await productReq.json();

  const { id } = query;
  const product = productsData.find((product) => product.id === parseInt(id));

  if (!product) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      product
    }
  }
}

export default function ProductPage({ product }) {
  return (
    <div className='flex mt-24'>
      <div className='relative w-11/12 mr-16'>
        <Image src={product.image} layout='fill' objectFit='contain' />
      </div>
      <div className='ml-10'>
        <h1 className='text-4xl font-bold'> {product.title} </h1>
        <div className='flex items-center mt-3'>
          <Rating
            rating={product.rating.rate}
            numberOfStars={5}
            starRatedColor='orange'
            starDimension='24px'
            starSpacing='4px'
          />
          <span className='ml-3 translate-y-0.5'>
            {product.rating.count} reviews
          </span>
        </div>
        <div className='mt-3 text-xl'>
          {product.description}
        </div>
        <div className='mt-5'>
          <Link href='/login' passHref>
            <button className='bg-sky-900 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700'> Add to cart </button>
          </Link>
        </div>
      </div>
    </div>
  )
}