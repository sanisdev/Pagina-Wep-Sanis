import { Card } from "primereact/card";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import * as Constants from "../constants";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import {
	editarAviso,
	eliminarAviso,
	eliminarEvento,
	obtenerAvisos,
	obtenerEventos,
} from "../services/api-comunicacion";
import ResponsiveCarousel from "./carouselWrapper";

interface Aviso {
	id: number;
	descripcion: string;
}

interface Evento {
	id: number;
	url: string;
	name: string;
	file: File | null;
}

const ListaAvisos: React.FC<{
	refreshEvents: boolean;
	refreshAvisos: boolean;
}> = ({ refreshEvents, refreshAvisos }) => {
	const [avisos, setAvisos] = useState<Aviso[]>([]);
	const [eventos, setEventos] = useState<Evento[]>([]);
	const toast = useRef<Toast>(null);
	const [avisoEditando, setAvisoEditando] = useState<Aviso | null>(null);
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingDelete] = useState<number | null>(null);

	useEffect(() => {
		// Función para obtener los datos
		const fetchData = async () => {
			try {
				const [eventosData] = await Promise.all([obtenerEventos()]);

				setEventos(eventosData);
			} catch (error) {
				console.error("Error al obtener Eventos:", error);
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: "No se pudieron cargar los Eventos",
				});
			}
		};

		fetchData();
	}, [refreshEvents]); // Ejecutar el efecto cuando refresh cambie

	useEffect(() => {
		// Función para obtener los datos
		const fetchData = async () => {
			try {
				const [avisosData] = await Promise.all([obtenerAvisos()]);

				setAvisos(avisosData);
			} catch (error) {
				console.error("Error al obtener Avisos:", error);
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: "No se pudieron cargar los Avisos",
				});
			}
		};

		fetchData();
	}, [refreshAvisos]);

	const showDialog = (aviso: Aviso) => {
		setAvisoEditando(aviso);
		setDialogVisible(true);
	};

	const hideDialog = () => {
		setDialogVisible(false);
		setAvisoEditando(null);
	};

	const handleGuardarCambios = async () => {
		if (avisoEditando) {
			setLoading(true);
			try {
				const updatedAviso = await editarAviso(
					avisoEditando.id,
					avisoEditando
				);
				setAvisos((prevAvisos) =>
					prevAvisos.map((aviso) =>
						aviso.id === updatedAviso.id ? updatedAviso : aviso
					)
				);
				hideDialog();
			} catch (error) {
				console.error("Error al actualizar el aviso:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await eliminarEvento(id);
			setEventos((prevEventos) =>
				prevEventos.filter((evento) => evento.id !== id)
			);
			toast.current?.show({
				severity: "success",
				summary: "Eliminado",
				detail: "El evento ha sido eliminado con éxito",
			});
		} catch (error) {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "No se pudo eliminar el evento",
			});
		}
	};

	const handleEliminarAviso = async (id: number) => {
		try {
			await eliminarAviso(id);
			setAvisos((prevAvisos) =>
				prevAvisos.filter((aviso) => aviso.id !== id)
			);
			toast.current?.show({
				severity: "success",
				summary: "Eliminado",
				detail: "El evento ha sido eliminado con éxito",
			});
		} catch (error) {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "No se pudo eliminar el evento",
			});
		}
	};
	const footerContent = (
		<div className="space-x-2">
			<Button
				label="Cancelar"
				icon="pi pi-times"
				disabled={loading}
				onClick={hideDialog}
				className="p-button-text"
			/>
			<Button
				label="Guardar"
				icon="pi pi-check"
				onClick={handleGuardarCambios}
				loading={loading}
				autoFocus
			/>
		</div>
	);

	return (
		<div className="align-middle justify-center items-center">
			{/* Dialog para editar aviso */}
			<Dialog
				header="Editar Aviso"
				visible={dialogVisible}
				className="w-[80vw] md:w-[50vw]"
				onHide={hideDialog}
				footer={footerContent}
			>
				<div className="p-fluid flex flex-col">
					<label htmlFor="descripcion">Descripción</label>
					<InputTextarea
						id="descripcion"
						value={avisoEditando?.descripcion || ""}
						onChange={(e) =>
							setAvisoEditando({
								...avisoEditando!,
								descripcion: e.target.value,
							})
						}
						rows={5}
						cols={30}
					/>
				</div>
			</Dialog>
			<Toast ref={toast} />
			<h2 className="text-2xl text-cyan-800">Avisos Activos</h2>
			<ul>
				{avisos.map((aviso, index) => (
					<li key={index}>
						<div className="card justify-center align-middle">
							<Card className="my-2  shadow-2xl !bg-blue-950 max-w-[90vw] md:max-w-[80vw] p-2">
								<div className="flex flex-row align-items-center gap-2 text-white">
									<img
										alt="logo"
										src={Constants.LOGO_MesaConstante}
										className="h-[60px] w-[60px] md:h-[60px] md:w[60px]"
										style={{
											filter: "invert(100%) sepia(100%) hue-rotate(600deg)",
										}}
									/>
									<span className="font-bold text-2xl text-[#FFFD00]">
										Estimado Socio
									</span>
								</div>
								<div>
									<p
										className="text-white p-4 text-justify text-2xl  break-words whitespace-normal "
										style={{
											overflowWrap:
												"break-word" /* Rompe palabras largas que no caben en el contenedor */,
										}}
									>
										{aviso.descripcion}
									</p>
								</div>

								<div className="flex felx-row text-end justify-center md:justify-end pt-2">
									<span className="font-bold text-2xl text-[#FFFD00]">
										Somos Sanis Somos Comunidad
									</span>
								</div>
							</Card>
						</div>

						<div className="flex flex-row  pb-4 place-content-between max-w-[90vw] md:max-w-[80vw]">
							<Button
								label="Eliminar"
								icon="pi pi-trash"
								severity="danger"
								loading={loadingDelete === aviso.id}
								onClick={() => handleEliminarAviso(aviso.id)}
								className="p-button-danger"
							/>
							<Button
								label="Editar"
								onClick={() => showDialog(aviso)}
							/>
						</div>
					</li>
				))}
			</ul>
			<div></div>
			<h2 className="text-2xl text-cyan-800">Lista de Eventos</h2>
			<div className="card max-w-[80vw]">
				<ResponsiveCarousel
					eventos={eventos}
					handleDelete={handleDelete}
					home={false}
				/>
			</div>
		</div>
	);
};

export default ListaAvisos;
