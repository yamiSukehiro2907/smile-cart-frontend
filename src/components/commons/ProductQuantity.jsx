import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button } from "neetoui";

const ProductQuantity = ({ slug, availableQuantity }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring-0"
        disabled={selectedQuantity <= 0}
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(selectedQuantity - 1);
        }}
      />
      {selectedQuantity}
      <Button
        className="focus-within:ring-0"
        disabled={selectedQuantity >= availableQuantity}
        label="+"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(selectedQuantity + 1);
        }}
      />
    </div>
  );
};

export default ProductQuantity;
