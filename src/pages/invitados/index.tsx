import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { Invitado, ResponseReservacionDia } from "../../interfaces/interfaces";
import {  obtenerInvitadosDelDia, updateBatch } from "../../services/api";
import { useNavigate } from "react-router-dom";



// Función para contar el número de invitados
const invitadosBodyTemplate = (rowData: ResponseReservacionDia) => {
	return rowData.invitados.length;
};
const LOCAL_STORAGE_KEY = "cambiosPendientes";

export default function ReservacionesTable() {
	const [reservaciones, setReservaciones] = useState<ResponseReservacionDia[]>([]);
	const [indiceReservacionSeleccionada, setIndiceReservacionSeleccionada] = useState<number | null>(null);
	const [cambiosPendientes, setCambiosPendientes] = useState<{
		[reservacionId: number]: { [invitadoId: number]: Invitado };
	}>(() => {
		const savedChanges = localStorage.getItem(LOCAL_STORAGE_KEY);
		return savedChanges ? JSON.parse(savedChanges) : {};
	});
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const onSelectionChange = (e: any) => {
		const selectedIndex = reservaciones.findIndex((reservacion) => reservacion.id === e.value.id);
		if (selectedIndex !== -1) {
			setIndiceReservacionSeleccionada(selectedIndex);
		}
	};

	// Función para cargar cambios pendientes desde localStorage al cargar la página
	const cargarCambiosPendientes = () => {
		const savedChanges = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedChanges) {
			setCambiosPendientes(JSON.parse(savedChanges));
		}
	};

	useEffect(() => {
		// Cargar cambios pendientes antes de solicitar las reservaciones
		cargarCambiosPendientes();
		const fetchEventos = async () => {
			try {
				const fecha = new Date();
				const response = await obtenerInvitadosDelDia(fecha.toString());
				if (response) {
					setReservaciones(response);
				} else {
					console.log("No hay reservaciones en la respuesta.");
				}
			} catch (error) {
				console.error("Error al obtener los eventos:", error);
			}
		};
		fetchEventos();
	}, []);

	const registrarCambioInvitado = (reservacionId: number, invitado: Invitado) => {
		setCambiosPendientes((prevCambios) => {
			const cambiosReservacion = prevCambios[reservacionId] || {};
			const cambiosPrevios = cambiosReservacion[invitado.id];
			const nuevoCambio = { ...cambiosPrevios, ...invitado };

			if (
				!cambiosPrevios ||
				cambiosPrevios.check_in !== invitado.check_in ||
				cambiosPrevios.numero_pulsera !== invitado.numero_pulsera ||
				cambiosPrevios.pulsera_devuelta !== invitado.pulsera_devuelta
			) {
				const nuevosCambiosReservacion = { ...cambiosReservacion, [invitado.id]: nuevoCambio };
				const nuevosCambios = { ...prevCambios, [reservacionId]: nuevosCambiosReservacion };
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevosCambios));
				return nuevosCambios;
			}
			return prevCambios;
		});
	};

	const onInvitadoChange = (invitadoId: number) => {
		if (indiceReservacionSeleccionada === null) return;

		const updatedReservaciones = [...reservaciones];
		const invitado = updatedReservaciones[indiceReservacionSeleccionada].invitados.find((i) => i.id === invitadoId);

		if (invitado) {
			invitado.check_in = !invitado.check_in;
			setReservaciones(updatedReservaciones);
			registrarCambioInvitado(updatedReservaciones[indiceReservacionSeleccionada].id, invitado);
		}
	};

	const onPulseraChange = (invitadoId: number, value: number) => {
		if (indiceReservacionSeleccionada === null) return;

		const updatedReservaciones = [...reservaciones];
		const invitado = updatedReservaciones[indiceReservacionSeleccionada].invitados.find((i) => i.id === invitadoId);

		if (invitado) {
			invitado.numero_pulsera = value;
			setReservaciones(updatedReservaciones);
			registrarCambioInvitado(updatedReservaciones[indiceReservacionSeleccionada].id, invitado);
		}
	};

	const onRegresoChange = (invitadoId: number) => {
		if (indiceReservacionSeleccionada === null) return;

		const updatedReservaciones = [...reservaciones];
		const invitado = updatedReservaciones[indiceReservacionSeleccionada].invitados.find((i) => i.id === invitadoId);

		if (invitado) {
			invitado.pulsera_devuelta = !invitado.pulsera_devuelta;
			setReservaciones(updatedReservaciones);
			registrarCambioInvitado(updatedReservaciones[indiceReservacionSeleccionada].id, invitado);
		}
	};

	const guardarCambios = async () => {
		if (indiceReservacionSeleccionada === null) return;

		const reservacion = reservaciones[indiceReservacionSeleccionada];
		const invitadosActualizados = Object.values(cambiosPendientes[reservacion.id] || {});

		if (invitadosActualizados.length === 0) {
			console.log("No hay cambios pendientes para guardar.");
			return;
		}

		try {
			await updateBatch({ invitados: invitadosActualizados });
			console.log("Cambios guardados exitosamente.");

			const nuevosCambiosPendientes = { ...cambiosPendientes };
			delete nuevosCambiosPendientes[reservacion.id];
			setCambiosPendientes((prevCambios) => {
				const nuevosCambiosPendientes = { ...prevCambios };
				delete nuevosCambiosPendientes[reservacion.id];
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevosCambiosPendientes));
				return nuevosCambiosPendientes;
			});
		} catch (error) {
			console.error("Error al guardar los cambios:", error);
		}
	};

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (Object.keys(cambiosPendientes).length > 0) {
				console.log("Cambiso pendientes",cambiosPendientes)
				e.preventDefault();
				e.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [cambiosPendientes]);

	return (
		<div className="flex flex-col lg:flex-col justify-center items-center w-full ">
			<div className="relative flex items-center bg-[#00315D] w-full min-h-[10vh]">
				<div className="absolute left-4">
					<Button icon="pi pi-arrow-left" aria-label="Regresar" onClick={handleGoBack} className="p-button-text p-0" />
				</div>
				<h1 className="text-white mx-auto">Eventos del Día</h1>
			</div>
			<Card className="flex flex-col w-[100vw] min-h-[90vh] md:min-h-[90vh] p-6 ">
				<DataTable value={reservaciones} selectionMode="single" selection={reservaciones[indiceReservacionSeleccionada!]} onSelectionChange={onSelectionChange}>
					<Column field="palapa.nombre" header="Lugar" style={{ minWidth: "10rem" }} />
					<Column field="invitados.length" header="Número de Invitados" body={invitadosBodyTemplate} style={{ minWidth: "10rem" }} bodyClassName="text-center" headerClassName="text-center" />
				</DataTable>

				{indiceReservacionSeleccionada !== null && (
					<Card className="mt-4">
						<div className="flex flex-row justify-around">
							<div className="flex flex-col w-1/3">
								<h4 className="mb-2">Faltan por llegar:</h4>
								<ScrollPanel className="h-40">
									<ul>
										{reservaciones[indiceReservacionSeleccionada].invitados
											.filter((invitado) => !invitado.check_in)
											.map((invitado) => (
												<li key={invitado.id} className="flex items-center gap-2 mb-2">
													<Checkbox inputId={`cb-faltante-${invitado.id}`} checked={invitado.check_in} onChange={() => onInvitadoChange(invitado.id)} />
													<label htmlFor={`cb-faltante-${invitado.id}`}>{invitado.nombre}</label>
												</li>
											))}
									</ul>
								</ScrollPanel>
							</div>

							<Divider layout="vertical" />

							<div className="flex flex-col w-1/3">
								<h4 className="mb-2">Ya llegaron</h4>
								<ul>
									{reservaciones[indiceReservacionSeleccionada].invitados
										.filter((invitado) => invitado.check_in)
										.map((invitado) => (
											<li key={invitado.id} className="flex flex-row gap-2 mb-2">
												<div className="flex items-center gap-2">
													<Checkbox inputId={`cb-llegado-${invitado.id}`} checked={invitado.check_in} onChange={() => onInvitadoChange(invitado.id)} />
													<label htmlFor={`cb-llegado-${invitado.id}`}>{invitado.nombre}</label>
												</div>
												<div>
													<input
														type="number"
														value={invitado.numero_pulsera || ""}
														onChange={(e) => onPulseraChange(invitado.id, parseInt(e.target.value))}
														placeholder="Número de pulsera"
														className="input-field"
													/>
												</div>
												<div className="flex items-center gap-2">
													<Checkbox
														inputId={`cb-regreso-${invitado.id}`}
														checked={invitado.pulsera_devuelta || false}
														onChange={() => onRegresoChange(invitado.id)}
													/>
													<label htmlFor={`cb-regreso-${invitado.id}`}>Pulsera devuelta</label>
												</div>
											</li>
										))}
								</ul>
							</div>
						</div>
						<Button label="Guardar Cambios" onClick={guardarCambios} className="mt-4" />
					</Card>
				)}
			</Card>
		</div>
	);
};


