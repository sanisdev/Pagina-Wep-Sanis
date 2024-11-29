import React, { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ResponsiveDivider } from "../../components/ResponsiveDivider";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Invitado, ReservacionResponse } from "../../interfaces/interfaces";
import {
	actualizarEstatusReservacion,
	actualizarInvitado,
	obtenerReservacionesPorMes,
} from "../../services/api";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";

// Configurar localizador de fechas
const locales = {
	es,
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
// Configurar mensajes en español
const messages = {
	next: "Siguiente",
	previous: "Anterior",
	today: "Hoy",
	month: "Mes",
	week: "Semana",
	day: "Día",
	agenda: "Agenda",
	date: "Fecha",
	time: "Hora",
	event: "Evento",
	allDay: "Todo el día",
	noEventsInRange: "No hay eventos en este rango",
	showMore: (total: number) => `+ Ver más (${total})`,
};

export default function PanelReservations() {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [reservations, setReservations] = useState<ReservacionResponse[]>([]);
	const [selectedReservationIndex, setSelectedReservationIndex] = useState<
		number | null
	>(null);
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Mes actual (1-12)
	const toast = useRef<Toast>(null);

	const navigate = useNavigate();

	// Manejar la navegación en el calendario y actualizar el mes actual
	const handleNavigate = (date: Date) => {
		setSelectedReservationIndex(null);
		const newMonth = date.getMonth() + 1;
		if (newMonth !== currentMonth) {
			setCurrentMonth(newMonth); // Actualiza `currentMonth` y `useEffect` se encargará de la solicitud
		}
	};

	// Obtener reservaciones al montar el componente
	useEffect(() => {
		obtenerReservacionesPorMes(currentMonth)
			.then((data) => setReservations(data))
			.catch((error) =>
				console.error("Error al cargar reservaciones:", error)
			);
	}, [currentMonth]);

	const handleGoBack = () => {
		navigate(-1);
	};

	// Filtrar reservaciones para la fecha seleccionada (sin modificar el estado)
	const filteredReservations = selectedDate
		? reservations.filter((reservation) => {
				const reservationDate = new Date(reservation.fecha);
				return (
					reservationDate.getFullYear() ===
						selectedDate.getFullYear() &&
					reservationDate.getMonth() === selectedDate.getMonth() &&
					reservationDate.getDate() === selectedDate.getDate()
				);
		  })
		: reservations;

	// Manejar clic en una reservación para mostrar más detalles
	const handleSelectEvent = (event: ReservacionResponse) => {
		const reservationIndex = reservations.findIndex(
			(res) => res.id === event.id
		);
		if (reservationIndex !== -1) {
			setSelectedReservationIndex(reservationIndex);
		}
	};

	// Manejar clic en una fecha vacía
	const handleSelectSlot = ({ start }: { start: Date }) => {
		setSelectedDate(start);
		setSelectedReservationIndex(null); // Limpiar la reservación seleccionada al hacer clic en una fecha vacía
	};

	// Selección de reservación por índice o desde el calendario
	const handleSelectReservation = (index: number) => {
		setSelectedReservationIndex(index);
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

	// Maneja la finalización de la edición en una fila
	const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
		const { newData, index } = e;

		if (selectedReservationIndex !== null) {
			const updatedReservations = [...reservations];
			const updatedInvitado: Invitado = newData as Invitado;

			// Actualizar el invitado en la lista de invitados de la reservación seleccionada
			updatedReservations[selectedReservationIndex].invitados[index] =
				updatedInvitado;
			setReservations(updatedReservations);

			// Llamada al backend para actualizar el invitado
			try {
				await actualizarInvitado(
					updatedInvitado.id as number,
					updatedInvitado
				);
				toast.current?.show({
					severity: "success",
					summary: "Éxito",
					detail: "Cambio Guardado con exito",
				});
			} catch (error) {
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: "Error al actualizar el invitado.",
				});
				console.error("Error al actualizar el invitado:", error);
			}
		}
	};

	// Editor de texto para los campos
	const textEditor = (options: ColumnEditorOptions) => {
		return (
			<InputText
				type="text"
				value={options.value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					options.editorCallback &&
					options.editorCallback(e.target.value)
				}
				className="w-36"
			/>
		);
	};

	// Editor de checkbox para los campos booleanos
	const checkboxEditor = (options: ColumnEditorOptions) => {
		return (
			<Checkbox
				checked={options.value}
				onChange={(e) =>
					options.editorCallback && options.editorCallback(e.checked)
				}
			/>
		);
	};
	// Editor de texto para campos de solo números
	const numericTextEditor = (options: ColumnEditorOptions) => (
		<InputText
			type="text"
			value={options.value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				const newValue = e.target.value.replace(/\D/g, ""); // Elimina cualquier carácter que no sea un número
				options.editorCallback &&
					options.editorCallback(
						newValue ? parseInt(newValue, 10) : undefined
					);
			}}
			maxLength={4}
			className="w-16" // Ancho reducido en modo de edición
		/>
	);

	const statusOptions = [
		{ label: "PENDIENTE", value: "PENDIENTE" },
		{ label: "EN PROCESO", value: "ENPROCESO" },
		{ label: "CONFIRMADA", value: "CONFIRMADA" },
		{ label: "FINALIZADA", value: "FINALIZADA" },
		{ label: "CANCELADA", value: "CANCELADA" },
		{ label: "PENALIZADA", value: "PENALIZADA" },
	];

	// Manejar cambio de estatus
	const handleStatusChange = async (e: { value: string }) => {
		if (selectedReservationIndex !== null) {
			const newStatus = e.value;
			const reservationId = reservations[selectedReservationIndex].id;

			try {
				await actualizarEstatusReservacion(reservationId, newStatus);

				// Actualizar el estatus en el estado local
				const updatedReservations = [...reservations];
				updatedReservations[selectedReservationIndex] = {
					...updatedReservations[selectedReservationIndex],
					estatus: newStatus,
				};
				setReservations(updatedReservations);
			} catch (error) {
				console.error(
					"Error al actualizar el estatus de la reservación:",
					error
				);
			}
		}
	};

	// Función para renderizar checkbox no editable
	const renderCheckbox = (value: boolean) => (
		<Checkbox checked={value} readOnly />
	);

	return (
		<div className="flex flex-row lg:flex-col justify-center items-center w-full ">
			<Toast ref={toast} /> {/* Componente Toast para mostrar mensajes */}
			<div className="relative flex items-center bg-[#00315D] w-full min-h-[10vh]">
				{/* Contenedor del botón alineado a la izquierda */}
				<div className="absolute left-4">
					<Button
						icon="pi pi-arrow-left"
						aria-label="Regresar"
						onClick={handleGoBack}
						className="p-button-text p-0" // Elimina el relleno adicional del botón
					/>
				</div>

				{/* Título centrado */}
				<h1 className="text-white text-4xl mx-auto">Reservaciones</h1>
			</div>
			<Card className="flex flex-col w-[100vw] min-h-[90vh] md:min-h-[90vh] p-2 ">
				<div className="flex flex-col lg:flex-row gap-4 pt-2">
					<Calendar
						localizer={localizer}
						events={reservations.map((res) => ({
							...res,
							title: res.usuario?.nombre,
							start: new Date(res.fecha),
							end: new Date(res.fecha),
						}))}
						onNavigate={handleNavigate} // Solo actualiza `currentMonth` en el estado
						startAccessor="start"
						endAccessor="end"
						style={{ height: 500 }}
						onSelectEvent={handleSelectEvent}
						onSelectSlot={handleSelectSlot}
						selectable
						views={["month", "week", "day"]}
						defaultView="month"
						messages={messages}
						className="md:w-2/3"
						eventPropGetter={(event) => {
							let backgroundColor = "gray"; // Default color

							if (event.estatus === "CONFIRMADA") {
								backgroundColor = "green";
							} else if (event.estatus === "PENDIENTE") {
								backgroundColor = "orange";
							} else if (event.estatus === "ENPROCESO") {
								backgroundColor = "blue";
							} else if (event.estatus === "CANCELADA") {
								backgroundColor = "black";
							} else if (event.estatus === "FINALIZADA") {
								backgroundColor = "red";
							} else if (event.estatus === "PENALIZADA") {
								backgroundColor = "#7d3c98";
							}

							return {
								style: {
									backgroundColor,
									color: "white",
									borderRadius: "5px",
									padding: "5px",
									border: "none",
								},
							};
						}}
					/>
					<ResponsiveDivider />
					{/* Mostrar detalles de la reservación seleccionada */}
					<div className=" md:w-1/3">
						<div className="flex flex-row items-end justify-between">
							<h2 className="text-center items-center mb-4">
								{selectedReservationIndex
									? `Detalles de la reservación`
									: selectedDate
									? `Reservaciones para el ${selectedDate.toLocaleDateString()}`
									: "Selecciona una fecha o reservación"}
							</h2>
							<div className="flex flex-col">
								<strong>Cambiar Estatus</strong>
								{selectedReservationIndex !== null && (
									<Dropdown
										value={
											reservations[
												selectedReservationIndex
											].estatus
										}
										options={statusOptions}
										onChange={handleStatusChange}
										placeholder="Selecciona un estado"
										style={{ width: "14rem" }}
									/>
								)}
							</div>
						</div>
						{selectedReservationIndex !== null ? (
							<div className="flex flex-col justify-around gap-2">
								<div className="flex flex-row justify-between">
									<p>
										<strong>Numero de Accion:</strong>{" "}
										{
											reservations[
												selectedReservationIndex
											].usuario_id
										}
									</p>
									<p>
										<strong>Hora de Inicio:</strong>{" "}
										{new Date(
											reservations[
												selectedReservationIndex
											].hora_inicio
										).toLocaleTimeString("es-MX", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>

								<p>
									<strong>Reservación de:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.usuario!.nombre
									}
								</p>
								<p>
									<strong>Lugar:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.palapa.nombre
									}
								</p>
								<p>
									<strong>Numero de Mesas:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.numero_mesas
									}
								</p>
								<p>
									<strong>Color de Manteles:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.numero_manteles
									}
								</p>
								<p>
									<strong>Contacto:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.usuario!.correo
									}
								</p>
								<p>
									<strong>Numero de Telefono:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.usuario!.telefono
									}
								</p>
								<p>
									<strong>Estatus:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.estatus
									}
								</p>
								<p className="text-justify">
									<strong>Notas de la Reservacion:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.notas
									}
								</p>

								<p>
									<strong>Numero de Invitados:</strong>{" "}
									{
										reservations[selectedReservationIndex]
											.invitados.length
									}
								</p>
								<div>
									<strong>Costo de la Reservacion:</strong>{" "}
									<i className="pi pi-dollar mr-2 text-gray-500"></i>
									<span>
										{calcularCosto(
											reservations[
												selectedReservationIndex
											].invitados || []
										)}
									</span>
								</div>
								{selectedReservationIndex &&
								reservations[selectedReservationIndex].invitados
									.length > 0 ? (
									<DataTable
										value={
											reservations[
												selectedReservationIndex
											].invitados
										}
										editMode="row"
										dataKey="id"
										onRowEditComplete={onRowEditComplete}
										scrollable
										scrollHeight="300px"
										className="p-mt-4 w-full text-sm"
									>
										<Column
											field="nombre"
											header="Nombre"
											editor={(options) =>
												textEditor(options)
											}
										/>
										{/* <Column
											field="check_in"
											header="Estado"
											editor={(options) =>
												checkboxEditor(options)
											}
											body={(rowData: Invitado) =>
												renderCheckbox(rowData.check_in)
											}
										/> */}
										<Column
											field="numero_pulsera"
											header="Número de Pulsera"
											className="text-center"
											editor={(options) =>
												numericTextEditor(options)
											}
										/>
										<Column
											field="pulsera_devuelta"
											header="Pulsera Devuelta"
											className="text-center"
											editor={(options) =>
												checkboxEditor(options)
											}
											body={(rowData: Invitado) =>
												renderCheckbox(
													rowData.pulsera_devuelta
												)
											}
										/>

										<Column
											rowEditor
											header="Acciones"
											className=" text-center"
										/>
									</DataTable>
								) : (
									<p>
										No hay invitados para esta reservación.
									</p>
								)}
							</div>
						) : filteredReservations.length > 0 ? (
							<ul className="list-disc ml-4">
								{filteredReservations.map(
									(reservation, index) => {
										// Definir el color de fondo según el estatus
										let backgroundColor = "gray"; // Color predeterminado

										if (
											reservation.estatus === "CONFIRMADA"
										) {
											backgroundColor = "green";
										} else if (
											reservation.estatus === "PENDIENTE"
										) {
											backgroundColor = "orange";
										} else if (
											reservation.estatus === "ENPROCESO"
										) {
											backgroundColor = "blue";
										} else if (
											reservation.estatus === "CANCELADA"
										) {
											backgroundColor = "black";
										} else if (
											reservation.estatus === "FINALIZADA"
										) {
											backgroundColor = "red";
										}

										return (
											<li
												key={reservation.id}
												className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded text-white"
												onClick={() =>
													handleSelectReservation(
														index
													)
												}
												style={{ backgroundColor }} // Aplicar el color de fondo dinámicamente
											>
												<p>
													<strong>
														Reservacion de{" "}
														{reservation.usuario
															?.nombre || "N/A"}
													</strong>
												</p>
											</li>
										);
									}
								)}
							</ul>
						) : (
							<p>No hay reservaciones para esta fecha.</p>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}
