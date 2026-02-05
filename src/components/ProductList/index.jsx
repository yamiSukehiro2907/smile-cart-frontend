import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { PageNotFound } from "components/commons";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

import { Header } from "../commons";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({ searchTerm: searchKey });
      setProducts(products);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchKey]);

  if (isError) return <PageNotFound />;

  return (
    <div className="flex flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title="No products to show" />
        ) : (
          products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
