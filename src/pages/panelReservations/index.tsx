import React, { useEffect, useState } from "react";
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

// Simulación de datos de reservaciones
const reservationsData: ReservacionResponse[] = [
	{
		id: 1,
		usuario_id: 101,
		palapa_id: 1,
		fecha: "2024-10-12T00:00:00Z",
		hora_inicio: "14:00:00",
		hora_fin: "20:00:00",
		numero_mesas: 10,
		numero_manteles: 10,
		color_manteles: "Hueso",
		notas: "Reservación para fiesta de cumpleaños",
		tipo_mesa: "estándar",
		usuario: {
			nombre: "Edit Casim",
			correo: "EjMPLO@hotmail.com",
			telefono: "8443880090",
		},
		invitados: [
			{
				id: 1,
				reservacion_id: 1,
				nombre: "John Doe",
				check_in: false,
				numero_pulsera: 101,
				pulsera_devuelta: false,
			},
			{
				id: 2,
				reservacion_id: 1,
				nombre: "Jane Roe",
				check_in: false,
				numero_pulsera: 102,
				pulsera_devuelta: false,
			},
		],
		estatus: "confirmada",
		palapa: { id: 1, nombre: "Palapa 1" },
		adeudos: [
			{
				id: 1,
				descripcion: "Pago de reservación",
				monto: 200,
				estatus: "pagado",
				fecha: "2024-10-10T12:00:00Z",
			},
		],
	},
	{
		id: 2,
		usuario_id: 102,
		palapa_id: 2,
		fecha: "2024-10-12T00:00:00Z",
		hora_inicio: "18:00:00",
		hora_fin: "23:00:00",
		numero_mesas: 15,
		numero_manteles: 15,
		color_manteles: "Hueso",
		notas: "Reservación para cena corporativa",
		tipo_mesa: "estándar",
		usuario: {
			nombre: "Alejandro Gutierrez",
			correo: "EjMPLO@hotmail.com",
			telefono: "8443880090",
		},
		invitados: [
			{
				id: 3,
				reservacion_id: 2,
				nombre: "Jane Smith",
				check_in: false,
				numero_pulsera: 103,
				pulsera_devuelta: false,
			},
		],
		estatus: "pendiente",
		palapa: { id: 2, nombre: "Palapa 2" },
		adeudos: [
			{
				id: 2,
				descripcion: "Pago parcial",
				monto: 100,
				estatus: "pendiente",
				fecha: "2024-10-11T10:00:00Z",
			},
		],
	},
	{
		id: 3,
		usuario_id: 103,
		palapa_id: 4,
		fecha: "2024-12-12T00:00:00Z",
		hora_inicio: "13:00:00",
		hora_fin: "19:00:00",
		numero_mesas: 15,
		numero_manteles: 15,
		color_manteles: "Hueso",
		notas: "Parrillada",
		tipo_mesa: "estándar",
		usuario: {
			nombre: "Toño Elisondo",
			correo: "EjMPLO@hotmail.com",
			telefono: "8443880090",
		},
		invitados: [
			{
				id: 4,
				reservacion_id: 3,
				nombre: "Alejandro Smith",
				check_in: false,
				numero_pulsera: 104,
				pulsera_devuelta: false,
			},
		],
		estatus: "confirmada",
		palapa: { id: 4, nombre: "Palapa 4" },
		adeudos: [],
	},
	{
		id: 4,
		usuario_id: 104,
		palapa_id: 4,
		fecha: "2024-11-15T00:00:00Z",
		hora_inicio: "17:00:00",
		hora_fin: "22:00:00",
		numero_mesas: 10,
		numero_manteles: 10,
		color_manteles: "Hueso",
		notas: "Reservación para boda",
		tipo_mesa: "estándar",
		usuario: {
			nombre: "Mario Martinez",
			correo: "EjMPLO@hotmail.com",
			telefono: "8443880090",
		},
		invitados: [
			{
				id: 5,
				reservacion_id: 4,
				nombre: "Alice Johnson",
				check_in: false,
				numero_pulsera: 105,
				pulsera_devuelta: false,
			},
		],
		estatus: "confirmada",
		palapa: { id: 4, nombre: "Palapa 4" },
		adeudos: [
			{
				id: 3,
				descripcion: "Pago de reservación",
				monto: 300,
				estatus: "pagado",
				fecha: "2024-11-14T15:00:00Z",
			},
		],
	},
	{
		id: 5,
		usuario_id: 105,
		palapa_id: 5,
		fecha: "2024-11-20T00:00:00Z",
		hora_inicio: "12:00:00",
		hora_fin: "18:00:00",
		numero_mesas: 12,
		numero_manteles: 12,
		color_manteles: "Hueso",
		notas: "Reservación para reunión",
		tipo_mesa: "estándar",
		usuario: {
			nombre: "Ramon Alferes",
			correo: "EjMPLO@hotmail.com",
			telefono: "8443880090",
		},
		invitados: [
			{
				id: 6,
				reservacion_id: 5,
				nombre: "Bob Brown",
				check_in: true,
				numero_pulsera: 106,
				pulsera_devuelta: true,
			},
		],
		estatus: "pendiente",
		palapa: { id: 5, nombre: "Palapa 5" },
		adeudos: [
			{
				id: 4,
				descripcion: "Pago inicial",
				monto: 150,
				estatus: "pendiente",
				fecha: "2024-11-18T11:00:00Z",
			},
		],
	},
];

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

