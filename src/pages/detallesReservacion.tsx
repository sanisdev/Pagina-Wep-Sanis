import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Invitado, ReservacionResponse } from "../interfaces/interfaces";
import { cancelarReservacion, obtenerEventosPorId, updateReservacion } from "../services/api";
import * as Constants from "../constants";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";

export default function ResumenReservacion() {
	const [editando, setEditando] = useState<boolean>(false);
	const [reservacion, setReservacion] = useState<ReservacionResponse | null>(
		null
	);
	const colors: string[] = ["Negro", "Chocolate"];
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const selectedMantel =
		selectedColor === "Chocolate"
			? Constants.mantel1
			: selectedColor === "Negro"
			? Constants.mantel2
			: null;
            const Navigate = useNavigate();

	const getReservaciones = async () => {
		try {
			const respuesta = await obtenerEventosPorId(); // Llamada a la API
			if (respuesta) {
				setReservacion(respuesta);
				console.log("Reservación obtenida:", respuesta); // Verificación
			} else {
				console.warn("No se recibió una respuesta válida de la API.");
			}
		} catch (error) {
			console.error("Error al obtener la reservación:", error);
		}
	};

    const handleCancelarReservacion = async () => {
        try {
          const idReservacion = reservacion?.id; // Asegúrate de que tienes el ID de la reservación
          if (!idReservacion) {
            console.error("No se encontró el ID de la reservación.");
            return;
          }
      
          await cancelarReservacion(idReservacion);
          // Redirige al usuario a la ruta anterior
          Navigate(-1);
          console.log("Reservación cancelada exitosamente");
          // Aquí puedes actualizar el estado o mostrar un mensaje de confirmación
        } catch (error) {
          console.error("Error al cancelar la reservación:", error);
        }
      };

	useEffect(() => {
		getReservaciones();
	}, []);

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
				setEditando(false); // Cierra el modo edición tras la actualización
			} catch (error) {
				console.error("Error al actualizar la reservación:", error);
			}
		}
	};

	const agregarInvitado = () => {
		setReservacion((prev) => {
			if (prev) {
				const nuevosInvitados = [
					...prev.invitados,
					{
						id: null, // Establece id como null para que sea asignado en el backend
						nombre: "",
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

	const actualizarInvitado = (index: number, valor: string) => {
		setReservacion((prev) => {
			if (prev) {
				const nuevosInvitados = prev.invitados.map((invitado, i) =>
					i === index ? { ...invitado, nombre: valor } : invitado
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
									id="fecha"
									value={
										reservacion?.fecha
											? new Date(reservacion.fecha)
											: undefined
									}
									onChange={handleDateChange}
									dateFormat="yy-mm-dd"
									className="w-full"
									required
									showIcon
								/>
							</div>
							<div>
								<label
									htmlFor="colorManteles"
									className="block font-semibold"
								>
									Color de los Manteles
								</label>
								<div className="flex flex-row justify-end">
									<div></div>
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
									className="flex items-center mt-2"
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
										icon="pi pi-times"
										className="p-button-text ml-2"
										onClick={() => eliminarInvitado(index)}
									/>
								</div>
							))}
							<Button
								type="button"
								label="Agregar Invitado"
								onClick={agregarInvitado}
								className="mt-2 w-full"
							/>
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
							<div>
								<i className="pi pi-calendar mr-2 text-gray-500"></i>
								<span>
									{new Date(
										reservacion.fecha
									).toLocaleDateString()}
								</span>
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
		</Card>
	);
}
