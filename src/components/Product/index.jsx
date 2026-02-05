import { useEffect, useState } from "react";

import Typography from "antd/lib/typography/Typography";
import productsApi from "apis/products";
import { PageLoader } from "components/commons";
import Header from "components/commons/Header";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

import PageNotFound from "../commons/PageNotFound";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <PageLoader />;

  if (isError) return <PageNotFound />;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  console.log(product);

  return (
    <div className="m-2">
      <Header title={name} />
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
