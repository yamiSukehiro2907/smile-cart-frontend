import { useState } from "react";

import { PageLoader, PageNotFound } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

import { Header } from "../commons";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");

  const debouncedSearchKey = useDebounce(searchKey);

  const {
    data: { products = [] } = {},
    isLoading,
    isError,
  } = useFetchProducts({
    searchTerm: debouncedSearchKey,
  });

  if (isLoading) return <PageLoader />;

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
