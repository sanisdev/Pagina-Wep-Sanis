import { FC, useState } from "react";
import { Platillo, Politica, Servicio } from "../types/interfaces";
import {  DropdownChangeEvent } from "primereact/dropdown";
import ServiciosDialog from "./ServiciosDialog";
import PlatillosDropdown from "./PlatillosDropdown";
import GuisosCantidad from "./GuisosCantidad";
import ServiciosAdicionalesDropdown from "./ServiciosAdicionalesDropdown";

interface TacosProps {
	descripcion: React.ReactNode;
	servicio: Servicio;
	agregarPlatilloAlCarrito: (nuevoPlatillo: Platillo) => void;
	titulo: string;
	politicas: Politica[];
	initialPlatillo?: Platillo;
	isBuffet: boolean;
}

const Tacos: FC<TacosProps> = ({
	descripcion,
	servicio,
	agregarPlatilloAlCarrito,
	titulo,
	politicas,
	initialPlatillo,
	isBuffet,
}) => {
	const [servicioLocal, setServicioLocal] = useState<Servicio>(servicio);
	const [visible, setVisible] = useState<boolean>(false);

	const [selectedServiceAdicional, setSelectedServiceAdicional] =
		useState<Platillo>();
	const [cantidadAdultos, setCantidadAdultos] = useState<number>(0);
	const [cantidadNiños, setCantidadNiños] = useState<number>(0);
	const [cantidadServicioAd, setCantidadServicioAd] = useState<number>(0);
	const [selectedPlatillo, setSelectedPlatillo] = useState<
		Platillo | undefined
	>(initialPlatillo ? initialPlatillo : undefined);
	const [isInitialSelection, setIsInitialSelection] = useState<boolean>(
		initialPlatillo ? true : false
	);

	const handlePlatilloChange = (e: DropdownChangeEvent) => {
		setSelectedPlatillo(e.value);
		setIsInitialSelection(false); // Permitir que el usuario cambie la selección
	};

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

	const paltilloOptionTemplate = (option: Platillo) => {
		return (
			<div className="flex flex-1 items-center  w-96">
				<div className="truncate">{option.nombre}</div>
			</div>
		);
	};

	const handleServiceChange = (e: DropdownChangeEvent) => {
		const value = e.value;

		// Establece el nuevo servicio seleccionado en el estado
		setSelectedServiceAdicional(value);
	};

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
			{/* Condicional para manejar buffet o no */}
			{isBuffet ? (
				<ul className="list-none md:pl-2">
					{servicio.platillos.map((platillo, index) => (
                        <div>
                            <p className=" font-bold text-lg ">{titulo}</p>
                            <li key={index} className="mt-2 grid grid-cols-3 gap-4">
							{/* Primera columna: Nombre del platillo (2/3 del ancho) */}
							<span className="font-medium col-span-2">
								{servicio.platillos.length === 1 ? (
									<ul className="list-disc pl-5">
										{platillo.guisos!.map((guiso, idx) => (
											<li key={idx}>{guiso.nombre}</li>
										))}
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
								} gap-2 justify-center items-center text-right`}
							>
								{/* Precio regular */}
								<div className="flex flex-col gap-2 justify-center items-center text-center">
									<span>
										Adulto ${platillo.precio.toFixed(2)}
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
                            
                        </div>
						
                        
					))}
				</ul>
			) : (
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
			)}

			<button
				className="bg-black w-full text-white py-2 px-4 rounded hover:bg-zinc-800"
				onClick={() => setVisible(true)}
			>
				<span>Reservar</span>
			</button>

			<ServiciosDialog
				visible={visible}
				onHide={() => setVisible(false)}
				onAddPlatillo={handleAddPlatillo}
			>
				{/* Mostrar el dropdown si no hay selección inicial o si el usuario quiere cambiarla */}
				{(!isInitialSelection || !selectedPlatillo) && (
					<PlatillosDropdown
						selectedPlatillo={selectedPlatillo!}
						platillos={servicio.platillos}
						onChange={handlePlatilloChange}
						itemTemplate={paltilloOptionTemplate}
					/>
				)}
				{selectedPlatillo && (
					<GuisosCantidad
						guisos={selectedPlatillo.guisos || []}
						cantidadAdultos={cantidadAdultos}
						cantidadNiños={cantidadNiños}
						onGuisoChange={handleGuisoChange}
						onCantidadAdultosChange={setCantidadAdultos}
						onCantidadNiñosChange={setCantidadNiños}
						maxSelectableGuisos={4}
					/>
				)}
				{selectedServiceAdicional && (
					<ServiciosAdicionalesDropdown
						selectedServiceAdicional={selectedServiceAdicional!}
						serviciosAdicionales={servicioLocal.serviciosAd!}
						onChange={handleServiceChange}
						cantidadServicioAd={cantidadServicioAd}
						onCantidadChange={setCantidadServicioAd}
					/>
				)}
			</ServiciosDialog>
		</div>
	);
};

export default Tacos;
