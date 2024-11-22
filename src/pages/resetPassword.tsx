import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const [token, setToken] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const toast = useRef<Toast>(null);
    const Navigate = useNavigate();

	// Mostrar el toast automáticamente al renderizar la pantalla
	useEffect(() => {
		toast.current!.show({
			severity: "info",
			summary: "Correo enviado",
			detail: "Revisa tu correo para el token de restablecimiento.",
		});
	}, []); // Solo se ejecuta una vez al montar el componente

	const handleResetPassword = async () => {
		try {
			await resetPassword({ token, newPassword });
			toast.current!.show({
				severity: "success",
				summary: "Éxito",
				detail: "Contraseña restablecida correctamente.",
            });
            // Redirige al login después de 2 segundos
            setTimeout(() => {
                Navigate("/login");
            }, 2000);
		} catch (error: any) {
			toast.current!.show({
				severity: "error",
				summary: "Error",
				detail:
					error.response?.data?.message ||
					"Error al restablecer la contraseña.",
			});
		}
	};

	return (
		<div className="flex justify-center align-middle items-center h-[85vh]">
			<Toast ref={toast} />
			<Card>
				<div className="flex flex-col gap-4">
					<h1>Restablecer Contraseña</h1>
					<InputText
						placeholder="Token"
						value={token}
						onChange={(e) => setToken(e.target.value)}
						className="w-[32rem] "
					/>
					<div>
						<Password
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							toggleMask
							placeholder="Nueva Contraseña"
						/>
					</div>

					<div className="flex justify-center items-center">
						<Button
							className="w-80 justify-center items-center align-middle"
							onClick={handleResetPassword}
						>
							Restablecer Contraseña
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ResetPassword;
