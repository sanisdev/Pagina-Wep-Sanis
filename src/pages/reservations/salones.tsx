import  { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; // Asegúrate de importar el tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "../../css/index.css";
import { Card } from "primereact/card";
import * as Constants from "../../constants";
import { Image } from "primereact/image";

const Palapas = () => {
	const navigate = useNavigate();
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedSalones, setSelectedSalones] = useState<number | null>(null);
	const [currentImage, setCurrentImage] = useState(0);
	const images = [
		Constants.palapa1_4,
		Constants.palapa1_4,
		Constants.palapa1_4,
		Constants.palapa1_5,
	];
	const icon = <i className="pi pi-eye"></i>;

	const nextImage = () => {
		setCurrentImage((currentImage + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentImage((currentImage - 1 + images.length) % images.length);
	};

	const handleImageClick = (palapaId: number) => {
		setSelectedSalones(palapaId);
		setShowCalendar(false);
	};

	const handleDateChange = (e: any) => {
		setSelectedDate(e.value);
		setShowCalendar(false); // Oculta el calendario después de seleccionar una fecha
	};

	const handleReserveClick = () => {
		setShowCalendar(true);
	};

	const salonesInfo = [
		{
			id: 1,
			name: "Salones 1",
			description:
				" Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, odit enim sunt animi quidem ab debitis id eveniet hic quaerat possimus at nisi nobis sequi, voluptates doloribus voluptatum doloremque soluta.",
		},
		{ id: 2, name: "Salones 2", description: "Descripción de la Palapa 2" },
		{ id: 3, name: "Salones 3", description: "Descripción de la Palapa 3" },
		{ id: 4, name: "Salones 4", description: "Descripción de la Palapa 4" },
		{ id: 5, name: "Salones 5", description: "Descripción de la Palapa 5" },
		{ id: 6, name: "Salones 6", description: "Descripción de la Palapa 6" },
		{ id: 7, name: "Salones 7", description: "Descripción de la Palapa 7" },
		{ id: 8, name: "Salones 8", description: "Descripción de la Palapa 8" },
	];

	return (
		<div className="grid pt-16 justify-center w-full h-[] px-4 relative">
			<div>
				<Button
					icon="pi pi-arrow-left"
					onClick={() => navigate("/index")}
				></Button>
			</div>
			{selectedSalones === null && (
				<div className="grid grid-cols-1 sm:grid-cols-2 pt-6 md:grid-cols-4 gap-6 w-full">
					{salonesInfo.map((palapa) => (
						<div
							key={palapa.id}
							className={`bg-cover bg-pl-${palapa.id} bg-center h-60 w-72 flex items-center justify-center cursor-pointer border-2 shadow-2xl rounded-lg
						transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
							onClick={() => handleImageClick(palapa.id)}
						>
							<span className="text-white text-lg font-bold">
								{palapa.name}
							</span>
						</div>
					))}
				</div>
			)}
			{selectedSalones !== null && (
				<Card className="mt-6 p-4 w-[90vw] shadow-md animate-fade-in-down mb-4">
					<div className="flex felx-row gap-2 mb-4 justify-between place-items-center  ">
						<Button
							icon="pi pi-arrow-left"
							className="h-12"
							onClick={() => setSelectedSalones(null)}
						></Button>
						<h2 className="text-2xl font-bold text-center">
							{salonesInfo[selectedSalones - 1].name}
						</h2>

						<Button
							label="Reservar"
							icon="pi pi-calendar"
							className=" bottom-0 left-0"
							onClick={handleReserveClick}
						/>
					</div>
					<div className="card flex flex-col md:flex-row justify-content-center justify-between">
						{/* Imagen activa en la versión móvil */}
						<div className="block md:hidden text-center">
							<Image
								src={images[currentImage]}
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
						{images.map((image, index) => (
							<div
								key={index}
								className="hidden md:block text-center"
							>
								<Image
									src={image}
									indicatorIcon={icon}
									alt="Image"
									preview
									width="300"
								/>
							</div>
						))}

						{/* <Image
							src="https://via.placeholder.com/250"
							alt="Image"
							preview
							width="250"
						/> */}
					</div>

					<h2 className="pt-4">Descripcion</h2>
					<p className="p-4">
						{salonesInfo[selectedSalones - 1].description}
					</p>
					<div className="flex flex-row justify-between ">
						<div className="flex flex-col">
							<h2 className="pt-4">Cosas que pueden incluirse</h2>
							<ul className="list-disc pl-6">
								<li className="mb-2">Mesas</li>
								<li className="mb-2">Mesas</li>
								<li className="mb-2">Mesas</li>
								<li className="mb-2">Mesas</li>
								<li className="mb-2">Mesas</li>
								<li className="mb-2">Mesas</li>
								<li className="mb-2">Mesas</li>
							</ul>
						</div>
						<div className="flex flex-col">
							<h2 className="pt-4">Mapa</h2>
							<img
								src={Constants.mapa}
								alt=""
								className="w-[800px] h-[400px] "
							/>
						</div>
					</div>
				</Card>
			)}
			{showCalendar && (
				<div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
					<div className="flex items-center justify-center">
						<Calendar
							value={selectedDate}
							onChange={handleDateChange}
							inline
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Palapas;
