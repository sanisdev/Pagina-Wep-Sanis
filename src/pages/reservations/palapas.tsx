import { useState } from "react";

import "primereact/resources/themes/saga-blue/theme.css"; // Asegúrate de importar el tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "../../css/index.css";
import { Card } from "primereact/card";
import * as Constants from "../../constants";
import { Image } from "primereact/image";

import { Divider } from "primereact/divider";
import { usePalapaContext } from "../../context/PalapaContext"; // Importa el contexto

const Palapas = () => {
	const navigate = useNavigate();
	const [selectedDate] = useState<Date | null>(null);
	const { selectedPalapa, setSelectedPalapa } = usePalapaContext(); // Usa el contexto
	const [currentImage, setCurrentImage] = useState(0);

	const images = [
		[
			Constants.palapa1,
			Constants.palapa1_2,
			Constants.palapa1_4,
			Constants.palapa1_5,
		],
		[
			Constants.palapa2,
			Constants.palapa2_2,
			Constants.palapa2_3,
			Constants.palapa2_4,
		],
		[
			Constants.palapa3,
			Constants.palapa3_2,
			Constants.palapa3_3,
			Constants.palapa3_4,
		],
		[
			Constants.palapa4,
			Constants.palapa4_2,
			Constants.palapa4_3,
			Constants.palapa4_4,
		],
		[
			Constants.palapa1,
			Constants.palapa1_2,
			Constants.palapa1_4,
			Constants.palapa1_5,
		],
		[
			Constants.palapaCA,
			Constants.palapaCA_2,
			Constants.palapaCA_3,
			Constants.palapaCA_4,
		],
		[
			Constants.palapa6,
			Constants.palapa6_2,
			Constants.palapa6_3,
			Constants.palapa6_4,
		],
		[
			Constants.palapa7,
			Constants.palapa7_2,
			Constants.palapa7_3,
			Constants.palapa7_4,
		],
	];
	const icon = <i className="pi pi-eye"></i>;

	const nextImage = () => {
		setCurrentImage((currentImage + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentImage((currentImage - 1 + images.length) % images.length);
	};

	const handleImageClick = (palapaId: number) => {
		setSelectedPalapa(palapaId);
	};

	const handleReserveClick = () => {
		navigate(`/reservacion`); // Navega sin pasar el ID como parámetro
	};
	const lorem =
		" Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, odit enim sunt animi quidem ab debitis id eveniet hic quaerat possimus at nisi nobis sequi, voluptates doloribus voluptatum doloremque soluta. Lorem Et id commodo ullamco est esse consectetur ipsum ad minim magna. Officia laborum sint laboris ex pariatur. Magna velit cupidatat laborum commodo laboris voluptate consectetur velit culpa.";

	const palapasInfo = [
		{
			id: 1,
			name: "Palapa 1",
			description: lorem,
		},
		{ id: 2, name: "Palapa 2", description: lorem },
		{ id: 3, name: "Palapa 3", description: lorem },
		{ id: 4, name: "Palapa 4", description: lorem },
		{ id: 5, name: "Sarapera", description: lorem },
		{ id: 6, name: "Capricho", description: lorem },
		{ id: 7, name: "Palapa 6", description: lorem },
		{ id: 8, name: "Palapa 7", description: lorem },
	];

	return (
		<div className="grid  mt-16 md:mt-0 justify-center w-full min-h-[100vh] md:min-h-[90vh] px-4 relative pt-10 md:pt-0">
			{selectedPalapa === null && (
				<div className="grid grid-cols-1 sm:grid-cols-2 pt-6 md:grid-cols-4 gap-6 w-full justify-center align-middle">
					<div
						key={1}
						className={`bg-cover bg-pl-1 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 
						
						
						`}
						onClick={() => handleImageClick(1)}
					>
						<span className="text-white text-lg font-bold">
							Palapa 1
						</span>
					</div>
					<div
						key={2}
						className={`bg-cover bg-pl-2 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(2)}
					>
						<span className="text-white text-lg font-bold">
							Palapa 2
						</span>
					</div>
					<div
						key={3}
						className={`bg-cover bg-pl-3 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(3)}
					>
						<span className="text-white text-lg font-bold">
							Palapa 3
						</span>
					</div>
					<div
						key={4}
						className={`bg-cover bg-pl-4 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(4)}
					>
						<span className="text-white text-lg font-bold">
							Palapa 4
						</span>
					</div>
					<div
						key={5}
						className={`bg-cover bg-pl-5 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(5)}
					>
						<span className="text-white text-lg font-bold">
							Sarapera
						</span>
					</div>
					<div
						key={6}
						className={`bg-cover bg-pl-ca bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(6)}
					>
						<span className="text-white text-lg font-bold">
							Capricho
						</span>
					</div>

					<div
						key={7}
						className={`bg-cover bg-pl-6 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(7)}
					>
						<span className="text-white text-lg font-bold">
							Palapa 6
						</span>
					</div>
					<div
						key={8}
						className={`bg-cover bg-pl-7 bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
						onClick={() => handleImageClick(8)}
					>
						<span className="text-white text-lg font-bold">
							Palapa 7
						</span>
					</div>
				</div>
			)}
			{selectedPalapa !== null && (
				<Card className="mt-6 p-4 w-[90vw] shadow-md animate-fade-in-down mb-4">
					<div className="flex felx-row gap-2 mb-4 justify-between place-items-center  ">
						<div className="flex flex-row">
							<Button
								icon="pi pi-arrow-left"
								className=" rounded-r-none "
								onClick={() => setSelectedPalapa(null)}
							></Button>
							<div>
								<Button
									icon="pi pi-home"
									className="rounded-l-none"
									onClick={() => navigate("/index")}
								></Button>
							</div>
						</div>

						<h2 className="text-2xl font-bold">
              {palapasInfo.find((palapa) => palapa.id === selectedPalapa)?.name}
            </h2>

						<Button
							label={
								window.innerWidth > 640 ? "Reservar" : undefined
							}
							icon="pi pi-calendar"
							className=" bottom-0 left-0"
							onClick={handleReserveClick}
						/>
					</div>
					<div className="card flex flex-col md:flex-row justify-content-center justify-between">
						{/* Imagen activa en la versión móvil */}
						<div className="block md:hidden text-center">
							<Image
								src={images[selectedPalapa - 1][currentImage]}
								indicatorIcon={icon}
								alt="Image"
								preview
								width="300"
							/>
							<div className="flex justify-center mt-2">
								<button onClick={prevImage} className="p-2">
									Anterior
								</button>
								<button onClick={nextImage} className="p-2">
									Siguiente
								</button>
							</div>
						</div>
						{/* Todas las imágenes en la versión de escritorio */}

						{images[selectedPalapa - 1].map((image, index) => (
							<div
								key={index}
								className="hidden md:flex justify-center items-center"
							>
								<div className="w-full max-w-[20rem] h-auto overflow-hidden md:w-[15rem] lg:w-[22rem]">
									{/* Contenedor padre */}
									<Image
										src={image}
										indicatorIcon={icon}
										alt="Image"
										preview
										className="w-full h-full object-cover"
									/>
								</div>
							</div>
						))}
					</div>
					<Divider />
					<div className="flex flex-col md:flex-row justify-between  pt-4">
						<div className="md:w-1/2">
							<h2 className="pt-4 font-bold text-xl">
								Descripcion
							</h2>
							<p className="p-4">
								{palapasInfo[selectedPalapa - 1].description}
							</p>
						</div>

						<div className="flex flex-col md:w-1/2">
							<h2 className="pt-4 text-center font-bold text-xl">
								Mapa
							</h2>
							<img
								src={Constants.mapa}
								alt=""
								className="w-[800px] h-[380px] "
							/>
						</div>
					</div>
				</Card>
			)}
		</div>
	);
};

export default Palapas;
