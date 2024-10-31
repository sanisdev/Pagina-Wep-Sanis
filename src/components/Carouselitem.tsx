import "../css/Carousel.css";
import { FC } from "react";

interface CarouselItemProps {
	slide: string;
}

const CarouselItem: FC<CarouselItemProps> = ({ slide }) => {
	return (
		<div className="carousel-item">
			<img src={slide} alt="" />
		</div>
	);
};

export default CarouselItem;
