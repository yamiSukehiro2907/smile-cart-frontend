import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import Header from "components/commons/Header";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Typography, Tag } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";
import routes from "src/route";

import Carousel from "./Carousel";

import PageNotFound from "../commons/PageNotFound";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

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
  }, [slug]);

  if (loading) return <PageLoader />;

  if (isError) return <PageNotFound />;

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={name} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex items-start justify-center">
            <div className="w-full max-w-lg">
              {isNotNil(imageUrls) ? (
                <Carousel
                  imageUrls={append(imageUrl, imageUrls)}
                  title={name}
                />
              ) : (
                <div className="neeto-ui-rounded-lg overflow-hidden bg-white shadow-sm">
                  <img
                    alt={name}
                    className="h-auto w-full object-cover"
                    src={imageUrl}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <div>
              <Typography className="mb-2" style="h2" weight="bold">
                {name}
              </Typography>
              {availableQuantity > 0 ? (
                <Tag label={`${availableQuantity} in stock`} style="success" />
              ) : (
                <Tag label="Out of stock" style="danger" />
              )}
            </div>
            <div className="neeto-ui-border-gray-300 border-t pt-6">
              <Typography
                className="leading-relaxed text-gray-700"
                style="body1"
              >
                {description}
              </Typography>
            </div>
            <div className="neeto-ui-rounded-lg neeto-ui-bg-white space-y-3 border p-6 shadow-sm">
              <div className="flex items-baseline gap-3">
                <Typography className="text-gray-900" style="h3" weight="bold">
                  ${offerPrice}
                </Typography>
                <Typography
                  className="text-gray-500 line-through"
                  style="body2"
                >
                  ${mrp}
                </Typography>
                <span className="neeto-ui-rounded-full neeto-ui-bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {discountPercentage}% OFF
                </span>
              </div>
              <Typography className="text-gray-600" style="body3">
                You save ${totalDiscounts.toFixed(2)}
              </Typography>
            </div>
            <div className="space-y-4 pt-4">
              <AddToCart {...{ slug, availableQuantity }} />
              <Button
                className="bg-neutral-800 hover:bg-neutral-950 w-full"
                disabled={availableQuantity === 0}
                label="Buy Now"
                size="large"
                to={routes.checkout}
                onClick={() => setSelectedQuantity(selectedQuantity || 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
