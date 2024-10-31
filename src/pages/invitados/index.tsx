import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { ReservacionResponse } from "../../interfaces/interfaces";
import { obtenerEventosPorFecha } from "../../services/api";
import { useNavigate } from "react-router-dom";

// const reservacionesData: Reservacion[] = [
// 	{
// 		id: 1,
// 		nombre: "Fiesta de John Doe",
// 		lugar: "Palapa 1",
// 		fecha: new Date(2024, 8, 12),
// 		invitados: [
// 			{ nombre: "Invitado 1", llego: false },
// 			{ nombre: "Invitado 2", llego: false },
// 			{ nombre: "Invitado 3", llego: false },
// 			{ nombre: "Invitado 4", llego: false },
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 			{ nombre: "Invitado 7", llego: true },
// 			{ nombre: "Invitado 8", llego: true },
// 			{ nombre: "Invitado 9", llego: true },
// 			{ nombre: "Invitado 10", llego: true },
// 		],
// 	},
// 	{
// 		id: 2,
// 		nombre: "Cena de Empresa",
// 		lugar: "Palapa 2",
// 		fecha: new Date(2024, 9, 15),
// 		invitados: [
// 			{ nombre: "Invitado 3", llego: false },
// 			{ nombre: "Invitado 4", llego: false },
// 		],
// 	},
// 	{
// 		id: 3,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Palapa 3",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 4,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 5,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 6,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 7,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 8,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 9,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 10,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},

// 	{
// 		id: 11,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 12,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 13,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 14,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 15,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 16,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 17,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},

// 	{
// 		id: 18,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// 	{
// 		id: 19,
// 		nombre: "Boda de Ana y Juan",
// 		lugar: "Jardín Las Flores",
// 		fecha: new Date(2024, 10, 20),
// 		invitados: [
// 			{ nombre: "Invitado 5", llego: false },
// 			{ nombre: "Invitado 6", llego: false },
// 		],
// 	},
// ];

// Función para contar el número de invitados
const invitadosBodyTemplate = (rowData: ReservacionResponse) => {
	return rowData.invitados.length;
};

