import { FC, useState, useEffect } from "react";
import CarouselItem from "./Carouselitem";

import "../css/Carousel.css";

interface CarouselProps {
	slides: string[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
	const [currentSlide, setCurrenSlide] = useState(0);

	// const prev =() =>{
	//   const index = currentSlide > 0 ? currentSlide - 1: slides.length -1
	//   setCurrenSlide(index)
	// }
	// const next =() =>{
	//   const index = currentSlide < slides.length -1 ? currentSlide +1: 0
	//   setCurrenSlide(index)
	// }

	useEffect(() => {
		const slideInterval = setInterval(() => {
			setCurrenSlide((currentSlide) =>
				currentSlide < slides.length - 1 ? currentSlide + 1 : 0
			);
		}, 5000);
		return () => clearInterval(slideInterval);
	}, []);

	return (
		<div className="carousel" style={{ objectFit: "cover" }}>
			<div
				className="carousel-inner"
				style={{ transform: `translateX(${-currentSlide * 100}%)` }}
			>
				{slides.map((slide, index) => (
					<CarouselItem slide={slide} key={index} />
				))}
			</div>
			{/* <CarouselControls prev={prev}  next={next} /> */}
		</div>
	);
};

export default Carousel;
