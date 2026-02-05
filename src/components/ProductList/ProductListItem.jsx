import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";
import routes from "src/route";
import { buildUrl } from "utils/url";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => {
  const history = useHistory();

  const handleClick = () => {
    const url = buildUrl(routes.products.show, { slug });
    console.log("Navigating to:", url);
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
    </div>
  );
};

export default ProductListItem;
