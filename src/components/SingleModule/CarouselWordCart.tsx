import React, { useState } from "react";

import ReactCardFlip from "react-card-flip";
interface ICarouselWordCart {
  word: string;
  translate: string;
}

const CarouselWordCart: React.FC<ICarouselWordCart> = ({ word, translate }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setFlipped((prevState) => !prevState);
  };

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <article
        onClick={(e) => handleClick(e)}
        className="CarouselWordCartContainer"
      >
        <h1>{word}</h1>
      </article>

      <article
        className="CarouselWordCartContainer"
        onClick={(e) => handleClick(e)}
      >
        <h1>{translate}</h1>
      </article>
    </ReactCardFlip>
  );
};

export default CarouselWordCart;
