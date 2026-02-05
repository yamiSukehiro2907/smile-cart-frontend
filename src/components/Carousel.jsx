/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(handleRightClick, 3000);

    return () => clearInterval(interval);
  });

  const handleLeftClick = () => {
    setCurrentIndex(currentIndex =>
      currentIndex - 1 >= 0 ? currentIndex - 1 : imageUrls.length - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex(currentIndex =>
      currentIndex + 1 < imageUrls.length ? currentIndex + 1 : 0
    );
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handleLeftClick}
      />
      <img
        alt={title}
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />
      <div className="flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleRightClick}
      />
    </div>
  );
};

export default Carousel;
