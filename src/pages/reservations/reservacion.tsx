import { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/index.css";
import { ResponsiveDivider } from "../../components/ResponsiveDivider";
import { agregarReservacion, obtenerFechas } from "../../services/api";
import { Calendar } from "primereact/calendar";
import { Invitado } from "../../interfaces/interfaces";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
type ToastSeverity = "success" | "info" | "warn" | "error";
import { Image } from "primereact/image";
import * as Constants from "../../constants";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

const ReservacionForm: React.FC = () => {
	const { idPalapa } = useParams<{ idPalapa: string }>();
	const [numTables, setNumTables] = useState<number | null>(null);
	const [numManteles, setNumManteles] = useState<number | null>(null);
	const [comments, setComments] = useState("");
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);
	const colors: string[] = ["Negro", "Chocolate"];
	// Mapea el color seleccionado a la imagen correspondiente
	const selectedMantel =
		selectedColor === "Chocolate"
			? Constants.mantel1
			: selectedColor === "Negro"
			? Constants.mantel2
			: null;
	const [tablon, setTablon] = useState<boolean>(false);
	// const location = useLocation();
	// const fecha = location.state?.fecha;
	// Estado para la lista de invitados
	const [guestList, setGuestList] = useState<Invitado[]>([]);
	// Estado para el nuevo invitado
	const [newGuest, setNewGuest] = useState<Invitado>({
		id: 0, // Valor temporal para id
		nombre: "",
		check_in: false,
		numero_pulsera: 0,
		pulsera_devuelta: false,
	});
	const Navigate = useNavigate();
	const toast = useRef<Toast>(null);

	// const [startTime, setStartTime] = useState<Dayjs | null>(null);
	// const [endTime, setEndTime] = useState<Dayjs | null>(null);
	// const isPalapa = location.state?.isPalapa;

	// const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	// const [carrito, setCarrito] = useState<Platillo[]>([]);

	// const agregarPlatilloAlCarrito = (nuevoPlatillo: Platillo) => {
	// 	setCarrito((prevCarrito) => {
	// 		// Verificar si el platillo ya está en el carrito
	// 		const platilloExistente = prevCarrito.find(
	// 			(platillo) => platillo.nombre === nuevoPlatillo.nombre
	// 		);

	// 		if (platilloExistente) {
	// 			// Si el platillo ya está en el carrito, actualizar con las nuevas cantidades
	// 			return prevCarrito.map((platillo) =>
	// 				platillo.nombre === nuevoPlatillo.nombre
	// 					? {
	// 							...platillo,
	// 							cantidadAdultos: nuevoPlatillo.cantidadAdultos,
	// 							cantidadNiños: nuevoPlatillo.cantidadNiños,
	// 							guisos: nuevoPlatillo.guisos || platillo.guisos,
	// 					  }
	// 					: platillo
	// 			);
	// 		} else {
	// 			// Si el platillo no está en el carrito, añadirlo
	// 			return [...prevCarrito, nuevoPlatillo];
	// 		}
	// 	});
	// };

	// const removePlatillo = (index: number) => {
	// 	setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
	// };

	// const total = carrito.reduce((total, item) => total + item.precio, 0);

	// const fechaString =
	// 	fecha instanceof Date ? fecha.toLocaleString() : "No disponible";

	// Función para manejar el agregado de un nuevo invitado
	const addGuest = () => {
		if (newGuest && !guestList.includes(newGuest)) {
			setGuestList([...guestList, newGuest]);
			setNewGuest({
				id: 0, // o puedes dejarlo sin definir si lo generas en otro lugar
				nombre: "",
				check_in: false,
				numero_pulsera: 0,
				pulsera_devuelta: false,
			}); // Limpiar el campo de entrada y resetear todos los valores
		}
	};

	const getFechas = async () => {
		try {
			const respuesta = await obtenerFechas(Number(idPalapa)); // Llamada a la API
			const fechas = respuesta.result;

			// Valida que 'fechas' sea un array antes de aplicar map
			if (Array.isArray(fechas)) {
				const fechasNoDisponiblesAPI = fechas.map(
					(fecha: string) => new Date(fecha)
				);
				// Combina las fechas deshabilitadas por la API con las fechas generadas localmente
				const allDisabledDates = [
					...fechasNoDisponiblesAPI,
					...generateDisabledDates(),
				];
				setDisabledDates(allDisabledDates);
			} else {
				console.error("La propiedad 'result' no contiene un array.");
			}
		} catch (error) {
			console.error("Error al obtener las fechas no disponibles:", error);
		}
	};

	const generateDisabledDates = () => {
		const currentDate = new Date();
		const yearStart = new Date(currentDate.getFullYear(), 0, 1); // Inicio del año
		const yearEnd = new Date(currentDate.getFullYear(), 11, 31); // Fin del año
		const oneWeekBefore = new Date(currentDate);
		oneWeekBefore.setDate(currentDate.getDate() - 7); // Fecha de hace una semana

		const dates: Date[] = [];

		// Deshabilitar todas las fechas antes del día actual
		for (
			let d = new Date(yearStart);
			d < currentDate;
			d.setDate(d.getDate() + 1)
		) {
			dates.push(new Date(d));
		}

		// Deshabilitar fechas fuera del año actual (anteriores y posteriores)
		for (
			let d = new Date(yearEnd.getFullYear() + 1, 0, 1);
			d <= new Date(yearEnd.getFullYear() + 1, 11, 31);
			d.setDate(d.getDate() + 1)
		) {
			dates.push(new Date(d));
		}

		return dates;
	};

	useEffect(() => {
		getFechas();
	}, []);

	const removeGuest = (indexToRemove: any) => {
		setGuestList(guestList.filter((_, index) => index !== indexToRemove));
	};

	// Nueva función para agregar una reservación
	const addReservation = async () => {
		if (!selectedDate || !numTables || !numManteles) {
			// alert("Por favor completa todos los campos requeridos.");
			showToast(
				"warn",
				"Faltan Datos",
				"Porfavor llene todos los datos solicitados para agendar su reservacion"
			);
			return;
		}

		const reservationData = {
			usuario_id: Number(localStorage.getItem("userId")), // Cambia esto con el ID del usuario actual
			palapa_id: parseInt(idPalapa!), // Asegúrate de que el ID de la palapa sea un número
			fecha: selectedDate.toISOString(), // Fecha en formato ISO
			hora_inicio: "14:00:00", // Cambia esto a la hora de inicio deseada
			hora_fin: "18:00:00", // Cambia esto a la hora de fin deseada
			numero_mesas: numTables,
			numero_manteles: numManteles,
			color_manteles: selectedColor || "sin color", // Cambia según la lógica de tu aplicación
			notas: comments,
			tipo_mesa: "estándar", // Cambia esto si tienes un tipo de mesa seleccionado
			invitados: guestList,
			estatus: "PENDIENTE", // Estatus inicial
		};

		try {
			await agregarReservacion(reservationData); // Llama a tu API con los datos de la reservación
			// alert("Reservación creada exitosamente!");
			Navigate("/Adeudos");
			// Opcional: Puedes redirigir o limpiar el formulario aquí
		} catch (error) {
			console.error("Error al agregar la reservación:", error);
		}
	};
	// const handleSubmit = () => {
	// 	const formData = {
	// 		guestList,
	// 		foodType: banquetType,
	// 		numTables,
	// 		tableClothColor,
	// 		startTime,
	// 		endTime,
	// 		numWaiters,
	// 		numDishes,
	// 		comments,
	// 	};
	// 	console.log(formData);
	// 	// Aquí puedes enviar los datos al backend o realizar alguna acción adicional.
	// };

	// const handleTimeChange = (newValue: Dayjs | null) => {
	// 	setStartTime(newValue);
	// 	// console.log(startTime?.hour, startTime?.minute);
	// };
	// const handleTimeEndChange = (newValue: Dayjs | null) => {
	// 	setEndTime(newValue);
	// 	// console.log(startTime?.hour, startTime?.minute);
	// };

	// const [visible, setVisible] = useState(false);

	// const toggleSidebar = () => {
	// 	setVisible(!visible);
	// };

	// const vaciarCarrito = () => {
	// 	setCarrito([]);
	// };

	const showToast = (
		severity: ToastSeverity,
		summary: string,
		detail: string
	) => {
		if (toast.current) {
			toast.current.show({
				severity,
				summary,
				detail,
				life: 3000,
				closeIcon: (
					<Button
						icon="pi pi-times"
						className="p-button-text text-center justify-center"
						onClick={() => toast.current?.clear()}
					/>
				),
			});
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-center items-center  w-full gap-2 p-4">
				<Toast ref={toast} />
				{/* <Button
					className="w-12 h-12"
					style={{
						position: "fixed",
						bottom: "16px",
						right: "16px",
						zIndex: 50,
						backgroundColor: "#3B82F6",
						color: "white",
						borderRadius: "50%",
						boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
						cursor: "pointer",
						overflow: "visible", // Permite que el span se salga del borde del botón
					}}
					onClick={() => setVisible(true)}
				>
					<i className="pi pi-shopping-cart"></i>
					{carrito.length! > 0 && (
						<span
							className="absolute h-5 w-5 z-50 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
							style={{
								top: "-5px", // Coloca el span ligeramente fuera del borde superior del botón
								right: "-5px", // Coloca el span ligeramente fuera del borde derecho del botón
							}}
						>
							{carrito.length}
						</span>
					)}
				</Button> */}
				{/* <Sidebar
					visible={visible}
					position="right"
					onHide={() => setVisible(false)}
					className="w-80 flex flex-col h-full"
					closeIcon={<i className="pi pi-times text-gray-600"></i>}
				>
					<div className="flex-grow overflow-y-auto">
						{/* Contenido del carrito 
						<h2 className="text-xl font-semibold align-middle justify-center text-center text-black">
							Tu Carrito
						</h2>
						<div className="text-center text-gray-500">
							Revisa tus buffets seleccionados.
						</div>
						{carrito && carrito.length > 0 ? (
							carrito.map((item, index) => (
								<div className="flex flex-col" key={index}>
									<Card className="relative py-2 m-2">
										<div className="flex flex-col h-full">
											{/* Contenedor para el botón de eliminar 
											<div className="flex justify-between mb-2">
												<h3 className="text-xl font-semibold">
													{item.nombrecorto ||
														item.nombre}
												</h3>
												<div className="absolute top-2 right-2">
													<button
														className="p-button-danger w-4 p-button-rounded"
														onClick={() =>
															removePlatillo(
																index
															)
														}
													>
														<i className="pi pi-times"></i>
													</button>
												</div>
											</div>

											<div className="flex-grow">
												<ul>
													{item.guisos &&
														item.guisos.length >
															0 && (
															<li>
																<strong>
																	Selección:
																</strong>{" "}
																{item.guisos
																	.filter(
																		(
																			guiso
																		) =>
																			guiso.select
																	)
																	.map(
																		(
																			guiso
																		) =>
																			guiso.nombre
																	)
																	.join(", ")}
															</li>
														)}
													<div className="flex flex-row justify-between">
														{item.cantidadNiños &&
														item.cantidadNiños >
															0 ? (
															<>
																<li>
																	<strong>
																		Cantidad
																		Adultos:
																	</strong>{" "}
																	{
																		item.cantidadAdultos
																	}
																</li>
																<li>
																	<strong>
																		Cantidad
																		Niños:
																	</strong>{" "}
																	{
																		item.cantidadNiños
																	}
																</li>
															</>
														) : (
															<li>
																<strong>
																	Cantidad:
																</strong>{" "}
																{
																	item.cantidadAdultos
																}
															</li>
														)}
														<li>
															<strong>
																Precio:
															</strong>{" "}
															{"$" + item.precio}
														</li>
													</div>
												</ul>
											</div>
											<div className="text-right mt-4">
												<strong>Total:</strong> {"$"}
												{(
													(item.precio || 0) *
														(item.cantidadAdultos ||
															0) +
													(item.precioNiño || 0) *
														(item.cantidadNiños ||
															0)
												).toFixed(2)}
											</div>
										</div>
									</Card>
								</div>
							))
						) : (
							<div className="text-center text-gray-500 mt-4">
								No se ha seleccionado ningún platillo.
							</div>
						)}
					</div>
					<div className="sticky bottom-0 bg-white p-2">
						<div className="flex justify-between items-center font-bold text-lg ">
							<span className="text-black">Total General:</span>
							<span className="text-black">
								$
								{(
									carrito.reduce((sum, item) => {
										const totalAdultos =
											(item.precio || 0) *
											(item.cantidadAdultos || 0);
										const totalNiños =
											(item.precioNiño || 0) *
											(item.cantidadNiños || 0);
										return sum + totalAdultos + totalNiños;
									}, 0) || 0
								).toFixed(2)}
							</span>
						</div>
						<div className="flex flex-row justify-between gap-2">
							<button
								className="bg-black text-xs text-white py-2 px-4 rounded hover:bg-zinc-800 flex items-center space-x-2 w-36 h-10"
								onClick={vaciarCarrito}
							>
								<i className="pi pi-trash"></i>{" "}
								{/* Ícono de basura 
								<span>Vaciar Carrito</span>
							</button>
							<button className="bg-black text-xs text-white py-2 px-4 rounded hover:bg-zinc-800 flex items-center space-x-2 w-32 h-10">
								{/* Ícono de basura 
								<span>Proceder al Pago</span>
							</button>
						</div>
					</div>
				</Sidebar> */}

				<Card className="w-[100vw] h-[100%]  md:w-[90vw] lg:w-[90vw] xl:w-[80vw] md:p-6 pt-10 ">
					<div className="space-y-4">
						<div className="flex flex-row justify-between">
							<h2 className="text-lg md:text-4xl mb-4 font-bold">
								Detalles de la Reservación
							</h2>
							{/* <Button onClick={() => getFechas()}></Button> */}
							{/* <div className="flex flex-col">
								<p>Fecha de la reserva: </p>
								<p>{fechaString}</p>
							</div> */}
						</div>

						{/* <div className="flex  flex-col md:flex-row justify-between">
							<div className="mb-4 flex flex-col">
								<div className="flex-auto">
									<label
										htmlFor="calendar-timeonly"
										className="text-xl mb-2 font-bold"
									>
										Hora de Inicio
									</label>
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
									>
										<DemoContainer
											components={["TimePicker"]}
										>
											<TimePicker
												label="Hora de Inicio"
												value={startTime}
												onChange={handleTimeChange}
												className="w-[70vw] md:w-[30vw]"
											/>
										</DemoContainer>
									</LocalizationProvider>
								</div>
							</div>

							<div className="mb-4">
								<label
									htmlFor="calendar-timeonly"
									className="text-xl mb-2 font-bold"
								>
									Hora de Fin
								</label>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DemoContainer components={["TimePicker"]}>
										<TimePicker
											label="Hora de Fin"
											value={startTime}
											onChange={handleTimeEndChange}
											className="w-[70vw] md:w-[30vw] "
										/>
									</DemoContainer>
								</LocalizationProvider>
							</div>
						</div> */}
						{/* <div>
							<h2 className="text-xl mb-2 font-bold ">
								Servicios
							</h2>
						</div> */}

						{/* <Accordion activeIndex={0} className="p-0 m-0">
							<AccordionTab
								header="Desayuno(Solo Salones)"
								className="p-0 m-0"
							>
								<Servicios
									descripcion={
										<div className="space-y-2">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Café Refill, un jugo de naranja
												por persona. Personal: Un mesero
												por cada dos mesas *(10 personas
												máximo por mesa) . Cuando el
												evento exceda de dos mesas *, el
												socio pagará un mesero extra
												(obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Un platillo, un plato de fruta,
												salsa, frijoles refritos y
												tortillas.
											</p>
											<p>
												<span className="font-bold">
													Entrada:
												</span>{" "}
												1 Un jugo de naranja y un plato
												de fruta.
											</p>
										</div>
									}
									servicio={desayunoSalones}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos (Una opción a elegir):"
									politicas={politicasList}
									showListPlatillos={true}
								/>
							</AccordionTab>

							<AccordionTab header="Desayuno Buffet(Salones y palapas)">
								<Servicios
									descripcion={
										<div>
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Salón:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Palapa:
												</span>{" "}
												Mantelería (asignada por área de
												eventos), mesas, sillas, plaqué,
												loza de Melamina.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Café Refill.
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Alimentos: Un plato fuerte,
												salsa, frijoles y tortillas.
											</p>
										</div>
									}
									servicio={desayunoBuffet}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos (Una opción a elegir):"
									politicas={politicasList}
									showListPlatillos={true}
								/>
							</AccordionTab>
							<AccordionTab header="Buffet Taquiza">
								<Tacos
									descripcion={
										<div>
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Salón:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Palapa:
												</span>{" "}
												Mantelería (asignada por área de
												eventos), mesas, sillas, plaqué,
												loza de Melamina.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Café Refill.
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Alimentos: Un plato fuerte,
												salsa, frijoles y tortillas.
											</p>
										</div>
									}
									servicio={buffetTaquiza}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Guisos(4 opciones a elegir)"
									politicas={politicasList}
									initialPlatillo={buffetTaquiza.platillos[0]}
									isBuffet={true}
								/>
							</AccordionTab>
							<AccordionTab header="Tacos">
								<Tacos
									descripcion={
										<div>
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Salón:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Palapa:
												</span>{" "}
												Mantelería (asignada por área de
												eventos), mesas, sillas, plaqué,
												loza de Melamina.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Café Refill.
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Alimentos: Un plato fuerte,
												salsa, frijoles y tortillas.
											</p>
										</div>
									}
									servicio={Taquiza}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillo:"
									politicas={politicasList}
									isBuffet={false}
								/>
								{/* <Servicios
									descripcion={
										<div>
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Salón:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Palapa:
												</span>{" "}
												Mantelería (asignada por área de
												eventos), mesas, sillas, plaqué,
												loza de Melamina.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Refresco Refill (Se retira
												después de las 4 hrs.) En caso
												de pagar descorc he y le sobren
												bebidas se queda con un refresco
												desec hable de 1.5 lt a su
												elección.
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Frijoles refritos, a rroz, sa
												lsas, limones y tortillas.
											</p>
										</div>
									}
									servicio={desayunoSalones}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos (Una opción a elegir):"
									politicas={politicasList}
								/> */}
						{/* </AccordionTab>
							<AccordionTab header="Parrilladas">
								<Servicios
									descripcion={
										<div className="space-y-2">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Café Refill, un jugo de naranja
												por persona. Personal: Un mesero
												por cada dos mesas *(10 personas
												máximo por mesa) . Cuando el
												evento exceda de dos mesas *, el
												socio pagará un mesero extra
												(obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Un platillo, un plato de fruta,
												salsa, frijoles refritos y
												tortillas.
											</p>
											<p>
												<span className="font-bold">
													Entrada:
												</span>{" "}
												1 Un jugo de naranja y un plato
												de fruta.
											</p>
										</div>
									}
									servicio={parrillada}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Parrillada"
									politicas={politicasList}
									showListPlatillos={true}
								/>
							</AccordionTab>
							<AccordionTab header="Alimentos en Palapas">
								<Servicios
									descripcion={
										<div className="space-y-2">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												Senentregan los alimentos a la
												hora indicada por el socio
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Incluye un refresco o agua de
												600ml
											</p>
										</div>
									}
									servicio={alimentosEnPlapas}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Parrillada"
									politicas={politicasAlimentosPalapas}
									showListPlatillos={true}
								/>
							</AccordionTab>
							<AccordionTab header="Alimentos en Palapas con Servicio">
								<Servicios
									descripcion={
										<div className="space-y-2">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												Servicio de comida 1 hora
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Parrrillada o plancha, etc. /Se
												sirve en desechable
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												NO incluye
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Solo personal de cocina.
											</p>
										</div>
									}
									servicio={alimentosEnPlapasConServicio}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos(Una opcion a elegir)"
									politicas={
										politicasAlimentosPalapasConServicio
									}
									showListPlatillos={true}
								/>
							</AccordionTab>
							<AccordionTab header="Servicio de Meriendas">
								<Servicios
									descripcion={
										<div className="space-y-2">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1hr.
												máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Manteleria, mesas, sillas,
												plaqué, loza de cerámica.
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Refresco refill
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Un platillo, un plato de fruta,
												salsa, frijoles refritos y
												tortillas.
											</p>
											<p>
												<span className="font-bold">
													Entrada:
												</span>{" "}
												<p>Ensalada de frutos rojos</p>
												<p>Ensalada hawaiana</p>
												<p>Esquites</p>
											</p>
										</div>
									}
									servicio={meriendas}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos(Una opcion a elegir)"
									politicas={
										politicasAlimentosPalapasConServicio
									}
									showListPlatillos={true}
								/>
							</AccordionTab>
							<AccordionTab header="Pozole">
								<OneService
									descripcion={
										<div className="space-y-2">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1hr.
												máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>
												<p className="text-justify">
													<span className="font-bold">
														Salón:
													</span>{" "}
													Manteleria, mesas, sillas,
													plaqué, loza de cerámica.
												</p>
												<p className="text-justify">
													<span className="font-bold">
														Palapa:
													</span>{" "}
													Manteleria, mesas, sillas,
													plaqué, loza de cerámica.
												</p>
											</p>

											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Refresco refill
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas
												*(10 personas máximo por mesa) .
												Cuando el evento exceda de dos
												mesas*, el socio pagará un
												mesero extra (obligatorio).
											</p>
											<p>
												<span className="font-bold">
													Alimentos:
												</span>{" "}
												Un platillo, un plato de fruta,
												salsa, frijoles refritos y
												tortillas.
											</p>
											<p>
												<span className="font-bold">
													Entrada:
												</span>{" "}
												<p>Ensalada de frutos rojos</p>
												<p>Ensalada hawaiana</p>
												<p>Esquites</p>
											</p>
										</div>
									}
									servicio={pozole}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos(Una opcion a elegir)"
									politicas={
										<div>
											<li>
												Se separará el lugar con 2 mil
												pesos y firma del contrato.
											</li>
											<li>
												Los alimentos deberán ser
												liquidados 5 días antes del
												evento.
											</li>
											<li>
												Vinos y Licores son
												proporcionados por el socio y
												deberá pagar descorche.
											</li>
											<li>
												Descorche por botella de menos
												de un litro cuesta $190.00
											</li>
											<li>
												El vino de mesa no tiene costo
												de descorche.
											</li>
											<li>
												No se permite el ingreso de
												alimentos externos (solo botana
												y postres).
											</li>
											<li>Precios incluyen IVA</li>
											<li>
												Obligatorio entregar el listado
												de invitados mínimo 3 días antes
												del evento (incluyendo socios).
											</li>
											<li>
												Mínimo de 20 personas para
												contratar el servicio.
											</li>
											<li>
												Cualquier cambio indispensable
												notificar una semana antes del
												evento.
											</li>
											<li>
												Contratando este servicio en
												palapas, No se cobra el acceso
												de invitado
											</li>
										</div>
									}
								/>
							</AccordionTab>
							<AccordionTab header="Canapes">
								<Servicios
									descripcion={
										<div className="space-y-2 ">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (Servicio de comida 1
												hr. máximo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Mantelería, mesas banqueteras,
												sillas y loza
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												No incluye
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												3 meseros
											</p>
											<div className="my-list-container">
												<div className="flex flex-row justify-between pr-4">
													<span className="font-bold">
														OPCIÓN 1:
													</span>
													<span className="font-bold">
														$180.00
													</span>
												</div>

												<ul className="columns-2 gap-4 md:columns-2  p-2">
													<li>Camarón Roca</li>
													<li>Tacos artesanales</li>
													<li>Gazpacho de melón</li>
													<li>Pepino con surimi</li>
													<li>Musse de oreo</li>
													<li>Musse de mango</li>
													<li>Pay de manzana</li>
												</ul>
											</div>
											<div className="my-list-container">
												<div className="flex flex-row justify-between pr-4">
													<span className="font-bold">
														OPCIÓN 2:
													</span>
													<span className="font-bold">
														$200.00
													</span>
												</div>
												<ul className="columns-2 gap-4 md:columns-2  p-2">
													<li>Camarón Roca</li>
													<li>Tacos artesanales</li>
													<li>Gazpacho de melón</li>
													<li>Pepino con surimi</li>
													<li>Musse de oreo</li>
													<li>Musse de mango</li>
													<li>Pay de manzana</li>
												</ul>
											</div>
											<div className="my-list-container">
												<div className="flex flex-row justify-between pr-4">
													<span className="font-bold">
														OPCIÓN 3:
													</span>
													<span className="font-bold">
														$390.00
													</span>
												</div>
												<ul className="columns-2 gap-4 md:columns-2  p-2">
													<li>Camarón Roca</li>
													<li>Tacos artesanales</li>
													<li>Gazpacho de melón</li>
													<li>Pepino con surimi</li>
													<li>Musse de oreo</li>
													<li>Musse de mango</li>
													<li>Pay de manzana</li>
												</ul>
											</div>
										</div>
									}
									servicio={canapes}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Canapes (Una opción a elegir):"
									politicas={politicasCanapés}
									showListPlatillos={false}
								/>
							</AccordionTab>
							<AccordionTab header="Comidas y Cenas Formales">
								<CenasFormalesService
									descripcion={
										<div className="space-y-2 ">
											<p className="font-bold text-justify">
												Nuestros servicios incluyen:
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Duración:
												</span>{" "}
												4 horas (1er y 2do tiempo) 5
												horas (3er tiempo)
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Equipo:
												</span>{" "}
												Mantelería, mesas, sillas,
												plaqué, loza de cerámica
											</p>
											<p className="text-justify">
												<span className="font-bold">
													Bebidas:
												</span>{" "}
												Refresco refill(Se retira
												despues de las 4 hrs)
											</p>
											<p>
												<span className="font-bold">
													Personal:{" "}
												</span>
												Un mesero por cada dos mesas*
												(10 personas maximo por mesa)
												Cuando el evento exceda de dos
												mesas* el socio pagara un mesero
												extra(obligatorio)
											</p>
											<p>
												<span className="font-bold">
													Alimentos:{" "}
												</span>
												A un tiempo: plato fuerte; A dos
												tiempos: entrada y plato fuerte;
												A tres tiempos entrada, palto
												fuerte y postre
											</p>
										</div>
									}
									politicas={
										<div className="space-y-2 ">
											<ul className="list-disc md:list-none">
												<li>Se separa el lugar con 2 mil pesos y firmas del contrato</li>
												<li>Los alimentos deberián ser liquidados 5 dias antes del evento</li>
												<li>Vinos y Licores son proporcionados por el socio y deberá pagar descorche.</li>
												<li>Descorche por botella de menos de un litro cuesta $190.00</li>
												<li>El vino de mesa no tiene costo de descorche.</li>
												<li>No se permite el ingreso de alimentos externos (solo botana y postres).</li>
												<li>Precios incluyen IVA.</li>
												<li>Obligatorio entregar el listado de invitados mínimo 3 días antes del evento (incluyendo socios) .</li>
												<li>Mínimo de 20 personas para contratar el servicio.</li>
												<li>Cualquier cambio indispensable notificar una semana antes del evento.</li>

											</ul>
										</div>
									}
									listaPrecios={
										<PlatosCena platillos={platillosCena} />
									}
									servicio={canapes}
									agregarPlatilloAlCarrito={
										agregarPlatilloAlCarrito
									}
									titulo="Platillos (Una opción a elegir):"
								/>
							</AccordionTab>
						</Accordion> */}

						<div className="flex flex-col md:flex-row md:justify-between items-center justify-center md:items-start gap-4">
							<Calendar
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.value!)}
								inline
								className="w-[100vw] sm:w-[41vw] custom-calendar "
								disabledDates={disabledDates} // Aquí pasas las fechas no disponibles
								monthNavigator
								yearNavigator
								yearRange="2023:2024" // Personaliza el rango de años
								showIcon={false} // Opcionalmente ocultar el ícono de calendario
							/>
							{/* <Calendar
								value={selectedDate}
								onChange={(date) =>
									setSelectedDate(date as Date)
								}
								tileDisabled={tileDisabled} // Aquí pasas las fechas no disponibles
								className="w-[2000px] sm:w-[41vw]"
								
							/> */}
							{/* <DatePicker
								selected={selectedDate}
								onChange={(date: Date | null) => setSelectedDate(date)}
								inline
								className="w-[100vw] sm:w-[41vw] h-72"
								
								excludeDates={disabledDates} // Fechas deshabilitadas obtenidas de la API
							/> */}
							<div className="flex flex-col w-[100vw]  md:w-2/3 xl:w-1/2 p-2 pl-5 ">
								<div className="flex flex-col  sm:flex-col md:flex-col lg:flex-row md:justify-between gap-2">
									<div className="mb-4 flex flex-col    ">
										<label htmlFor="numTables">
											Número de mesas
										</label>
										<div className="">
											<InputNumber
												value={numTables}
												onChange={(e) =>
													setNumTables(e.value)
												}
												min={1}
											/>
										</div>
										<small
											id="miInput-help"
											className="p-d-block p-mt-2 p-text-muted"
										>
											Por cada mesa se incluye 10 sillas.
										</small>
									</div>
									<div className="mb-4 flex flex-col ">
										<label htmlFor="numTables">
											Número de Manteles
										</label>
										<InputNumber
											value={numManteles}
											onChange={(e) =>
												setNumManteles(e.value)
											}
											min={1}
											// placeholder="Número de mesas"
										/>
									</div>
								</div>

								<div className="flex flex-col lg:flex-row  xl:flex-row  justify-between">
									<div className="mb-4 flex flex-col w-screen pr-20 md:pr-0 md:w-1/2">
										<label htmlFor="foodType">
											Color de manteles
										</label>
										<div className="flex flex-row align-middle items-center:">
											<Dropdown
												value={selectedColor}
												options={colors}
												onChange={(e) =>
													setSelectedColor(e.value)
												}
												placeholder="Seleciona Color"
												className="w-5/6"
											/>
											{selectedMantel && (
												<Image
													src={selectedMantel}
													zoomSrc={selectedMantel}
													alt="Mantel"
													// width="60"
													// height="60"
													preview
													// className="w-[70px] h-[60px]  md:w-[50px] md:h-[50px]  "
													className="w-1/6  "
												/>
											)}
										</div>
									</div>
									<div className="mb-4 flex flex-col ">
										<label htmlFor="newGuest">
											Agregar nuevo invitado
										</label>
										<div className="flex gap-2">
											<div className="p-inputgroup flex-1">
												<InputText
													className="rounded-r-none"
													id="newGuest"
													value={newGuest.nombre}
													onChange={(e) =>
														setNewGuest({
															...newGuest, // Mantener los valores actuales de newGuest
															nombre: e.target
																.value, // Actualizar solo el nombre
														})
													}
													placeholder="Nombre del invitado"
												/>
												<Button
													icon="pi pi-plus"
													className="rounded-l-none"
													severity="info"
													onClick={addGuest}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col">
									<label htmlFor="">
										Desea agregar una mesa tablon?
									</label>
									<div className="flex align-items-center">
										<Checkbox
											value="Tablon"
											onChange={(e) =>
												setTablon(e.checked!)
											}
											checked={tablon}
										/>
										<label className="ml-2">Tablon</label>
									</div>
								</div>
							</div>
						</div>

						<div className="p-2 flex flex-col md:flex-row">
							<div className="mb-4 md:w-1/2 lg:1/2">
								<label
									htmlFor="calendar-timeonly"
									className="font-bold block mb-2"
								>
									Notas Adicionales de la reservacion
								</label>
								<span className="p-float-label">
									<InputTextarea
										value={comments}
										onChange={(e) =>
											setComments(e.target.value)
										}
										rows={5}
										className="w-[100%] "
										placeholder="Notas"
									/>
								</span>
							</div>
							<ResponsiveDivider></ResponsiveDivider>
							<div className="mb-4 flex flex-col ">
								<div className="flex flex-row gap-2">
									<label
										htmlFor="guestList"
										className="font-bold"
									>
										Lista de invitados
									</label>
									<label
										htmlFor="guestList"
										className="font-bold"
									>
										Cantidad de Invitados:{" "}
										{guestList.length}
									</label>
								</div>
								<ul className="list-none max-h-64 overflow-y-auto overflow-x-auto ">
									{guestList.map((guest, index) => (
										<li
											key={index}
											className="mb-1 flex gap-4 items-center py-2 border-b-2"
										>
											<Button
												icon="pi pi-times"
												className="p-button-danger p-button-text h-8 w-8 justify-center"
												onClick={() =>
													removeGuest(index)
												}
											/>
											<span>{guest.nombre}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="flex justify-end">
							<Button
								label="Reservar"
								className=""
								onClick={addReservation}
							/>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default ReservacionForm;
