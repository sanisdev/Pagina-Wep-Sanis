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
import { ScrollPanel } from "primereact/scrollpanel";
import { usePalapaContext } from "../../context/PalapaContext";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

const ReservacionForm: React.FC = () => {
	const { selectedPalapa } = usePalapaContext(); // Accede al ID desde el contexto
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
	// Mapa de capacidades máximas por palapa
	const capacities = {
		1: 120,
		2: 60,
		3: 40,
		4: 30,
		5: 40,
		6: 90,
		7: 70,
	} as const;

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
	// Obtener el año actual
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();

	// Determinar los límites dinámicamente
	const minDate =
		currentMonth >= 11 // Noviembre es 10, Diciembre es 11
			? new Date(currentYear, 11, 15) // 15 de diciembre del año actual
			: new Date(currentYear, 0, 1); // 1 de enero del año actual

	const maxDate =
		currentMonth >= 11
			? new Date(currentYear + 1, 11, 31) // 31 de diciembre del próximo año
			: new Date(currentYear, 11, 31); // 31 de diciembre del año actual

	// Función para manejar el agregado de un nuevo invitado
	const addGuest = () => {
		if (!selectedPalapa) {
			alert("No hay ninguna palapa seleccionada.");
			return;
		}

		const maxCapacity =
			capacities[selectedPalapa as keyof typeof capacities] || 0;

		if (guestList.length >= maxCapacity) {
			alert(
				`El límite de invitados para la Palapa ${selectedPalapa} es de ${maxCapacity}.`
			);
			return;
		}

		if (
			newGuest.nombre &&
			!guestList.some((guest) => guest.nombre === newGuest.nombre)
		) {
			setGuestList([
				...guestList,
				{ ...newGuest, id: guestList.length + 1 },
			]);
			setNewGuest({
				id: 0,
				nombre: "",
				check_in: false,
				numero_pulsera: 0,
				pulsera_devuelta: false,
			});
		} else {
			alert("El invitado ya está en la lista o el nombre está vacío.");
		}
	};

	const getFechas = async () => {
		try {
			const respuesta = await obtenerFechas(Number(selectedPalapa)); // Llamada a la API
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
			palapa_id: parseInt(selectedPalapa!.toString()), // Asegúrate de que el ID de la palapa sea un número
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
			Navigate("/resumenReservacion");
			// Opcional: Puedes redirigir o limpiar el formulario aquí
		} catch (error) {
			console.error("Error al agregar la reservación:", error);
		}
	};

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
			<div className="flex flex-col justify-center items-center  w-full gap-2 ">
				<Toast ref={toast} />

				<Card className="w-[100vw] h-[100%]  md:w-[90vw] lg:w-[90vw] xl:w-[80vw] md:px-6 pt-10 md:pt-0 ">
					<div className="space-y-4">
						<div className="flex flex-row justify-between">
							<h2 className="text-lg md:text-4xl mb-4 font-bold">
								Detalles de la Reservación
							</h2>
						</div>

						<div className="flex flex-col md:flex-row md:justify-between items-center justify-center md:items-start gap-4">
							<Calendar
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.value!)}
								inline
								className="w-[100vw] sm:w-[41vw] custom-calendar "
								disabledDates={disabledDates} // Aquí pasas las fechas no disponibles
								monthNavigator
								// yearNavigator
								// yearRange="2023:2024" // Personaliza el rango de años
								minDate={minDate} // Fecha mínima permitida
								maxDate={maxDate} // Fecha máxima permitida
								showIcon={false} // Opcionalmente ocultar el ícono de calendario
							/>

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
													onKeyPress={(e) => {
														// Solo permite letras (A-Z, a-z) y espacios
														const regex =
															/^[a-zA-Z\s]*$/;
														if (
															!regex.test(e.key)
														) {
															e.preventDefault(); // Evita que se escriban caracteres no válidos
														}
													}}
													placeholder="Nombre del invitado"
												/>
												<Button
													icon="pi pi-plus"
													className="rounded-l-none"
													severity="info"
													disabled={
														!newGuest.nombre.trim()
													} // Desactiva si está vacío o solo tiene espacios
													onClick={addGuest}
												/>
											</div>
										</div>
											{/* Label para mostrar la capacidad máxima */}
									{selectedPalapa && (
										<p className="text-gray-500 text-sm">
											Capacidad máxima de invitados:{" "}
											{
												capacities[
													selectedPalapa as keyof typeof capacities
												]
											}
											.
										</p>
									)}
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
										className="w-[100%] max-h-80"
										placeholder="Notas"
									/>
								</span>
							</div>
							<ResponsiveDivider></ResponsiveDivider>
							<div className="mb-4 flex flex-col ">
								<div className="flex flex-row gap-2 ">
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
								<ScrollPanel
									style={{ width: "100%", height: "200px" }}
								>
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
								</ScrollPanel>
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
