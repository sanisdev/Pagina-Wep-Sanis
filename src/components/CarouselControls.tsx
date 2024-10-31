import  { FC, MouseEventHandler } from 'react';

interface CarouselControlsProps {
    prev: MouseEventHandler<HTMLButtonElement>;
    next: MouseEventHandler<HTMLButtonElement>;
  }

const CarouselControls: FC<CarouselControlsProps> = ({ prev, next }) => {
    return(
        <div>
            <button className="carousel-control left" onClick={prev}>Prev</button>
            <button className="carousel-control right" onClick={next}>Next</button>
        </div>
    )
}

export default CarouselControls