import * as Constants from "../../constants";
import CarouselCus from "../../components/Carousel";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { obtenerEventos } from "../../services/api-comunicacion";
import ResponsiveCarousel from "../../components/carouselWrapper";


interface Evento {
	id: number;
	name: string;
	url: string;
}

const Home = () => {
	
	const [evento, setEvento] = useState<Evento[]>([]);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const slides = [
		// Constants.fondoslide,
		// Constants.fondoslide2,
		// Constants.fondoslide3,
		// Constants.fondoslide4,
		// Constants.fondoslide5,
		//Padel

		"https://cdn.imgchest.com/files/pyq9c2rnmj4.png",
		"https://cdn.imgchest.com/files/e4gdcoz9364.png",
		"https://cdn.imgchest.com/files/3yrgcalo3l4.png",
		//Albercas
		"https://cdn.imgchest.com/files/myd5cg235p4.png",
		"https://cdn.imgchest.com/files/3yrgcad5xo4.png",
		"https://cdn.imgchest.com/files/k739cgr5z67.png",
		//Bar
		"https://cdn.imgchest.com/files/j7mmc69jv37.png",
		"https://cdn.imgchest.com/files/g4z9ckp3qz7.png",
		"https://cdn.imgchest.com/files/j7mmc3xga57.png",
		//Gym
		"https://cdn.imgchest.com/files/84apcw8l9a4.png",
		"https://cdn.imgchest.com/files/345xcq5mab7.png",
		"https://cdn.imgchest.com/files/w7w6czwn9qy.png",
		//Palapas
		//Tenis

		// "https://cdn.imgchest.com/files/j7mmc3k8jx7.png",
	];

	const fetchEventos = async () => {
		try {
			const fetchedEventos = await obtenerEventos();
			// Mapear los eventos para extraer las URLs
			// const eventosConImagen = fetchedEventos.map(
			// 	(evento: EventoResponse) => ({
			// 		image: evento.url, // Asegúrate de que 'url' es la propiedad correcta que contiene la URL de la imagen
			// 	})
			// );
			setEvento(fetchedEventos);
			
		} catch (error) {
			console.error("Error fetching eventos:", error);
		}
	};

	useEffect(() => {
		fetchEventos();
	}, []);

	return (
		<div className="flex flex-col  space-y-10">
			<div className=" relative w-full  py-5 ">
				<div className="z-0 h-72 md:h-[10%] ">
					
					<video
						autoPlay
						loop
						muted
						className={`md:h-[80vh] w-full object-cover transition-opacity duration-2000 ${
							isVideoLoaded
								? "opacity-100 animate-fadeIn"
								: "opacity-0"
						}`}
						onCanPlay={() => setIsVideoLoaded(true)}
						// style={{ objectFit: "cover" }}
					>
						<source src={Constants.video_fondo} type="video/mp4" />
						Tu navegador no soporta el elemento de video.
					</video>
				</div>

				<div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[85%] h-[55%] md:w-[80%] md:h-auto md:mt-0 lg:w-[75%]  bg-[#00315D]  bg-opacity-60 shadow-lg rounded-lg p-4 mt-6 ">
					<div className="h-[100%] bg-slate-200 relative overflow-hidden ">
						<div
							className="absolute inset-0  blur-xs"
							style={{
								backgroundImage: `url(${Constants.fondo_about})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								flexDirection: "column",
								backgroundRepeat: "no-repeat",
								overflow: "hidden",
								display: "flex",
								filter: "blur(2px)", // Aplica el desenfoque aquí
							}}
						></div>
						<Card
							title={
								<span className="text-xl sm:text-base md:text-lg lg:text-xl">
									Nosotros
								</span>
							}
							className="text-white relative z-10 h-full rounded-none bg-black"
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
							}}
						>
							<p className="m-0 text-xs md:text-base">
								El Deportivo San Isidro es una institución con
								más de 35 años de existencia, que se compromete
								con sus socios a través de actividades
								deportivas y sociales.
							</p>
						</Card>
					</div>
				</div>
			</div>

			<div className="w-full  pt-20  px-5">
				<div className="flex flex-col  md:flex-row space-y-10 md:space-y-0 md:space-x-5">
					<div className="flex flex-col flex-wrap  md:flex-row md:space-x-5 space-y-5 md:space-y-0 bg-[#00315D]  bg-opacity-70 shadow-lg  rounded-lg p-4 ">
						<div className="md:w-[50%] relative overflow-hidden flex-1">
							<div
								className="absolute inset-0"
								style={{
									backgroundImage: `url(${Constants.tenisfondo})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									overflow: "hidden",
									flexDirection: "column",
									display: "flex",
									filter: "blur(2px)", // Aplica el desenfoque aquí
								}}
							></div>
							<Card
								title="Conoce nuestras instalaciones"
								className="text-white relative z-10 h-full  rounded-none"
								style={{
									backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
								}}
							>
								<p className="m-0 text-justify lg">
									Contamos con instalaciones de primer nivel
									en donde además de disfrutar de nuestras
									áreas verdes y sociales, también podrás
									practicar una variedad de deportes y
									disciplinas asesorado por nuestros
									instructores especialistas en el área y
									respaldados por años de experiencia y
									entrenamiento profesional.
								</p>
								<br />
								<p className="m-0 text-justify">
									Nos esforzamos constantemente por mantener y
									mejorar la calidad de nuestras instalaciones
									y servicios. Estamos comprometidos con tu
									bienestar y satisfacción, y trabajamos día a
									día para ofrecerte un entorno seguro, limpio
									y agradable.
								</p>
						
							</Card>
						</div>
				

						<div className="flex-1 md:block md:w-[50%] h-80 md:h-auto justify-end items-end">
							<div className="aspect-w-16 aspect-h-9 h-48 sm:h-52 md:h-96">
								<CarouselCus slides={slides} />
							</div>
						</div>
					</div>
				</div>
			</div>

			<h1 className="text-black px-5">Próximos Eventos</h1>
			<div className="card">
				{/* <Carousel
					autoplayInterval={1000}
					value={eventos}
					numVisible={3}
					numScroll={3}
					responsiveOptions={responsiveOptions}
					itemTemplate={itemTemplate}
					prevIcon="pi pi-chevron-left text-4xl  text-[#000717] "
					nextIcon="pi pi-chevron-right text-4xl text-[#000717]"
				/> */}

				<ResponsiveCarousel eventos={evento} home={true} />
			</div>
		</div>
	);
};

export default Home;
