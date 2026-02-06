import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";
import routes from "src/route";
import { buildUrl } from "utils/url";

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  slug,
  availableQuantity,
}) => {
  const history = useHistory();

  const handleClick = () => {
    const url = buildUrl(routes.products.show, { slug });
    history.push(url);
  };

  return (
    <div
      className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 cursor-pointer flex-col items-center justify-between border p-4"
      onClick={handleClick}
    >
      <img alt={name} className="h-40 w-40" src={imageUrl} />
      <Typography className="text-center" weight="semibold">
        {name}
      </Typography>
      <Typography>${offerPrice}</Typography>
      <AddToCart {...{ slug, availableQuantity }} />
    </div>
  );
};

export default ProductListItem;
