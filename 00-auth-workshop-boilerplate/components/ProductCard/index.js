import Image from "next/image";
import Link from "next/link";
import Rating from "react-star-ratings";

export function ProductCard(props) {
  return (
    <Link href={`/products/${props.id}`} passHref>
      <a className="border border-1 border-gray-200 rounded-lg p-3 hover:text-orange-600">
        <div className="relative w-52 h-32 max-w-full">
          <Image layout="fill" objectFit="contain" src={props.image} />
        </div>
        <div className="text-lg leading-7 font-bold mt-12">{props.title}</div>
        <div className="mt-2">
          <Rating
            rating={props.rating}
            numberOfStars={5}
            starRatedColor="orange"
            starDimension="24px"
            starSpacing="4px"
          />
        </div>
        <div className="mt-2 text-lg">${props.price}</div>
      </a>
    </Link>
  );
}
