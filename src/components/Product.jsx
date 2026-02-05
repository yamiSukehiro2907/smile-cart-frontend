import { useEffect, useState } from "react";

import Typography from "antd/lib/typography/Typography";
import axios from "axios";
import { Spinner } from "neetoui";
import { isNotNil, append } from "ramda";

import Carousel from "./Carousel";
import { BACKEND_BASE_URL } from "./constants";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_BASE_URL}/products/infinix-inbook-2`
      );
      console.log("Api Response", response);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold">{name}</Typography>
      </div>
      <div className="mt-6 flex gap-4">
        {isNotNil(imageUrls) ? (
          <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
        ) : (
          <img alt={name} className="w-48" src={imageUrl} />
        )}
      </div>
      <div className="w-3/5 space-y-4">
        <Typography>{description}</Typography>
        <Typography>MRP: {mrp}</Typography>
        <Typography className="font-semibold">
          Offer price: {offerPrice}
        </Typography>
        <Typography className="font-semibold text-green-600">
          {discountPercentage}% off
        </Typography>
      </div>
    </div>
  );
};

export default Product;
