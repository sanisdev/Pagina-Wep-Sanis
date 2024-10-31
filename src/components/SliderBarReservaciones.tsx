import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
import { ReservacionResponse } from "../interfaces/interfaces";
import * as Constants from "../constants";
import { Image } from "primereact/image";
import { InputTextarea } from "primereact/inputtextarea";

interface SidebarProps {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	selectedReservacion: ReservacionResponse | null; // Reservación seleccionada
	onUpdate: (reservacion: ReservacionResponse) => void; // Callback para actualizar la reservación
}

const ReservacionSidebar: React.FC<SidebarProps> = ({
	visible,
	setVisible,
	selectedReservacion,
	onUpdate,
}) => {
	const [editable, setEditable] = useState<boolean>(false); // Estado para controlar el modo de edición
	const [reservacion, setReservacion] = useState<ReservacionResponse | null>(
		null
	); // Estado para manejar la reservación
	const selectedMantel =
		reservacion?.color_manteles === "Chocolate"
			? Constants.mantel1
			: reservacion?.color_manteles === "Negro"
			? Constants.mantel2
			: null;

	// Cargar información de la reservación seleccionada al montar
	useEffect(() => {
		if (selectedReservacion) {
			setReservacion({ ...selectedReservacion });
		}
	}, [selectedReservacion]);

	const toggleEditable = () => {
		if (editable) {
			// Guardar los cambios y actualizar la reservación
			if (reservacion) {
				onUpdate(reservacion); // Llama a la función de actualización
			}
		}
		setEditable(!editable); // Cambiar el estado de edición
	};

	const eliminarInvitado = (index: number) => {
		if (reservacion) {
			const updatedInvitados = [...reservacion.invitados];
			updatedInvitados.splice(index, 1); // Eliminar el invitado
			setReservacion({ ...reservacion, invitados: updatedInvitados }); // Actualiza el estado local
		}
	};

	const editarInvitado = (index: number, nombre: string) => {
		if (reservacion) {
			const updatedInvitados = [...reservacion.invitados];
			updatedInvitados[index].nombre = nombre; // Actualiza el nombre del invitado
			setReservacion({ ...reservacion, invitados: updatedInvitados }); // Actualiza el estado local
		}
	};

	const customHeader = (
		<div className="flex justify-start items-start gap-2 self-start">
			<span className="font-bold">Editar Reservación</span>
		</div>
	);
	return (
		<Sidebar
			visible={visible}
			position="right"
			className="w-full md:w-2/5 lg:w-3/12 flex items-start justify-start  "
			onHide={() => setVisible(false)}
			showCloseIcon={false}
			header={customHeader}
		>
			{/* <h1 className="text-2xl font-bold">Editar Reservación</h1> */}
			{reservacion ? (
				<div className="flex flex-col flex-grow h-80 max-h-[50vh] gap-4 justify-between">
					<div className="pt-4">
						<Calendar
							id="buttondisplay"
							value={new Date(reservacion.fecha)} // Mostrar la fecha
							disabled={!editable} // Solo editable cuando se activa el modo edición
							onChange={(e) =>
								setReservacion({
									...reservacion,
									fecha:
										e.value?.toISOString().split("T")[0] ||
										reservacion.fecha,
								})
							}
							showIcon
							className="w-full" // El Calendar ocupa el 100% del contenedor padre
						/>
					</div>
					<div>
						<label>Número de Mesas:</label>
						{editable ? (
							<InputNumber
								value={reservacion.numero_mesas || 0}
								onValueChange={(e) =>
									setReservacion({
										...reservacion,
										numero_mesas: e.value || 0,
									})
								}
							/>
						) : (
							<p>{reservacion.numero_manteles}</p>
						)}
					</div>
					<div>
						<label>Número de Manteles:</label>
						{editable ? (
							<InputNumber
								value={reservacion.numero_manteles || 0}
								onValueChange={(e) =>
									setReservacion({
										...reservacion,
										numero_manteles: e.value || 0,
									})
								}
							/>
						) : (
							<p>{reservacion.numero_manteles}</p>
						)}
					</div>
					<div className="flex flex-col">
						<label>Color de los Manteles:</label>
						{editable ? (
							<div className="flex flex-row align-middle items-center:">
								<Dropdown
									value={reservacion.color_manteles}
									options={["Negro", "Chocolate"]} // Ejemplo de colores
									onChange={(e) =>
										setReservacion({
											...reservacion,
											color_manteles: e.value,
										})
									}
									placeholder="Seleccionar Color"
								/>
								<Image
									src={selectedMantel!}
									zoomSrc={selectedMantel!}
									alt="Mantel"
									// width="60"
									// height="60"
									preview
									// className="w-[70px] h-[60px]  md:w-[50px] md:h-[50px]  "
									className="w-1/6  "
								/>
							</div>
						) : (
							<p>{reservacion.color_manteles}</p>
						)}
					</div>
					<div className="flex flex-col">
						<label>Notas:</label>
						{editable ? (
							// <InputText
							// 	value={reservacion.notas || ""}
							// 	onChange={(e) =>
							// 		setReservacion({
							// 			...reservacion,
							// 			notas: e.target.value,
							// 		})
							// 	}
							// />
							<InputTextarea
								autoResize
								value={reservacion.notas || ""}
								onChange={(e) =>
									setReservacion({
										...reservacion,
										notas: e.target.value,
									})
								}
								rows={3}
								cols={30}
							/>
						) : (
							<p>{reservacion.notas}</p>
						)}
					</div>
					<div>
						<label>Lista de Invitados:</label>
						<ScrollPanel
							style={{ width: "100%", height: "200px" }}
							className="custombar1"
						>
							<ul>
								{reservacion.invitados.map((inv, index) => (
									<li key={index}>
										<div className="flex gap-2 justify-between">
											{editable ? (
												<>
													<InputText
														value={inv.nombre}
														onChange={(e) =>
															editarInvitado(
																index,
																e.target.value
															)
														}
														placeholder="Nombre del invitado"
													/>
												</>
											) : (
												<span>{inv.nombre}</span>
											)}
											{editable && (
												<Button
													icon="pi pi-trash"
													onClick={() =>
														eliminarInvitado(index)
													}
													size="small"
													className="p-button-danger"
												/>
											)}
										</div>
									</li>
								))}
							</ul>
						</ScrollPanel>
					</div>
					{/* Botones de Editar y Guardar */}
					<div className="sticky bottom-0 flex gap-4 mt-4 bg-white z-10 py-4">
						<button
							onClick={toggleEditable}
							className="bg-black text-white px-4 py-2 rounded"
						>
							{editable ? "Guardar" : "Editar"}
						</button>
						{editable && (
							<button
								onClick={() => setEditable(false)}
								className="bg-red-500 text-white px-4 py-2 rounded"
							>
								Cancelar
							</button>
						)}
						{!editable && (
							<Button
								label="Eliminar"
								className="bg-red-500 text-white"
							/>
						)}
					</div>
				</div>
			) : (
				<p>
					No se puede editar esta reservación porque faltan menos de 3
					días para la fecha.
				</p>
			)}
		</Sidebar>
	);
};

export default ReservacionSidebar;
