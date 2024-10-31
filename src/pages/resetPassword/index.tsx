import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/api";
import axios, { AxiosError } from "axios";
type ToastSeverity = "success" | "info" | "warn" | "error";

const ResetPassword  = () => {
    
	const [numero_accion, setNumeroAccion] = useState<number>(0);
	const [contrasena, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
	const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    useEffect(() => {
		toast.current?.show({
			severity: "warn",
			summary: "Primer Inicio de Sesion",
			sticky: true, // El Toast se queda hasta que lo cierran
			className: "max-w-80 md:max-w-none ml-10",
			content: (
				<div className="flex flex-col align-items-end ">
					<div className="flex align-items-center gap-2">
						<span className="font-bold text-900">
							Estimado Socio
						</span>
					</div>

					<p className="m-0 text-sm">
						Parece que es su primer Inicio de sesion porfavor cambie su contraseña.
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
    

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Apretando Boton");
        try {
           await changePassword({
                numero_accion: numero_accion,
                currentPassword: contrasena,
                newPassword: newPassword
            });
            navigate(-1);
      
            
        } catch (error: unknown) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.log("Error",axiosError)
                if (axiosError.response) {
                    if (axiosError.status === 404) {
                        showToast(
                            "error",
                            "User Not Found",
                            "El número de acción o la contraseña es incorrecta."
                        );
                    } else if (axiosError.status === 401) {
                        showToast(
                            "error",
                            "Invalid Password",
                            "La contraseña actual es incorrecta."
                        );
                    } else if (axiosError.status === 400) {
                        showToast(
                            "error",
                            "Same Password",
                            "La nueva contraseña no puede ser la misma que la contraseña actual."
                        );
                    } else {
                        showToast(
                            "error",
                            "Internal Server Error",
                            "Un error inesperado ocurrió, contacta al soporte técnico."
                        );
                    }
                } else {
                    showToast(
                        "error",
                        "Network Error",
                        "Ocurrió un error de red."
                    );
                }
            } else {
                showToast(
                    "error",
                    "Unknown Error",
                    "Por favor contacta al soporte técnico."
                );
            }
        }
    };

    const showToast = (
		severity: ToastSeverity,
		summary: string,
		detail: string
	) => {
		if (toast.current) {
			toast.current.show({ severity, summary, detail });
		}
	};
    return (
		<div className="flex justify-center align-middle items-center h-[90vh]">
			<Toast ref={toast} />
			<Card>
				<div className="flex flex-col gap-4">
					<h1>Cambiar Contraseña</h1>
					<InputText
						placeholder="Usuario"
						onChange={(e) => setNumeroAccion(Number(e.target.value))}
                        
					/>
                    <Password value={contrasena} onChange={(e) => setPassword(e.target.value)} toggleMask placeholder="Antigua Contraseña"/>
					<Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} toggleMask placeholder="Nueva Contraseña"/>

					<Button
						className="w-full text-center justify-center"
						onClick={handleLogin}
					>
						Iniciar Sesión
					</Button>
				</div>
			</Card>
		</div>
	);
};

 
export default ResetPassword  ;