const PanelReservations: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [reservations, setReservations] = useState<ReservacionResponse[]>([]);
	const [selectedReservation, setSelectedReservation] = useState<any>(null);
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1); // Regresa a la ruta anterior
	};

	// Filtrar reservaciones para la fecha seleccionada
	useEffect(() => {
		if (selectedDate) {
			const filteredReservations = reservationsData.filter(
				(reservation) => {
					const reservationDate = new Date(reservation.fecha);
					return (
						reservationDate.getFullYear() ===
							selectedDate.getFullYear() &&
						reservationDate.getMonth() ===
							selectedDate.getMonth() &&
						reservationDate.getDate() === selectedDate.getDate()
					);
				}
			);
			setReservations(filteredReservations);
		}
	}, [selectedDate]);

	// Manejar clic en una reservación para mostrar más detalles
	const handleSelectEvent = (event: any) => {
		setSelectedReservation(event);
	};

	// Manejar clic en una fecha vacía
	const handleSelectSlot = ({ start }: { start: Date }) => {
		setSelectedDate(start);
		setSelectedReservation(null); // Limpiar la reservación seleccionada al hacer clic en una fecha vacía
	};

	return (
		<div className="flex flex-row lg:flex-col justify-center items-center w-full ">
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
				<h1 className="text-white  mx-auto">Reservaciones</h1>
			</div>

			<Card className="flex flex-col w-[100vw] min-h-[90vh] md:min-h-[90vh] p-6 ">
				<div className="flex flex-col lg:flex-row gap-4 pt-10">
					<Calendar
						localizer={localizer}
						events={reservationsData.map((res) => ({
							...res,
							title: res.notas,
							start: new Date(res.fecha),
							end: new Date(res.fecha),
						}))}
						startAccessor="start"
						endAccessor="end"
						style={{ height: 500 }}
						onSelectEvent={handleSelectEvent} // Maneja el clic en eventos
						onSelectSlot={handleSelectSlot} // Maneja la selección de fechas vacías
						selectable // Permitir seleccionar fechas
						views={["month", "week", "day"]} // Vistas disponibles
						defaultView="month" // Vista predeterminada
						messages={messages} // Mensajes en español
						className="md:w-2/3"
					/>
					<ResponsiveDivider />
					{/* Mostrar detalles de la reservación seleccionada */}
					<div className=" md:w-1/3">
						<h2 className="text-center mb-4">
							{selectedReservation
								? `Detalles de la reservación`
								: selectedDate
								? `Reservaciones para el ${selectedDate.toLocaleDateString()}`
								: "Selecciona una fecha o reservación"}
						</h2>
						{selectedReservation ? (
							<div className="flex flex-col justify-around gap-2">
								<div>
									<p>
										<strong>Nombre:</strong> Reservacion de{" "}
										{selectedReservation.usuario.nombre}
									</p>
									{/* <p>
										<strong>Descripción:</strong>{" "}
										{selectedReservation.description}
									</p> */}
									<p>
										<strong>Lugar:</strong>{" "}
										{selectedReservation.palapa.nombre}
									</p>
									<p>
										<strong>Numero de Mesas:</strong>{" "}
										{selectedReservation.numero_mesas}
									</p>
									<p>
										<strong>Color de Manteles:</strong>{" "}
										{selectedReservation.numero_manteles}
									</p>
									<p>
										<strong>Contacto:</strong>{" "}
										{selectedReservation.usuario.correo}
									</p>
									<p>
										<strong>Numero de Telefono:</strong>{" "}
										{selectedReservation.usuario.telefono}
									</p>
									<p>
										<strong>Invitados:</strong>
									</p>
									<ul>
										{selectedReservation.invitados.map(
											(invitado: Invitado) => (
												<li key={invitado.id}>
													{invitado.nombre} - -{" "}
													{invitado.check_in
														? "Confirmado"
														: "Sin Confirmar"}
												</li>
											)
										)}
									</ul>
									<p className="text-justify">
										<strong>
											Notas de la Reservacion:
										</strong>{" "}
										{selectedReservation.notas}
									</p>
								</div>

								<div>
									<Button label="Marcar en Proceso" />
								</div>
							</div>
						) : reservations.length > 0 ? (
							<ul className="list-disc ml-4">
								{reservations.map((reservation) => (
									<li key={reservation.id} className="mb-2">
										<p>
											<strong>
												Reservacion de{" "}
												{reservation.usuario?.nombre}
											</strong>
										</p>
									</li>
								))}
							</ul>
						) : (
							<p>No hay reservaciones para esta fecha.</p>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default PanelReservations;
