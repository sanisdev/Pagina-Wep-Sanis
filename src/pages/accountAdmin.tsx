import React, { useEffect, useState } from "react";
import {
	CreateUserDto,
	RegisterUserData,
	SearchResponse,
	Usuario,
} from "../interfaces/interfaces";
import {
	buscarUsuarios,
	deleteUser,
	registrarUsuario,
	updateUser,
} from "../services/api";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tab } from "@headlessui/react";
import { Message } from "primereact/message";
import { Password } from "primereact/password";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function AccountAdmin() {
	const [loading, setLoading] = useState(false);
	const [accounts, setAccounts] = useState<Usuario[]>([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const pageSize = 5;
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedAccount, setSelectedAccount] = useState<Usuario | null>(
		null
	);
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [formData, setFormData] = useState<CreateUserDto>({
		numero_accion: 0,
		nombre: "",
		correo: "",
		// contrasena: "",
		telefono: "",
	});
	const [errors, setErrors] = useState({
		numero_accion: false,
		nombre: false,
		correo: false,
		// contrasena: false,
		telefono: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [dialogData, setDialogData] = useState<Usuario | null>(null); // Combina selectedAccount y showDialog
	const toast = React.useRef<Toast>(null);

	const fetchAccounts = async () => {
		try {
			const response: SearchResponse<Usuario> = await buscarUsuarios({
				globalSearch: searchQuery,
				page,
				pageSize,
			});
			setAccounts(response.results);
			setTotal(response.total);
		} catch (error) {
			console.error("Error al buscar cuentas:", error);
		}
	};

	useEffect(() => {
		fetchAccounts();
	}, [searchQuery, page, pageSize]);

	const handleEdit = (account: Usuario) => {
		setSelectedAccount(account);
		setIsDialogVisible(true);
	};

	const handleSave = async () => {
		if (!selectedAccount?.numero_accion) {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "Número de acción no proporcionado",
				life: 3000,
			});
			return;
		}

		setLoading(true);

		try {
			await updateUser(selectedAccount.numero_accion, {
				nombre: selectedAccount.nombre,
				correo: selectedAccount.correo,
				telefono: selectedAccount.telefono,
			});
			toast.current?.show({
				severity: "success",
				summary: "Éxito",
				detail: "Usuario actualizado exitosamente",
				life: 3000,
			});
			setIsDialogVisible(false);
			fetchAccounts()
		} catch (error) {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "Ocurrió un error al actualizar el usuario",
				life: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	const validateForm = () => {
		const newErrors = {
			numero_accion:
				!formData.numero_accion || formData.numero_accion <= 0,
			nombre: !formData.nombre || !/^[a-zA-Z\s]+$/.test(formData.nombre),
			correo: !formData.correo || !/\S+@\S+\.\S+/.test(formData.correo),
			// contrasena:
			//     !formData.contrasena ||
			//     formData.contrasena.length < 5 ||
			//     formData.contrasena.length > 12,
			telefono:
				!formData.telefono || !/^\d{10,}$/.test(formData.telefono),
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some((error) => error);
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "numero_accion" ? parseInt(value) : value,
		});
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault(); // Previene la recarga de la página
		if (!validateForm()) return;
		setIsSubmitting(true);
		try {
			await registrarUsuario(formData);
			toast.current?.show({
				severity: "success",
				summary: "Éxito",
				detail: "Usuario registrado exitosamente",
				life: 3000,
			});
			setFormData({
				numero_accion: 0,
				nombre: "",
				correo: "",
				// contrasena: "",
				telefono: "",
			});
		} catch (error: any) {
			// Capturar el mensaje de error específico
			const errorMessage =
				error.response?.data?.result?.response?.message ||
				error.response?.data?.message ||
				"Ocurrió un error inesperado. Intenta nuevamente.";

			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: errorMessage,
				life: 3000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Manejar eliminación de usuario
	const handleDeleteUser = async () => {
		if (!dialogData) return;

		try {
			await deleteUser(dialogData.numero_accion);
			toast.current?.show({
				severity: "success",
				summary: "Usuario Eliminado",
				detail: `El usuario ${dialogData.nombre} ha sido eliminado permanentemente.`,
				life: 3000,
			});
			setDialogData(null); // Cierra el diálogo
			fetchAccounts(); // Actualiza la tabla
		} catch (error) {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "No se pudo eliminar al usuario. Inténtalo de nuevo.",
				life: 3000,
			});
		}
	};

	return (
		<div className="p-6">
			<Toast ref={toast} />
			<h2 className="text-2xl font-bold mb-4">
				Administración de Cuentas
			</h2>

			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
					<Tab
						className={({ selected }) =>
							classNames(
								"w-full py-2.5 text-sm leading-5 font-medium text-gray-600 rounded-lg",
								selected
									? "bg-blue-500 text-white shadow"
									: "hover:bg-gray-300 hover:text-gray-700"
							)
						}
					>
						Registrar
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								"w-full py-2.5 text-sm leading-5 font-medium text-gray-600 rounded-lg",
								selected
									? "bg-blue-500 text-white shadow"
									: "hover:bg-gray-300 hover:text-gray-700"
							)
						}
					>
						Buscar y Editar
					</Tab>
				</Tab.List>

				<Tab.Panels className="mt-4">
					<Tab.Panel className="rounded-xl bg-white p-4 shadow">
						<h3 className="text-lg font-semibold mb-4">
							Registrar Usuario
						</h3>
						<form>
							<div className="mb-4">
								<label
									htmlFor="numero_accion"
									className="block text-sm font-medium text-gray-700"
								>
									Número de Acción:
								</label>

								<InputText
									id="numero_accion"
									name="numero_accion"
									type="number"
									value={formData.numero_accion.toString()}
									onChange={handleFormChange}
									className="w-full mt-1"
								/>
								{errors.numero_accion && (
									<Message
										severity="error"
										text="El número de acción es invalido."
									/>
								)}
							</div>
							<div className="mb-4">
								<label
									htmlFor="nombre"
									className="block text-sm font-medium text-gray-700"
								>
									Nombre Completo:
								</label>
								<div className="flex flex-row"></div>
								<InputText
									id="nombre"
									name="nombre"
									value={formData.nombre}
									onChange={handleFormChange}
									className="w-full mt-1"
								/>
								{errors.nombre && (
									<Message
										severity="error"
										text="El nombre solo puede contener letras."
									/>
								)}
							</div>
							<div className="mb-4">
								<label
									htmlFor="correo"
									className="block text-sm font-medium text-gray-700"
								>
									Correo Electrónico:
								</label>
								<InputText
									id="correo"
									name="correo"
									type="email"
									value={formData.correo}
									onChange={handleFormChange}
									className="w-full mt-1"
								/>
								{errors.correo && (
									<Message
										severity="error"
										text="El correo electrónico no es válido."
									/>
								)}
							</div>

							<div className="mb-4">
								<label
									htmlFor="telefono"
									className="block text-sm font-medium text-gray-700"
								>
									Teléfono:
								</label>
								<InputText
									id="telefono"
									name="telefono"
									value={formData.telefono}
									onChange={handleFormChange}
									className="w-full mt-1"
								/>
								{errors.telefono && (
									<Message
										severity="error"
										text="El teléfono debe tener al menos 10 dígitos."
									/>
								)}
							</div>
							<div className="mb-4">
								<label
									htmlFor="contrasena"
									className="block text-sm font-medium text-gray-700"
								>
									Contraseña:
								</label>
								{/* <Password
                                    id="contrasena"
                                    name="contrasena"
                                    value={formData.contrasena}
                                    onChange={handleFormChange}
                                    toggleMask
                                    feedback={false}
                                    className=" mt-1"
                                />
                                {errors.contrasena && (
                                    <Message
                                        severity="error"
                                        text="La contraseña debe tener entre 5 y 12 caracteres."
										className="mt-1"
                                    />
                                )} */}
							</div>
							<Button
								label="Registrar"
								onClick={handleRegister}
								loading={isSubmitting}
								disabled={isSubmitting}
							/>
						</form>
					</Tab.Panel>

					<Tab.Panel className="rounded-xl bg-white p-4 shadow">
						<div className="mb-4">
							<InputText
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Buscar cuentas"
								className="p-inputtext-sm w-full"
							/>
						</div>
						<DataTable
							value={accounts}
							paginator
							rows={pageSize}
							totalRecords={total}
							onPage={(e) => setPage(e.page! + 1)}
							selectionMode="single"
							onRowSelect={(e) => handleEdit(e.data as Usuario)}
						>
							<Column
								field="numero_accion"
								header="Número de Acción"
							/>
							<Column field="nombre" header="Nombre" />
							<Column field="correo" header="Correo" />
							<Column field="telefono" header="Teléfono" />
							<Column
								body={(rowData) => (
									<div className="flex gap-2">
										<Button
											label="Editar"
											onClick={() =>
												handleEdit(rowData as Usuario)
											}
										/>
										<Button
											label="Eliminar"
											className="p-button-danger"
											onClick={() =>
												setDialogData(rowData)
											}
										/>
									</div>
								)}
							/>
						</DataTable>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>

			<Dialog
				visible={isDialogVisible}
				header="Editar Cuenta"
				onHide={() => setIsDialogVisible(false)}
				className="w-[20rem] "
				
			>
				<form>
					<div className="mb-4" >
						<label
							htmlFor="nombre"
							className="block text-sm font-medium text-gray-700"
						>
							Nombre Completo:
						</label>
						<InputText
							id="nombre"
							value={selectedAccount?.nombre || ""}
							className="w-full"
							onChange={(e) =>
								setSelectedAccount({
									...selectedAccount,
									nombre: e.target.value,
								} as Usuario)
							}
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="correo"
							className="block text-sm font-medium text-gray-700"
						>
							Correo:
						</label>
						<InputText
							id="correo"
							value={selectedAccount?.correo || ""}
							className="w-full"
							onChange={(e) =>
								setSelectedAccount({
									...selectedAccount,
									correo: e.target.value,
								} as Usuario)
							}
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="telefono"
							className="block text-sm font-medium text-gray-700"
						>
							Teléfono:
						</label>
						<InputText
							id="telefono"
							value={selectedAccount?.telefono || ""}
							className="w-full"
							onChange={(e) =>
								setSelectedAccount({
									...selectedAccount,
									telefono: e.target.value,
								} as Usuario)
							}
						/>
					</div>
					<Button
						label={loading ? "Guardando..." : "Guardar"}
						icon={loading ? "pi pi-spin pi-spinner" : undefined}
						onClick={handleSave}
						disabled={loading}
					/>
				</form>
			</Dialog>
			{/* Diálogo de Confirmación */}
			<Dialog
				visible={!!dialogData}
				onHide={() => setDialogData(null)}
				header="Confirmar Eliminación"
				style={{ width: "450px" }}
				footer={
					<div>
						<Button
							label="Cancelar"
							className="p-button-text"
							onClick={() => setDialogData(null)}
						/>
						<Button
							label="Eliminar"
							className="p-button-danger"
							onClick={handleDeleteUser}
						/>
					</div>
				}
			>
				<p>
					¿Estás seguro de que deseas eliminar al usuario{" "}
					<strong>{dialogData?.nombre}</strong>? Esta acción es
					permanente y no se podrán recuperar los datos.
				</p>
			</Dialog>
		</div>
	);
}