export default function ReservacionesTable() {
	const [reservaciones, setReservaciones] = useState<ReservacionResponse[]>([]);
	const [selectedReservacion, setSelectedReservacion] =
		useState<ReservacionResponse | null>(null);
	const [pulserasFaltantes, setPulserasFaltantes] = useState<number>(0); // Estado para las pulseras faltantes

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1); // Regresa a la ruta anterior
	};


	



	const onSelectionChange = (e: any) => {
		setSelectedReservacion(e.value as ReservacionResponse); // Hacemos un casting explícito del valor seleccionado
	};


	const obtenerFechaActual = (): string => {
		const fecha = new Date();

		// Obtenemos el año, mes y día locales
		const año = fecha.getFullYear();
		const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0, por lo que sumamos 1
		const dia = fecha.getDate().toString().padStart(2, "0");

		// Obtenemos la hora, minutos y segundos locales
		const horas = fecha.getHours().toString().padStart(2, "0");
		const minutos = fecha.getMinutes().toString().padStart(2, "0");
		const segundos = fecha.getSeconds().toString().padStart(2, "0");

		return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}.000`;
	};

	useEffect(() => {
		const fechaActual = obtenerFechaActual();

		const fetchEventos = async () => {
			try {
				const response = await obtenerEventosPorFecha(fechaActual);
				// console.log('Respuesta de la API:', response); // Verifica que la API devuelva el formato correcto

				// Verificamos si la respuesta tiene datos
				if (response && response.length > 0) {
					//   console.log('Reservaciones recibidas:', response);
					setReservaciones(response); // Asegúrate de asignar la respuesta directamente
				} else {
					console.log("No hay reservaciones en la respuesta.");
				}
			} catch (error) {
				console.error("Error al obtener los eventos:", error);
			}
		};

		fetchEventos();
	}, []);

	

	const onInvitadoChange = (invitadoIndex: number) => {
		if (selectedReservacion) {
			const updatedReservacion = { ...selectedReservacion };
			updatedReservacion.invitados[invitadoIndex].check_in =
				!updatedReservacion.invitados[invitadoIndex].check_in;
			setSelectedReservacion(updatedReservacion);
		}
	};

	return (
		<div className="flex flex-col lg:flex-col justify-center items-center w-full ">
			
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
				<h1 className="text-white  mx-auto">Eventos del Dia</h1>
			</div>
			<Card className="flex flex-col w-[100vw] min-h-[90vh] md:min-h-[90vh] p-6 ">
				
				{/* <DataTable value={reservaciones} paginator={false}>
					{" "}
				
					<Column
						field="usuario.nombre"
						header="Nombre"
						style={{ minWidth: "10rem" }}
					/>
					<Column
						field="palapa_id"
						header="Lugar"
						style={{ minWidth: "10rem" }}
					/>
					<Column
						field="tipo_mesa"
						header="Tipo de Mesa"
						style={{ minWidth: "10rem" }}
					/>
					<Column
						field="estatus"
						header="Estatus"
						style={{ minWidth: "10rem" }}
					/>
					<Column
						field="invitados.length"
						header="Número de Invitados"
						style={{ minWidth: "10rem" }}
					/>
				</DataTable> */}
				<DataTable
					value={reservaciones}
					paginator={false}
					// rows={5}
					// filters={filters}
					// filterDisplay="row"
					selectionMode="single"
					selection={selectedReservacion}
					onSelectionChange={onSelectionChange}
				>
					<Column
						field="usuario.nombre"
						header="Nombre"
						// filter
						// filterPlaceholder="Buscar por nombre"
						style={{ minWidth: "10rem" }}
					/>
					<Column
						field="palapa_id"
						header="Lugar"
						// filter
						// filterElement={lugarFilterTemplate}
						// filterPlaceholder="Buscar por lugar"
						style={{ minWidth: "10rem" }}
					/>
					 {/* <Column field="fecha" header="Fecha" body={dateBodyTemplate} filter filterElement={dateFilterTemplate} style={{ minWidth: '10rem' }} /> */}
					<Column
						field="invitados.length"
						header="Número de Invitados"
						body={invitadosBodyTemplate}
						style={{ minWidth: "10rem" }}
						bodyClassName="text-center"
						headerClassName="text-center"
					/>
				</DataTable>

				{/* <div>
					<h3>Lista de Reservaciones</h3>
					{reservaciones.map((reservacion) => (
						<div
							key={reservacion.id}
							style={{
								marginBottom: "20px",
								border: "1px solid #ccc",
								padding: "10px",
							}}
						>
							<p>
								<strong>ID:</strong> {reservacion.id}
							</p>
							<p>
								<strong>Usuario:</strong>{" "}
								{reservacion.usuario?.nombre}
							</p>
							<p>
								<strong>Fecha:</strong> {reservacion.fecha}
							</p>
							<p>
								<strong>Hora Inicio:</strong>{" "}
								{reservacion.hora_inicio}
							</p>
							<p>
								<strong>Hora Fin:</strong>{" "}
								{reservacion.hora_fin}
							</p>
							<p>
								<strong>Número de Mesas:</strong>{" "}
								{reservacion.numero_mesas}
							</p>
							<p>
								<strong>Color de Manteles:</strong>{" "}
								{reservacion.color_manteles}
							</p>
							<p>
								<strong>Notas:</strong> {reservacion.notas}
							</p>
							<p>
								<strong>Número de Invitados:</strong>{" "}
								{reservacion.invitados.length}
							</p>
						</div>
					))}
				</div> */}

				{selectedReservacion && (
					<Card className="mt-4">
						{/* <h3 className="mb-2">
							Invitados de {selectedReservacion.usuario.nombre}
						</h3> */}

						{/* Separar invitados en dos listas */}
						<div className="flex flex-row justify-around">
							<div className="flex flex-col w-1/3">
								<h4 className="mb-2">Faltan por llegar:</h4>
								<ScrollPanel className="h-40">
									<ul>
										{selectedReservacion.invitados
											.filter(
												(invitado) => !invitado.check_in
											)
											.map((invitado, index) => (
												<li
													key={index}
													className="flex items-center gap-2 mb-2"
												>
													<Checkbox
														inputId={`cb-faltante-${index}`}
														checked={
															invitado.check_in
														}
														onChange={() =>
															onInvitadoChange(
																index
															)
														}
													/>
													<label
														htmlFor={`cb-faltante-${index}`}
													>
														{invitado.nombre}
													</label>
												</li>
											))}
									</ul>
								</ScrollPanel>
							</div>
							<Divider layout="vertical" />
							<div className="flex flex-col w-1/3">
								<h4 className="mb-2">Ya llegaron:</h4>
								<ul>
									{selectedReservacion.invitados
										.filter((invitado) => invitado.check_in)
										.map((invitado, index) => (
											<li
												key={index}
												className="flex items-center gap-2 mb-2"
											>
												<Checkbox
													inputId={`cb-llegado-${index}`}
													checked={invitado.check_in}
													onChange={() =>
														onInvitadoChange(index)
													}
												/>
												<label
													htmlFor={`cb-llegado-${index}`}
												>
													{invitado.nombre}
												</label>
											</li>
										))}
								</ul>
							</div>
							<Divider layout="vertical" />
							<div className="w-1/3">
								{/* Input para registrar pulseras faltantes */}
								<h4 className="mt-4">Pulseras faltantes</h4>
								<InputText
									value={pulserasFaltantes.toString()} // Convertimos el número a string para que el InputText lo acepte
									onChange={(e) => {
										const value = e.target.value;
										const parsedValue = parseInt(value, 10); // Convertimos el valor a número
										if (!isNaN(parsedValue)) {
											// Nos aseguramos de que sea un número válido
											setPulserasFaltantes(parsedValue); // Guardamos el valor como número
										} else if (value === "") {
											setPulserasFaltantes(0); // Si el campo está vacío, lo tratamos como 0
										}
									}}
									placeholder="Número de pulseras faltantes"
									className="w-full md:w-48"
								/>
							</div>
						</div>
					</Card>
				)}
			</Card>
		</div>
	);
}
