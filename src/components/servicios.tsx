import { FC, useEffect, useState } from "react";
import { Platillo, Politica, Servicio } from "../types/interfaces";
import "../css/index.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";

interface ServiciosProps {
	descripcion: React.ReactNode;
	servicio: Servicio;
	agregarPlatilloAlCarrito: (nuevoPlatillo: Platillo) => void;
	titulo: string;
	politicas: Politica[];
	showListPlatillos:boolean;
}

const Servicios: FC<ServiciosProps> = ({
	descripcion,
	servicio,
	agregarPlatilloAlCarrito,
	titulo,
	politicas,
	showListPlatillos
}) => {
	const [servicioLocal, setServicioLocal] = useState<Servicio>(
		servicio
		// Inicializa con tus datos
	);

	const [visible, setVisible] = useState<boolean>(false);
	const [selectedPlatillo, setSelectedPlatillo] = useState<Platillo>();
	const [selectedServiceAdicional, setSelectedServiceAdicional] =
		useState<Platillo>();
	// const [selectedServiceAdicional, setSelectedServiceAdicional] = useState<
	// 	Platillo[]
	// >([]);
	const [cantidadAdultos, setCantidadAdultos] = useState<number>(0);
	const [cantidadNiños, setCantidadNiños] = useState<number>(0);
	const [cantidadServicioAd, setCantidadServicioAd] = useState<number>(0);
	const [isVertical, setIsVertical] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			setIsVertical(window.innerWidth >= 768); // Cambia el tamaño según lo necesites
		};

		handleResize(); // Configuración inicial
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleServiceChange = (e: DropdownChangeEvent) => {
		const value = e.value;

		// Establece el nuevo servicio seleccionado en el estado
		setSelectedServiceAdicional(value);
	};

	//Estas funciones son para los chips
	// const handleServiceChange = (e: DropdownChangeEvent) => {
	// 	const value = e.value;

	// 	// Verifica si el valor ya está en la lista
	// 	if (
	// 		!selectedServiceAdicional.some(
	// 			(service) => service.nombre === value.nombre
	// 		)
	// 	) {
	// 		setSelectedServiceAdicional((prev) => [...prev, value]); // Agrega el nuevo servicio seleccionado al array
	// 	}
	// };

	// const handleRemoveService = (serviceToRemove: Platillo) => {
	// 	setSelectedServiceAdicional((prev) =>
	// 		prev.filter((service) => service.nombre !== serviceToRemove.nombre)
	// 	);
	// };

	// Handler para agregar el platillo seleccionado al carrito
	const handleAddPlatillo = () => {
		if (selectedPlatillo) {
			const platilloConCantidades: Platillo = {
				...selectedPlatillo,
				cantidadAdultos,
				cantidadNiños,
			};
			agregarPlatilloAlCarrito(platilloConCantidades);
		}

		if (selectedServiceAdicional && cantidadServicioAd > 0) {
			// Aquí asumimos que la estructura de servicio adicional es similar a Platillo
			const servicioConCantidades: Platillo = {
				...selectedServiceAdicional,
				cantidadAdultos: cantidadServicioAd, // o usa otra propiedad si es aplicable
				cantidadNiños: 0, // ajusta según sea necesario
			};
			agregarPlatilloAlCarrito(servicioConCantidades);
		}

		setVisible(false); // Cerrar el diálogo después de agregar
	};

	// const footerContent = (
	// 	<div>
	// 		<Button
	// 			label="Ok"
	// 			icon="pi pi-check"
	// 			onClick={handleAddPlatillo}
	// 			autoFocus
	// 		/>
	// 	</div>
	// );
	// const selectedPaltilloTemplate = (option: Platillo, props: any) => {
	// 	if (option) {
	// 		return (
	// 			<div className="flex items-end justify-center">
	// 				<div>{option.nombre}</div>
	// 			</div>
	// 		);
	// 	}

	// 	return <span>{props.placeholder}</span>;
	// };

	const paltilloOptionTemplate = (option: Platillo) => {
		return (
			<div className="flex flex-1 items-center  w-96">
				<div className="truncate">{option.nombre}</div>
			</div>
		);
	};

	// const handleCantidadAdultoChange = (
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	const nuevaCantidad = parseInt(e.target.value);
	// 	if (selectedPlatillo) {
	// 		setSelectedPlatillo({
	// 			...selectedPlatillo,
	// 			cantidadAdultos: nuevaCantidad, // Actualizar la cantidad de adultos en el platillo seleccionado
	// 		});
	// 		console.log(selectedPlatillo);
	// 	}
	// };
	// const handleCantidadNiñoChange = (
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	const nuevaCantidad = parseInt(e.target.value);
	// 	if (selectedPlatillo) {
	// 		setSelectedPlatillo({
	// 			...selectedPlatillo,
	// 			cantidadNiños: nuevaCantidad, // Actualizar la cantidad de adultos en el platillo seleccionado
	// 		});
	// 	}
	// };
	
	const handleGuisoChange = (guisoIndex: number, checked?: boolean) => {
		if (!selectedPlatillo) return;

		// Asegúrate de que `checked` tenga un valor booleano
		const isChecked = checked ?? false;

		const updatedPlatillo = {
			...selectedPlatillo,
			guisos: selectedPlatillo.guisos?.map((guiso, index) =>
				index === guisoIndex ? { ...guiso, select: isChecked } : guiso
			),
		};

		setSelectedPlatillo(updatedPlatillo);

		// Actualiza el servicio local con el platillo actualizado
		setServicioLocal({
			...servicioLocal,
			platillos: servicioLocal.platillos.map((platillo) =>
				platillo.nombre === updatedPlatillo.nombre
					? updatedPlatillo
					: platillo
			),
		});
	};
	return (
		<div className="md:p-2  space-x-2 space-y-4">
			<div className="flex flex-col md:flex-row gap-2">
				{" "}
				<div className="md:w-1/2">{descripcion}</div>
				<div className="md:w-1/2">
					<h2 className="font-bold">Políticas de contratación</h2>
					<div>
						<ul className="list-disc pl-5 m-2 ">
							{politicas.map((politica) => (
								<li >{politica.texto}</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Aquí se muestra la lista de platillos */}
			{showListPlatillos &&  (
				<div className=" flex flex-col md:flex-row gap-2">
				<div className="md:w-1/2">
					<p className=" font-bold text-lg ">{titulo}</p>
					<ul className="list-none md:pl-2">
						{servicio.platillos.map((platillo, index) => (
							<li
								key={index}
								className="mt-2 grid grid-cols-3 gap-4"
							>
								{/* Primera columna: Nombre del platillo (2/3 del ancho) */}
								<span className="font-medium col-span-2">
									{servicio.platillos.length === 1 ? (
										<ul className="list-disc pl-5">
											{platillo.guisos!.map(
												(guiso, idx) => (
													<li key={idx}>
														{guiso.nombre}
													</li>
												)
											)}
										</ul>
									) : (
										platillo.nombre
									)}
								</span>

								{/* Segunda columna: Contenedor de precios (1/3 del ancho), alineado a la derecha */}
								<div
									className={`flex ${
										platillo.precioNiño
											? "flex-col"
											: "flex-row"
									} gap-2 justify-end items-center text-right`}
								>
									{/* Precio regular */}
									<div className="flex flex-row gap-2">
										<span>
											${platillo.precio.toFixed(2)}
										</span>

										{/* Precio de niño (solo si existe) */}
										{platillo.precioNiño && (
											<span className="">
												Niño $
												{platillo.precioNiño.toFixed(2)}
											</span>
										)}
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
				{/* Aqui se muestran los servicos adicionales */}
				{servicio.serviciosAd && servicio.serviciosAd.length > 0 && (
					<>
						<Divider
							layout={isVertical ? "vertical" : "horizontal"}
						/>
						<div className="md:w-1/2">
							<p className="font-bold text-lg">
								Servicios adicionales
							</p>
							<div className="">
								<ul className="list-none md:pl-5">
									{servicio.serviciosAd.map(
										(platillo, index) => (
											<li
												key={index}
												className="mt-2 grid grid-cols-3 gap-4"
											>
												{/* Primera columna: Nombre del platillo (2/3 del ancho) */}
												<span className="font-medium col-span-2">
													{platillo.nombre}
												</span>

												{/* Segunda columna: Contenedor de precios (1/3 del ancho), alineado a la derecha */}
												<div
													className={`grid ${
														platillo.precioNiño
															? "grid-cols-2"
															: "grid-cols-1"
													} gap-2 justify-self-end text-right`}
												>
													{/* Precio regular */}
													<span>
														$
														{platillo.precio.toFixed(
															2
														)}
													</span>

													{/* Precio de niño (solo si existe) */}
													{platillo.precioNiño && (
														<span className="text-sm text-gray-500">
															Niño: $
															{platillo.precioNiño.toFixed(
																2
															)}
														</span>
													)}
												</div>
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					</>
				)}
			</div>
			) }
			

		
			<button
				className="bg-black w-full text-white py-2 px-4 rounded hover:bg-zinc-800"
				onClick={() => setVisible(true)}
			>
				<span>Reservar</span>
			</button>
			
			<Dialog
				visible={visible}
				modal
				footer={
					<Button
						label="Agregar"
						icon="pi pi-check"
						onClick={handleAddPlatillo}
					/>
				}
				header="Servicios Disponibles"
				closeIcon={<i className="pi pi-times text-gray-600"></i>}
				className="w-96"
				onHide={() => {
					if (!visible) return;
					setVisible(false);
				}}
				style={{ width: "40rem" }}
			>
				<div className="flex flex-col space-y-2">
					{/* Dropdown para seleccionar platillos */}
					<div className="flex justify-center">
						<Dropdown
							value={selectedPlatillo}
							onChange={(e: DropdownChangeEvent) =>
								setSelectedPlatillo(e.value)
							}
							style={{ width: "80vw" }}
							options={servicioLocal.platillos}
							optionLabel="nombre"
							placeholder="Selecciona un Platillo"
							itemTemplate={paltilloOptionTemplate}
						/>
					</div>
					{/* Condicional para mostrar las opciones de guisos y cantidades */}
					{selectedPlatillo != null && (
						<div className="flex flex-col">
							<div>
								<ul className="list-disc pl-5">
									{selectedPlatillo.guisos?.map(
										(guiso, index) => (
											<li
												key={index}
												className="mt-2 flex items-center gap-4"
											>
												<Checkbox
													onChange={(e) =>
														handleGuisoChange(
															index,
															e.checked
														)
													}
													checked={guiso.select}
												/>
												<span>{guiso.nombre}</span>
											</li>
										)
									)}
								</ul>
							</div>
							<div className="flex flex-row justify-between p-4 m-2">
								<div className="flex flex-col justify-start mt-4">
									<label htmlFor="">
										Cantidad de Platillos Adultos
									</label>
									<input
										type="number"
										min="1"
										value={cantidadAdultos}
										onChange={(e) =>
											setCantidadAdultos(
												parseInt(e.target.value, 10) ||
													0
											)
										}
										className="border rounded px-3 py-1"
										placeholder="Cantidad"
									/>
								</div>
								{selectedPlatillo.cantidadNiños != null && (
									<div className="flex flex-col justify-start mt-4">
									<label htmlFor="">
										Cantidad de Platillos Niños
									</label>
									<input
										type="number"
										min="0"
										value={cantidadNiños}
										onChange={(e) =>
											setCantidadNiños(
												parseInt(e.target.value, 10) ||
													0
											)
										}
										className="border rounded px-3 py-1"
										placeholder="Cantidad"
									/>
								</div>
								)}
								
							</div>
						</div>
					)}
					{/* Dropdown para seleccionar servicios adicionales */}

					{servicioLocal.serviciosAd &&
						servicioLocal.serviciosAd.length > 0 && (
							<div className="flex justify-center">
								<Dropdown
									value={selectedServiceAdicional} // Muestra el servicio seleccionado
									onChange={handleServiceChange}
									style={{ width: "80vw" }}
									options={servicioLocal.serviciosAd}
									optionLabel="nombre"
									placeholder="Servicios Adicionales"
								/>
							</div>
						)}

					{selectedServiceAdicional != null && (
						<div className="flex flex-col justify-start mt-4">
							<label htmlFor="">Cantidad</label>
							<input
								type="number"
								min="1"
								value={cantidadServicioAd}
								onChange={(e) =>
									setCantidadServicioAd(
										parseInt(e.target.value, 10) || 0
									)
								}
								className="border rounded px-3 py-1"
								placeholder="Cantidad"
							/>
						</div>
					)}
				
				</div>
			</Dialog>
		</div>
	);
};

export default Servicios;
