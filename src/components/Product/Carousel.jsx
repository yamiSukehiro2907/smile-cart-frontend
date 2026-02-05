/* eslint-disable array-callback-return */
import { useEffect, useState, useRef } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(handleRightClick, 3000);

    return () => clearInterval(timerRef.current);
  });

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleRightClick, 3000);
  };

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
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={() => {
            handleLeftClick();
            resetTimer();
          }}
        />
        <img
          alt={title}
          className="h-56 w-56 object-cover"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleRightClick();
            resetTimer();
          }}
        />
      </div>
      <div className="flex gap-2">
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
    </div>
  );
};

export default Carousel;
