import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FC, useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import {
	ReservacionResponse,
} from "../../interfaces/interfaces";
import { obtenerEventosPorId } from "../../services/api";
import { Checkbox } from "primereact/checkbox";
import ReservacionSidebar from "../../components/SliderBarReservaciones";

// interface Adeudo {
// 	fecha: string;
// 	palapa: string;
// 	invitados: number;
// 	costoBase: number;
// 	costoTotal: number;
// 	mesas: number;
// 	manteles: number;
// 	colorMantel?: string;
// 	notas?: string;
// 	listaInvitados: string[];
// }

interface AdeudosProps {}

const Adeudos: FC<AdeudosProps> = () => {
	
	// const ejemploadeudos: Adeudo[] = [
	// 	{
	// 		fecha: "2023-07-15",
	// 		palapa: "Palapa Grande",
	// 		invitados: 30,
	// 		costoBase: 2000,
	// 		costoTotal: 3500,
	// 		mesas: 10,
	// 		manteles: 12,
	// 		colorMantel: "Blanco",
	// 		notas: "Evento de cumpleaños",
	// 		listaInvitados: ["Juan Pérez", "Ana Martínez"],
	// 	},
	// 	{
	// 		fecha: "2024-12-22",
	// 		palapa: "Palapa Mediana",
	// 		invitados: 20,
	// 		costoBase: 2000,
	// 		costoTotal: 3000,
	// 		mesas: 8,
	// 		manteles: 10,
	// 		colorMantel: "Rojo",
	// 		notas: "Evento de boda",
	// 		listaInvitados: [
	// 			"Carlos González",
	// 			"María López",
	// 			"María López",
	// 			"María López",
	// 			"María López",
	// 			"María López",
	// 			"María López",
	// 			"María López",
	// 		],
	// 	},
	// ];
	const [checked, setChecked] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
			if (scrollTop + clientHeight >= scrollHeight) {
				setIsScrolled(true);
			}
		}
	};

	// Ejemplo de la variable reservacionEjemplo
	// const ejemploadeudos: ReservacionResponse = {
	// 	id: 3,
	// 	usuario_id: 123, // ID del usuario que realiza la reservación
	// 	palapa_id: 8, // ID de la palapa
	// 	fecha: "2024-10-30T14:00:00Z", // Fecha en formato ISO
	// 	hora_inicio: "14:00:00", // Hora de inicio
	// 	hora_fin: "18:00:00", // Hora de fin
	// 	numero_mesas: 10, // Número de mesas
	// 	numero_manteles: 10, // Número de manteles
	// 	color_manteles: "rojo", // Color de los manteles
	// 	notas: "Necesito mesas extras cerca del jardín", // Notas adicionales
	// 	tipo_mesa: "estándar", // Tipo de mesa
	// 	palapa: {
	// 		id: 8,
	// 		nombre: "palapa 1",
	// 	},
	// 	usuario: {
	// 		nombre: "Juan Pérez", // Nombre del usuario
	// 		correo: "juan.perez@example.com",
	// 		telefono: "5551234567",
	// 	},
	// 	invitados: [
	// 		{
	// 			id: 1,
	// 			reservacion_id: 3,
	// 			nombre: "Juan Pérez",
	// 			check_in: false,
	// 			numero_pulsera: 201,
	// 			pulsera_devuelta: false
	// 		},
	// 		{
	// 			id: 2,
	// 			reservacion_id: 3,
	// 			nombre: "Ana Gómez",
	// 			check_in: true,
	// 			numero_pulsera: 202,
	// 			pulsera_devuelta: false
	// 		},
	// 	], // Lista de invitados
	// 	estatus: "PENDIENTE", // Estatus de la reservación
	// 	adeudos: [
	// 		{
	// 			id: 1,
	// 			descripcion: "Depósito de reservación",
	// 			monto: 200.0,
	// 			estatus: "PENDIENTE",
	// 			fecha: new Date().toISOString(), // Fecha de creación del adeudo
	// 		},
	// 		{
	// 			id: 2,
	// 			descripcion: "Cargo adicional por servicio",
	// 			monto: 50.0,
	// 			estatus: "PENDIENTE",
	// 			fecha: new Date().toISOString(), // Fecha de creación del adeudo
	// 		},
	// 	],
	// };
	
	// const multaEjemplo: Multa = {
	// 	id: 1, // ID de la multa
	// 	usuario: {
	// 		nombre: "Juan Pérez", // Nombre del usuario
	// 		correo: "juan.perez@example.com",
	// 		telefono: "5551234567"
	// 	},
	// 	usuario_id: 123, // ID del usuario
	// 	descripcion: "Multa por no asistir a la reservación", // Descripción de la multa
	// 	coste: 100.0, // Coste de la multa
	// 	fecha: new Date().toISOString(), // Fecha de creación de la multa
	// };

	const [reservaciones, setReservaciones] = useState<ReservacionResponse[]>(
		[]
	);
	// const [otrosCargos, setOtrosCargos] = useState<Multa[]>([]);
	const [selectedReservacion, setSelectedReservacion] =
		useState<ReservacionResponse | null>(null);
	const [visible, setVisible] = useState(false);
	// const [editable, setEditable] = useState(false);
	const [dialogVisible, setDialogVisible] = useState(false);
	// const [invitados, setInvitados] = useState<string[]>([]);

	// const coloresManteles = ["Negro", "Chocolate"];
	// const [editingIndex, setEditingIndex] = useState<number | null>(null);
	// const [editingName, setEditingName] = useState<string>("");
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	// const [dialogAction, setDialogAction] = useState<"cancel" | "multa" | null>(
	// 	null
	// );

	// Eliminar un invitado
	// const eliminarInvitado = (index: number) => {
	// 	const nuevosInvitados =
	// 		selectedReservacion?.invitados.filter((_, i) => i !== index) ?? [];
	// 	setSelectedReservacion({
	// 		...selectedReservacion!,
	// 		invitados: nuevosInvitados,
	// 	});
	// };

	// Editar un invitado
	// const editarInvitado = (index: number, nuevoNombre: InvitadoResponse) => {
	// 	const nuevosInvitados = [...(selectedReservacion?.invitados ?? [])];
	// 	nuevosInvitados[index] = nuevoNombre;
	// 	setSelectedReservacion({
	// 		...selectedReservacion!,
	// 		invitados: nuevosInvitados,
	// 	});
	// 	setEditingIndex(null); // Salir del modo de edición
	// };

	// const intentarCancelarReservacion = (adeudo: ReservacionResponse) => {
	// 	const today = moment();
	// 	const fechaReserva = moment(adeudo.fecha, "YYYY-MM-DD");
	// 	const horasAntes = fechaReserva.diff(today, "hours");

	// 	if (horasAntes < 24) {
	// 		setSelectedReservacion(adeudo); // Guardamos la reservación
	// 		setDialogAction("multa"); // Indicamos que la acción es aplicar multa
	// 		setShowConfirmDialog(true); // Mostramos el dialog
	// 	} else {
	// 		setSelectedReservacion(adeudo); // Guardamos la reservación
	// 		setDialogAction("cancel"); // Indicamos que la acción es cancelar la reservación
	// 		setShowConfirmDialog(true); // Mostramos el dialog
	// 	}
	// };

	const formatearFecha = (fechaString: string): string => {
		const fecha = new Date(fechaString);

		const opciones: Intl.DateTimeFormatOptions = {
			day: "2-digit", // Formato de día con dos dígitos
			month: "2-digit", // Formato de mes con dos dígitos
			year: "numeric", // Formato de año con cuatro dígitos
		};

		// Formatear la fecha en el formato día/mes/año
		return new Intl.DateTimeFormat("es-ES", opciones)
			.format(fecha)
			.replace(/\//g, "/");
	};
	// !Arreglar
	// const agregarMultaPorCancelacion = (multa: Multa) => {
	// 	// Eliminamos la reservación
	// 	const nuevasReservaciones = adeudos.filter((item) => item !== multa);

	// 	// Creamos el nuevo adeudo de la multa
	// 	const multaReservacionResponse: ReservacionResponse = {
	// 		fecha: moment().format("YYYY-MM-DD"), // Fecha actual
	// 		palapa: "Multa por cancelación",
	// 		invitados: 0, // No hay invitados en la multa
	// 		costoBase: 500,
	// 		costoTotal: 500,
	// 		mesas: 0,
	// 		manteles: 0,
	// 		colorMantel: "",
	// 		notas: `Multa por cancelar la reservación del ${multa.fecha} en ${multa.palapa}`,
	// 		listaInvitados: [],
	// 	};

	// 	// Actualizamos el estado agregando el adeudo de la multa
	// 	setAdeudos(nuevasReservaciones);
	// 	setOtrosCargos((prevCargos) => [...prevCargos, multaAdeudo]);

	// 	// Mostrar el mensaje de la multa aplicada
	// 	toast.current?.show({
	// 		severity: "error",
	// 		summary: "Multa aplicada",
	// 		detail: "Se ha aplicado una multa de 500 pesos por cancelar con menos de 24 horas de anticipación.",
	// 		life: 3000,
	// 	});
	// };

	const getReservaciones = async () => {
		try {
			const respuesta = await obtenerEventosPorId(); // Llamada a la API

			setReservaciones(respuesta);
		} catch (error) {
			console.error("Error al obtener las fechas no disponibles:", error);
		}
	};

	useEffect(() => {
		getReservaciones();
	}, []);

	// const cancelarReservacion = (adeudo: ReservacionResponse) => {
	// 	if (
	// 		window.confirm(
	// 			"¿Estás seguro de que deseas cancelar esta reservación?"
	// 		)
	// 	) {
	// 		const nuevasReservaciones = reservaciones.filter(
	// 			(item) => item !== adeudo
	// 		);
	// 		setReservaciones(nuevasReservaciones);
	// 		setVisible(false);
	// 		toast.current?.show({
	// 			severity: "success",
	// 			summary: "Reservación cancelada",
	// 			detail: "La reservación ha sido cancelada correctamente.",
	// 			life: 3000,
	// 		});
	// 	}
	// };

	const handleUpdateReservacion = (updatedReservacion: ReservacionResponse) => {
        // Aquí actualizas la reservación en tu estado o en tu API
        console.log("Reservación actualizada:", updatedReservacion);
    };

	//!Arreglar
	// const totalPagar = adeudos.reduce(
	// 	(total, adeudo) => total + adeudo.costoTotal,
	// 	0
	// );

	const toast = useRef<Toast>(null);
	useEffect(() => {
		toast.current?.show({
			severity: "warn",
			summary: "Estimado Socio",
			sticky: true, // El Toast se queda hasta que lo cierran
			className: "max-w-80 md:max-w-none ml-10 ",
			content: (
				<div className="flex flex-col align-items-end ">
					<div className="flex align-items-center gap-2">
						<span className="font-bold text-900">
							Estimado Socio
						</span>
					</div>

					<p className="m-0 text-sm">
						Los adeudos se cargaran automaticamente al fin del Mes.
					</p>
					<Button
						className="p-button-sm mt-2 text-sm "
						label="Aceptar"
						severity="warning"
						onClick={() => toast.current?.clear()}
					/>
				</div>
			),
		});
	}, []);

	// Función para agregar un nuevo invitado
	// const agregarInvitado = () => {
	// 	setInvitados([...invitados, ""]);
	// };

	const handleRowClick = (adeudo: ReservacionResponse) => {
		setSelectedReservacion(adeudo);

		setVisible(true);
	};

	// const toggleEditable = () => {
	// 	const today = moment();
	// 	const fechaReserva = moment(selectedReservacion!.fecha).startOf("day"); // Se establece a la medianoche del día de la reservación
	// 	const horasAntes = fechaReserva.diff(today, "hours");
	// 	// const diasAntes = fechaReserva.diff(today, "days");
	// 	// setEditable(diasAntes >= 3);

	// 	setEditable(horasAntes >= 12); // Verifica si hay al menos 12 horas
	// };

	// const handleInputChange = <K extends keyof ReservacionResponse>(
	// 	field: K,
	// 	value: ReservacionResponse[K]
	// ) => {
	// 	if (selectedReservacion) {
	// 		setSelectedReservacion({ ...selectedReservacion, [field]: value });
	// 	}
	// };

	return (
		<div className="flex flex-col min-h-[80vh] md:min-h-[90vh] lg:max-h-[90vh] justify-center items-center w-full pt-16 sm:mt-10 md:mt-20 lg:mt-20 xl:mt-0">
			{" "}
			<Dialog
				visible={showConfirmDialog}
				header="Confirmación"
				footer={() => (
					<div>
						<Button
							label="No"
							icon="pi pi-times"
							onClick={() => setShowConfirmDialog(false)} // Cerrar dialog
							className="p-button-text"
						/>
						{/* 
						//!Arreglar
						<Button
							label="Sí"
							icon="pi pi-check"
							onClick={() => {
								if (dialogAction === "multa") {
									agregarMultaPorCancelacion(selectedReservacion!); // Aplicar multa
								} else if (dialogAction === "cancel") {
									const nuevasReservaciones = adeudos.filter(
										(item) => item !== selectedReservacion
									);
									setAdeudos(nuevasReservaciones); // Cancelar reservación
									toast.current?.show({
										severity: "success",
										summary: "Reservación cancelada",
										detail: "La reservación ha sido cancelada correctamente.",
										life: 3000,
									});
								}
								setShowConfirmDialog(false); // Cerrar el dialog después de la acción
							}}
							autoFocus
						/> */}
					</div>
				)}
				onHide={() => setShowConfirmDialog(false)} // Cerrar el dialog si se cierra manualmente
			>
				{/* <p>
					{dialogAction === "multa"
						? "Faltan menos de 24 horas para la reservación. Se aplicará una multa de 500 pesos. ¿Deseas continuar?"
						: "¿Estás seguro de que deseas cancelar esta reservación?"}
				</p> */}
			</Dialog>
			<Toast ref={toast} className="" />
			<Card className="w-[100vw] md:w-[80vw]  md:p-6  ">
				<div className="flex flex-col justify-between min-h-[70vh] ">
					<div>
						<h2 className="text-2xl md:text-4xl font-bold mb-2 ">
							Cargos y Reservaciones
						</h2>
						<p className="text-gray-600 mb-6 text-sm md:text-base max-w-">
							Revise sus reservaciones de palapas y los cargos
							asociados
						</p>

						<h2 className="text-2xl md:text45xl font-bold mb-2">
							Reservaciones (Pendientes)
						</h2>
						<table className="w-full text-left mb-6">
							<thead>
								<tr className="border-b">
									<th className="w-1/5 ">Estatus</th>{" "}
									{/* Centrado */}
									<th className="w-1/5 md:p-2">Fecha</th>
									<th className="w-1/5 md:p-2">Lugar</th>
									<th className="w-1/5 p-2 text-center">
										Invitados
									</th>
									{/* <th className="w-1/5 p-2 text-center">
										Acciones
									</th> */}
								</tr>
							</thead>
							<tbody>
								{reservaciones.map((adeudo, index) => (
									<tr
										key={index}
										className="border-b text-sm md:text-base cursor-pointer"
										onClick={() =>
											handleRowClick(reservaciones[index])
										}
									>
										<td className="w-1/5 text-center md:text-start ">
											{adeudo.estatus}
										</td>{" "}
										{/* Centrado */}
										<td className="w-1/5 md:p-2">
											{formatearFecha(adeudo.fecha)}
										</td>
										<td className="w-1/5 md:p-2">
											{adeudo.palapa.nombre}
										</td>
										<td className="w-1/5 p-2 justify-center text-center">
											{adeudo.invitados.length}
										</td>
										{/* <td className="w-1/5 justify-center text-center">
											<div className="flex justify-center text-center">
												<Button
													icon="pi pi-pencil"
													onClick={() =>
														handleRowClick(
															reservaciones[index]
														)
													}
													size="small"
													className="rounded-r-none text-sm"
												/>
												<Button
													icon="pi pi-trash"
													onClick={() =>
														intentarCancelarReservacion(
															reservaciones[index]
														)
													}
													size="small"
													severity="danger"
													className="rounded-l-none"
												/>
											</div>
										</td> */}
									</tr>
								))}
							</tbody>
						</table>

						<h2 className="text-2xl md:text45xl font-bold mb-2">
							Cargos (Pendientes)
						</h2>
						<table className="w-full text-left mb-6 ">
							<thead>
								<tr className="border-b">
									<th className="md:p-2">Fecha</th>
									<th className="md:p-2">Descripcion</th>
									<th className="p-2">Estatus</th>
									<th className="p-2 text-center">Monto</th>
								</tr>
							</thead>
							<tbody>
								{reservaciones?.length > 0 ? (
									// Chequea si al menos una reservación tiene adeudos
									reservaciones.some(
										(reservacion) =>
											reservacion.adeudos?.length > 0
									) ? (
										reservaciones.map(
											(reservacion, indexReservacion) =>
												reservacion.adeudos?.length > 0
													? reservacion.adeudos.map(
															(
																adeudo,
																indexAdeudo
															) => (
																<tr
																	key={`${indexReservacion}-${indexAdeudo}`}
																	className="border-b text-sm md:text-base cursor-pointer"
																>
																	<td className="md:p-2">
																		{adeudo?.fecha
																			? formatearFecha(
																					adeudo.fecha
																			  )
																			: "Fecha no disponible"}
																	</td>
																	<td className="md:p-2">
																		{adeudo?.descripcion ||
																			"Descripción no disponible"}
																	</td>
																	<td className="p-2 ">
																		{adeudo?.estatus ||
																			"Estatus no disponible"}
																	</td>
																	<td className="p-2 justify-center text-center">
																		{adeudo?.monto ||
																			"Monto no disponible"}
																	</td>
																	{/* <td className="justify-center text-center">
																		<div className="flex">
																			<Button
																				icon="pi pi-pencil"
																				onClick={() =>
																					handleRowClick(
																						reservacion
																					)
																				}
																				size="small"
																				className="rounded-r-none text-sm"
																			/>
																			<Button
																				icon="pi pi-trash"
																				onClick={() =>
																					intentarCancelarReservacion(
																						reservacion
																					)
																				}
																				size="small"
																				severity="danger"
																				className="rounded-l-none"
																			/>
																		</div>
																	</td> */}
																</tr>
															)
													  )
													: null
										)
									) : (
										<tr>
											<td
												colSpan={5}
												className="text-center p-2"
											>
												No hay Adeudos.
											</td>
										</tr>
									)
								) : (
									<tr>
										<td
											colSpan={5}
											className="text-center p-2"
										>
											No hay reservaciones disponibles.
										</td>
									</tr>
								)}
							</tbody>
						</table>

						{/* Segunda tabla para otros cargos (multas) */}

						<h2 className="text-2xl md:text45xl font-bold mb-2">
							Otros Cargos (Multas)
						</h2>
						<table className="w-full text-left mb-6">
							<thead>
								<tr className="border-b">
									<th className="md:p-2">Fecha</th>
									<th className="md:p-2">Descripción</th>
									<th className="p-2 text-center">Costo</th>
								</tr>
							</thead>
							{/* <tbody>
								{otrosCargos.map((cargo, index) => (
									<tr
										key={index}
										className="border-b text-sm md:text-base"
									>
										<td className="md:p-2">
											{formatearFecha(cargo.fecha)}
										</td>
										<td className="md:p-2">
											{cargo.descripcion}
										</td>
										<td className="p-2 justify-center text-center">
											${cargo.coste}
										</td>
									</tr>
								))}
							</tbody> */}
						</table>
					</div>

					<div className="flex justify-between items-center">
						{/*
						//!Ya con datos 
						<p className="font-bold text-base md:text-lg">
							Total a pagar: <span>${totalPagar.toFixed(2)}</span>
						</p> */}
						<p className="font-bold text-base md:text-lg">
							Total a pagar: <span>${1000}</span>
						</p>

						<button
							className="bg-black text-white px-4 py-2 rounded"
							onClick={() => setDialogVisible(true)}
						>
							Aceptar Cargos
						</button>
					</div>
				</div>
			</Card>
			{/* Sidebar para editar reservación */}
			{/* <Sidebar
				visible={visible}
				position="right"
				className="w-full md:w-2/5 lg:w-2/5"
				onHide={() => setVisible(false)}
				showCloseIcon={false}
				icons={() => (
					<Button
						icon="pi pi-times"
						text
						severity="secondary"
						onClick={() => setVisible(false)}
					/>
				)}
			>
				<h1 className="text-2xl font-bold ">Editar Reservación</h1>
				{selectedReservacion ? (
					<div className="flex flex-col gap-4">
						<div className="pt-4">
							<Calendar
								id="buttondisplay"
								value={date}
								disabled={!editable} // Solo editable cuando se activa el modo edición
								onChange={(e) => setDate(e.value)}
								showIcon
								className="w-full" // El Calendar ocupa el 100% del contenedor padre
								appendTo="self" // Asegura que el Calendar se dibuje dentro del Sidebar
							/>
						</div>
						<div>
							<label>Número de Manteles:</label>
							{editable ? (
								<InputNumber
									value={
										selectedReservacion.numero_manteles || 0
									}
									// onValueChange={(e) =>
									//     handleInputChange("manteles", e.value!)
									// }
								/>
							) : (
								<p>{selectedReservacion.numero_manteles}</p>
							)}
						</div>
						<div>
							<label>Número de Manteles:</label>
							<InputNumber
								value={selectedReservacion.numero_manteles || 0}
								// onValueChange={(e) =>
								// 	handleInputChange("manteles", e.value!)
								// }
							/>
						</div>
						<div className="flex flex-col">
							<label>Color de los Manteles:</label>
							{editable ? (
								<Dropdown
									value={selectedReservacion.color_manteles}
									options={["Rojo", "Azul", "Verde"]} // Ejemplo de colores
									// onChange={(e) =>
									// 	handleInputChange(
									// 		"colorMantel",
									// 		e.value
									// 	)
									// }
									placeholder="Seleccionar Color"
								/>
							) : (
								<p>{selectedReservacion.color_manteles}</p>
							)}
						</div>
						<div className="flex flex-col">
							<label>Notas:</label>
							{editable ? (
                            <InputText
                                value={selectedReservacion.notas || ""}
                                onChange={(e) =>
                                    handleInputChange("notas", e.target.value)
                                }
                            />
                        ) : (
                            <p>{selectedReservacion.notas}</p>
                        )}
						</div>
						<div>
							<label>Lista de Invitados:</label>
							<ScrollPanel
								style={{ width: "100%", height: "200px" }}
								className="custombar1"
							>
								<ul>
									{selectedReservacion?.invitados?.map(
										(inv, index) => (
											<li key={index}>
												{editingIndex === index ? (
													<div className="flex gap-2 justify-between">
														<InputText
															value={editingName}
															onChange={(e) =>
																setEditingName(
																	e.target
																		.value
																)
															}
															placeholder="Editar nombre"
														/>
														<div className="flex gap-2  justify-between">
															<Button
																icon="pi pi-save"
																// onClick={() =>
																// 	editarInvitado(
																// 		index,
																// 		editingName
																// 	)
																// }
																size="small"
																className="p-button-success"
															/>
															<Button
																icon="pi pi-times"
																onClick={() =>
																	setEditingIndex(
																		null
																	)
																}
																size="small"
																className="p-button-secondary"
															/>
														</div>
													</div>
												) : (
													<div className="flex gap-2  justify-between p-2">
														<span>
															{inv.nombre}
														</span>
														<div className="flex gap-2">
															<Button
																icon="pi pi-pencil"
																// onClick={() => {
																// 	setEditingIndex(
																// 		index
																// 	);
																// 	setEditingName(
																// 		inv
																// 	);
																// }}
																size="small"
																className="p-button-warning"
															/>
															<Button
																icon="pi pi-trash"
																onClick={() =>
																	eliminarInvitado(
																		index
																	)
																}
																size="small"
																className="p-button-danger"
															/>
														</div>
													</div>
												)}
											</li>
										)
									)}
								</ul>
							</ScrollPanel>
						</div>
					
						<div className="flex gap-4 mt-4">
							<button
								className="bg-black text-white px-4 py-2 rounded"
								onClick={toggleEditable}
							>
								{editable ? "Guardar" : "Editar"}
							</button>
							<button
								className="bg-black text-white px-4 py-2 rounded"
								// onClick={eliminarReservacion}
							>
								Eliminar
							</button>
						</div>
					</div>
				) : (
					<p>
						No se puede editar esta reservación porque faltan menos
						de 3 días para la fecha.
					</p>
				)}
			</Sidebar>


			 */}	
			 
			 <ReservacionSidebar
                visible={visible}
                setVisible={setVisible}
                selectedReservacion={selectedReservacion}
                onUpdate={handleUpdateReservacion}
            />
			{/* Dialog para aviso de privacidad y términos */}
			<Dialog
				header="Contrato de Aceptación de Servicios"
				visible={dialogVisible}
				style={{ width: "50vw" }}
				onHide={() => setDialogVisible(false)}
				footer={
					<div className="flex flex-row justify-between w-full px-5">
						<div>
							<Checkbox
								inputId="accept"
								disabled={!isScrolled}
								onChange={(e) => setChecked(e.checked!)}
								checked={checked}
							/>
							<label htmlFor="accept" className="ml-2">
								He leído y acepto los términos y condiciones
							</label>
						</div>

						<Button
							label="Aceptar"
							onClick={() => setDialogVisible(false)}
							className="p-button"
							disabled={!checked}
						/>
					</div>
				}
			>
				<div
					className="overflow-y-auto max-h-96 px-5"
					onScroll={handleScroll}
					ref={scrollContainerRef}
				>
					<p>
						Aquí puedes colocar todo el contenido del contrato o
						aviso de privacidad, que puede ser lo suficientemente
						extenso como para requerir un desplazamiento (scroll).
						Los usuarios deberán leer todo este contenido antes de
						poder aceptar los términos y condiciones.
					</p>
					{/* Aquí va el resto del contenido del contrato */}
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nullam consequat, ligula non pulvinar varius, tortor
						odio vehicula ipsum, vitae fermentum lectus ex ac velit.
						Curabitur tincidunt dui ac nunc consectetur, in commodo
						sem dictum. Nam sodales tristique felis, nec fermentum
						velit eleifend quis. Pellentesque in bibendum arcu, non
						placerat erat. Donec ullamcorper lectus eget risus
						lacinia, et venenatis lorem gravida.
					</p>

					{/* Puedes agregar más contenido largo aquí */}
				</div>
			</Dialog>
		</div>
	);
};

export default Adeudos;
