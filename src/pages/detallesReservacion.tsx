import { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Invitado, ReservacionResponse } from "../interfaces/interfaces";
import {
	cancelarReservacion,
	obtenerEventosPorId,
	obtenerFechas,
	updateReservacion,
} from "../services/api";
import * as Constants from "../constants";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";
import { usePalapaContext } from "../context/PalapaContext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { addLocale } from "primereact/api";
import { Checkbox } from "primereact/checkbox";

addLocale("es", {
	firstDayOfWeek: 1,
	dayNames: [
		"domingo",
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado",
	],
	dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	dayNamesMin: ["D", "L", "M", "Mi", "J", "V", "S"],
	monthNames: [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	],
	monthNamesShort: [
		"ene",
		"feb",
		"mar",
		"abr",
		"may",
		"jun",
		"jul",
		"ago",
		"sep",
		"oct",
		"nov",
		"dic",
	],
	today: "Hoy",
	clear: "Limpiar",
	dateFormat: "dd/mm/yy",
	weekHeader: "Sem",
});

export default function ResumenReservacion() {
	const { selectedPalapa } = usePalapaContext(); // Accede al ID desde el contexto
	const [editando, setEditando] = useState<boolean>(false);
	const [reservacion, setReservacion] = useState<ReservacionResponse | null>(
		null
	);
	const colors: string[] = ["Negro", "Chocolate"];
	const toast = useRef<Toast>(null);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const selectedMantel =
		selectedColor === "Chocolate"
			? Constants.mantel1
			: selectedColor === "Negro"
			? Constants.mantel2
			: null;
	const Navigate = useNavigate();
	const [visible, setVisible] = useState(false); // Controla la visibilidad del diálogo
	const [estatusDialog, setEstatusDialog] = useState<string>(""); // Controla el estatus del diálogo
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);
	const capacities = {
		1: 120,
		2: 60,
		3: 40,
		4: 30,
		5: 40,
		6: 90,
		7: 70,
	} as const;
	// Obtener el año actual
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();

	const [newGuest, setNewGuest] = useState({ nombre: "" });
	// Determinar los límites dinámicamente
	const minDate =
		currentMonth >= 11 // Noviembre es 10, Diciembre es 11
			? new Date(currentYear, 11, 15) // 15 de diciembre del año actual
			: new Date(currentYear, 0, 1); // 1 de enero del año actual

	const maxDate =
		currentMonth >= 11
			? new Date(currentYear + 1, 11, 31) // 31 de diciembre del próximo año
			: new Date(currentYear, 11, 31); // 31 de diciembre del año actual

	const getFechas = async (palapaId: number) => {
		try {
			const respuesta = await obtenerFechas(palapaId); // Llamada a la API
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
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Obtener la reservación primero
				const respuestaReservacion = await getReservaciones();

				// Ejecutar getFechas solo si la reservación está definida
				if (respuestaReservacion) {
					await getFechas(respuestaReservacion.palapa_id);
				} else {
					console.warn("No se pudo obtener la reservación.");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

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

	const getReservaciones = async () => {
		try {
			const respuesta = await obtenerEventosPorId(); // Llamada a la API
			if (respuesta) {
				setReservacion(respuesta);
				return respuesta;
				// console.log("Reservación obtenida:", respuesta); // Verificación
			} else {
				console.warn("No se recibió una respuesta válida de la API.");
			}
		} catch (error) {
			console.error("Error al obtener la reservación:", error);
		}
	};

	const handleCancelarReservacion = () => {
		const fechaActual = new Date();
		const fechaReservacion = new Date(reservacion?.fecha || "");

		// Decide el estatus según la fecha
		const estatus =
			fechaActual.toDateString() === fechaReservacion.toDateString()
				? "PENALIZADA"
				: "CANCELADA";

		// Guarda el estatus y muestra el diálogo
		setEstatusDialog(estatus);
		setVisible(true);
	};

	const confirmCancelation = async () => {
		try {
			if (!reservacion?.id) {
				console.error("No se encontró el ID de la reservación.");
				return;
			}

			// Llama al servicio con el estatus dinámico
			await cancelarReservacion(reservacion.id, estatusDialog);

			// Cierra el diálogo
			setVisible(false);

			// Redirige al usuario
			Navigate("/Login");
			console.log(`Reservación cancelada con estatus: ${estatusDialog}`);

			// Muestra el mensaje usando Toast
			toast.current?.show({
				severity: estatusDialog === "MULTA" ? "warn" : "success",
				summary: "Reservación Cancelada",
				detail:
					estatusDialog === "MULTA"
						? "Se ha generado una multa de $500 por la cancelación."
						: "La reservación fue cancelada exitosamente.",
			});
		} catch (error) {
			console.error("Error al cancelar la reservación:", error);
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "Ocurrió un error al procesar la cancelación.",
			});
		}
	};

	function calcularCosto(invitados: Invitado[]): number {
		return invitados.reduce((total, invitado) => {
			// Solo considera invitados con un número de pulsera asignado (no null o undefined)
			if (invitado.numero_pulsera != null) {
				return total + (invitado.pulsera_devuelta ? 50 : 200);
			}
			return total;
		}, 0);
	}

	const handleDateChange = (e: any) => {
		setReservacion((prev) => {
			if (prev) {
				return { ...prev, fecha: e.value.toISOString() };
			}
			return prev;
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (reservacion) {
			try {
				// Llama a updateReservacion para enviar los datos editados al backend
				const update = {
					fecha: reservacion.fecha,
					numero_mesas: reservacion.numero_mesas,
					numero_manteles: reservacion.numero_manteles,
					color_manteles: reservacion.color_manteles,
					notas: reservacion.notas,
					estatus: reservacion.estatus,
					invitados: reservacion.invitados, // Lista de invitados
					tablon: reservacion.tablon,
				};
				console.log("Invitados", update.invitados);
				await updateReservacion(reservacion.id, update);
				console.log("Reservación actualizada en el backend");
				getFechas(reservacion.palapa_id);
				setEditando(false); // Cierra el modo edición tras la actualización
			} catch (error) {
				console.error("Error al actualizar la reservación:", error);
			}
		}
	};

	// Función para agregar un nuevo invitado
	const addGuest = () => {
		const maxCapacity =
			capacities[selectedPalapa as keyof typeof capacities] || 0;

		if (reservacion!.invitados.length >= maxCapacity) {
			toast.current?.show({
				severity: "warn",
				summary: "Capacidad máxima alcanzada",
				detail: `El límite de invitados para la Palapa ${selectedPalapa} es de ${maxCapacity}.`,
				life: 3000, // Tiempo en milisegundos que el Toast estará visible
			});
			return;
		}
		setReservacion((prev) => {
			if (prev) {
				const nuevosInvitados = [
					...prev.invitados,
					{
						id: null, // Será asignado en el backend
						nombre: newGuest.nombre.trim(), // Guardamos el nombre
						check_in: false,
						numero_pulsera: undefined,
						pulsera_devuelta: false,
					},
				];
				return {
					...prev,
					invitados: nuevosInvitados,
				};
			}
			return prev;
		});

		// Reiniciar el input después de agregar el invitado
		setNewGuest({ nombre: "" });
	};

	const eliminarInvitado = (index: number) => {
		setReservacion((prev) => {
			if (prev) {
				const nuevosInvitados = prev.invitados.filter(
					(_, i) => i !== index
				);
				return {
					...prev,
					invitados: nuevosInvitados,
				};
			}
			return prev;
		});
	};

	// Actualizar invitado
	const actualizarInvitado = (index: number, valor: string) => {
		if (!valor.trim()) return; // Evitar valores en blanco

		setReservacion((prev) => {
			if (prev) {
				const nuevosInvitados = prev.invitados.map((invitado, i) =>
					i === index
						? { ...invitado, nombre: valor.trim() }
						: invitado
				);
				return {
					...prev,
					invitados: nuevosInvitados,
				};
			}
			return prev;
		});
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<Toast ref={toast} />
			<div className="flex justify-between items-center p-4 border-b">
				<h2 className="text-2xl font-bold">
					Resumen de Reservación de Palapa
				</h2>
				{reservacion && (
					<Badge
						value={reservacion.estatus}
						className={
							reservacion.estatus === "activa"
								? "bg-blue-500"
								: "bg-gray-500"
						}
					/>
				)}
			</div>
			<div className="p-4">
				{editando && reservacion ? (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col md:flex-row justify-between">
							<div>
								<label
									htmlFor="fecha"
									className="block font-semibold"
								>
									Fecha
								</label>
								<Calendar
									locale="es" // Cambiar el idioma a español
									id="fecha"
									value={
										reservacion?.fecha
											? new Date(reservacion.fecha)
											: undefined
									}
									onChange={handleDateChange}
									disabledDates={disabledDates}
									minDate={minDate} // Fecha mínima permitida
									maxDate={maxDate} // Fecha máxima permitida
									monthNavigator
									dateFormat="yy-mm-dd"
									className="w-full"
									required
									showIcon
								/>
							</div>
							<div className="mb-4 flex flex-col ">
								<label
									htmlFor="calendar-timeonly"
									className="font-bold block mb-2"
								>
									Hora de Inicio
								</label>
								<Calendar
									id="calendar-timeonly"
									value={
										reservacion?.hora_inicio
											? new Date(reservacion.hora_inicio)
											: undefined
									}
									onChange={(e) => {
										const selectedTime =
											e.value as Date | null;

										if (selectedTime) {
											const hours =
												selectedTime.getHours();
											const minutes =
												selectedTime.getMinutes();

											// Validar el rango permitido: 08:00 AM a 09:00 PM
											if (
												(hours >= 8 && hours < 21) ||
												(hours === 21 && minutes === 0)
											) {
												setReservacion((prev) =>
													prev
														? {
																...prev,
																hora_inicio:
																	selectedTime.toISOString(),
														  }
														: prev
												);
											} else {
												alert(
													"Por favor selecciona una hora entre 08:00 AM y 09:00 PM"
												);
											}
										}
									}}
									timeOnly
									hourFormat="24"
									className="w-full p-inputtext-sm"
								/>
							</div>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<div>
								<label
									htmlFor="numeroMesas"
									className="block font-semibold"
								>
									Número de Mesas
								</label>
								<InputNumber
									id="numeroMesas"
									value={reservacion?.numero_mesas}
									onValueChange={(e) =>
										setReservacion((prev) =>
											prev
												? {
														...prev,
														numero_mesas:
															e.value || 0,
												  }
												: prev
										)
									}
									required
									min={1}
									className="w-full"
								/>
							</div>
							<div>
								<label
									htmlFor="numeroManteles"
									className="block font-semibold"
								>
									Número de Manteles
								</label>
								<InputNumber
									id="numeroManteles"
									value={reservacion?.numero_manteles}
									onValueChange={(e) =>
										setReservacion((prev) =>
											prev
												? {
														...prev,
														numero_manteles:
															e.value || 0,
												  }
												: prev
										)
									}
									required
									min={1}
									className="w-full"
								/>
							</div>
						</div>
						<div className="flex flex-col md:flex-row justify-between">
							<div>
								<label
									htmlFor="colorManteles"
									className="block font-semibold"
								>
									Color de los Manteles
								</label>
								<div className="flex flex-row justify-start">
									<Dropdown
										value={reservacion?.color_manteles}
										options={colors}
										onChange={(e) => {
											setSelectedColor(e.value);
											setReservacion((prev) =>
												prev
													? {
															...prev,
															color_manteles:
																e.value,
													  }
													: prev
											);
										}}
										placeholder={
											reservacion?.color_manteles ||
											"Selecciona un color"
										}
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
											className="w-12  "
										/>
									)}
								</div>
							</div>
							<div className="flex flex-col justify-around">
								<label htmlFor="" className="block font-semibold">
									Desea agregar una mesa tablon?
								</label>
								<div className="flex align-items-center">
									<Checkbox
										value="Tablon"
										onChange={(e) => {
											const isChecked = e.target.checked; // Asegurar el valor booleano
											setReservacion((prev) => {
												if (!prev) return null; // Si prev es null, no hacemos nada
												return {
												  ...prev,
												  tablon: isChecked || false, // Garantizamos que siempre será un booleano
												};
											  });
										}}
										checked={reservacion?.tablon}
									/>
									<label className="ml-2">Tablon</label>
								</div>
							</div>
						</div>

						<div>
							<label
								htmlFor="notas"
								className="block font-semibold"
							>
								Notas
							</label>
							<InputTextarea
								id="notas"
								value={reservacion?.notas}
								onChange={(e) =>
									setReservacion((prev) =>
										prev
											? { ...prev, notas: e.target.value }
											: prev
									)
								}
								rows={3}
								className="w-full"
							/>
						</div>
						<div>
							<label className="block font-semibold">
								Lista de Invitados
							</label>
							{reservacion?.invitados?.map((invitado, index) => (
								<div
									key={index}
									className="flex items-center mt-2 "
								>
									<InputText
										value={invitado.nombre}
										onChange={(e) =>
											actualizarInvitado(
												index,
												e.target.value
											)
										}
										placeholder="Nombre del invitado"
										className="w-full"
									/>
									<Button
										type="button" // Asegura que no refresque la página
										icon="pi pi-times"
										className="p-button-text ml-2"
										onClick={() => eliminarInvitado(index)}
									/>
								</div>
							))}
							{/* <Button
								type="button"
								label="Agregar Invitado"
								onClick={agregarInvitado}
								className="mt-2 w-full"
							/> */}
							<div className="p-inputgroup flex-1 mt-2 w-full">
								<InputText
									className="rounded-r-none w-full"
									id="newGuest"
									value={newGuest.nombre}
									onChange={(e) =>
										setNewGuest({
											...newGuest,
											nombre: e.target.value,
										})
									}
									onKeyPress={(e) => {
										// Validar que solo se ingresen letras y espacios
										const regex = /^[a-zA-Z\s]*$/;
										if (!regex.test(e.key)) {
											e.preventDefault();
										}
									}}
									placeholder="Nombre del invitado"
								/>
								<Button
									icon="pi pi-plus"
									className="rounded-l-none"
									severity="info"
									disabled={!newGuest.nombre.trim()} // Habilitado solo si el nombre es válido
									onClick={addGuest}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-2">
							<Button
								type="submit"
								label="Guardar cambios"
								icon="pi pi-save"
								className="w-full mt-4"
							/>
							<Button
								onClick={() => setEditando(false)}
								label="Cancelar"
								icon="pi pi-trash"
								className="w-full mt-4"
							/>
						</div>
					</form>
				) : (
					reservacion && (
						<div className="space-y-4">
							<p className="text-lg font-semibold">
								Reservación #{reservacion.id}
							</p>
							<div className="flex flex-row  gap-4">
								<div>
									<i className="pi pi-calendar mr-2 text-gray-500"></i>

									<span>
										{new Date(
											reservacion.fecha
										).toLocaleDateString()}
									</span>
								</div>
								<div>
									<i className="pi pi-clock mr-2 text-gray-500"></i>
									<span className="ml-2">
										{/* Muestra solo la hora */}
										{new Date(
											reservacion.hora_inicio
										).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
							</div>

							<div>
								<i className="pi pi-users mr-2 text-gray-500"></i>
								<span>
									{reservacion.invitados?.length || 0}{" "}
									personas
								</span>
							</div>
							<div>
								<i className="pi pi-dollar mr-2 text-gray-500"></i>
								<span>
									{calcularCosto(reservacion.invitados || [])}{" "}
									pesos
								</span>
							</div>
							<div>
								<p className="font-semibold">
									Mesas y Manteles:
								</p>
								<p>
									{reservacion.numero_mesas} mesas,{" "}
									{reservacion.numero_manteles} manteles{" "}
									{reservacion.color_manteles}
								</p>
							</div>
							<div>
								<p className="font-semibold">Notas:</p>
								<p>{reservacion.notas}</p>
							</div>
							<div>
								<p className="font-semibold">Tablon:</p>
								<p>{reservacion.tablon ? "Si" : "No"}</p>
							</div>
							<div>
								<p className="font-semibold">
									Lista de Invitados:
								</p>
								<ul className="list-disc list-inside">
									{reservacion.invitados?.map(
										(invitado, index) => (
											<li key={index}>
												{invitado.nombre}
												{/* Muestra el número de pulsera y el estado de devolución solo si numero_pulsera no es undefined */}
												{invitado.numero_pulsera !==
													undefined &&
													invitado.numero_pulsera !==
														null && (
														<span>
															{" "}
															- Pulsera #
															{
																invitado.numero_pulsera
															}{" "}
															-{" "}
															{invitado.pulsera_devuelta
																? "Devolvió"
																: "No devolvió"}
														</span>
													)}
											</li>
										)
									)}
								</ul>
							</div>

							<Button
								label="Editar reservación"
								icon="pi pi-pencil"
								onClick={() => setEditando(true)}
								className="w-full mt-4"
							/>
							<Button
								label="Cancelar Reservacion"
								className="w-full mt-4"
								onClick={handleCancelarReservacion} // Llama a la función al hacer clic
							/>
						</div>
					)
				)}
			</div>
			<Dialog
				visible={visible}
				onHide={() => setVisible(false)}
				header="Confirmar Cancelación"
				footer={
					<div>
						<Button
							label="No"
							icon="pi pi-times"
							onClick={() => setVisible(false)}
							className="p-button-text"
						/>
						<Button
							label="Sí"
							icon="pi pi-check"
							onClick={confirmCancelation} // Llama a la función para confirmar
							className="p-button-danger"
						/>
					</div>
				}
			>
				<p>
					¿Estás seguro de que deseas cancelar la reservación?{" "}
					{estatusDialog === "MULTA"
						? "Esto generará una multa de $500."
						: "No habrá multa aplicada."}
				</p>
			</Dialog>
		</Card>
	);
}
