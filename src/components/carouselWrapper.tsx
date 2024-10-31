import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/carouselResponsive.css";
import { Button } from "primereact/button";
import * as Constants from "../constants";

interface Evento {
	id: number;
	name: string;
	url: string;
}

interface ResponsiveCarouselProps {
	eventos: Evento[];
	handleDelete?: (id: number) => void;
	home: Boolean;
}

const ResponsiveCarousel: React.FC<ResponsiveCarouselProps> = ({
	eventos,
	handleDelete,
	home,
}) => {
	const [filledEventos, setFilledEventos] = useState<Evento[]>([]);
	const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

	const handleDeleteWithLoading = async (id: number) => {
		setLoadingDelete(id);
		try {
			await handleDelete!(id);
		} catch (error) {
			console.error("Error deleting item:", error);
		}
		setLoadingDelete(null);
	};

	useEffect(() => {
		const minItems = 3;
		const updatedEventos = [...eventos];
		while (updatedEventos.length < minItems) {
			updatedEventos.push({ id: -1, name: "Placeholder", url: "" });
		}
		setFilledEventos(updatedEventos);
	}, [eventos]);

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="custom-carousel-container">
			<Slider {...settings}>
				{filledEventos.map((item) => (
					<div
						key={item.id !== -1 ? item.id : Math.random()}
						className="custom-carousel-item"
					>
						{item.id !== -1 ? (
							<>
								<img
									src={item.url}
									className="custom-carousel-image"
									alt={item.name}
								/>
								{handleDelete && (
									<Button
										label="Eliminar"
										icon="pi pi-times"
										className="custom-carousel-delete-btn"
										loading={loadingDelete === item.id}
										onClick={() =>
											handleDeleteWithLoading(item.id)
										}
									/>
								)}
							</>
						) : (
							<div className="custom-carousel-placeholder">
								<div className="custom-placeholder-content w-full h-full">
									{home ? (
										<img
											className="w-full h-full object-cover "
											src={Constants.prox}
											alt="Descripción de la imagen"
										/>
									) : (
										<p>Sin Eventos</p>
									)}
								</div>
							</div>
						)}
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ResponsiveCarousel;
