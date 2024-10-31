import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../services/api";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import axios, { AxiosError } from "axios";
import { Password } from "primereact/password";
import { JwtPayload } from "../../interfaces/interfaces";
type ToastSeverity = "success" | "info" | "warn" | "error";



const LoginReservations = () => {
	const { isAdeudo } = useParams<{ isAdeudo: string }>();
	const Navigate = useNavigate();
	const [numero_accion, setNumeroAccion] = useState<string>("");
	const [contrasena, setPassword] = useState<string>("");
	const toast = useRef<Toast>(null);

	// Variable estática que simula un token JWT
	//Admin
	// const staticToken =
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGVqZW1wbG8uY29tIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk1ODQ3MDAwfQ.-QHzmOZMH-P7HJu4tbBAMAAuJ_vgFHdsldhUBJmJq4A";

	// //Usuario
	// const staticTokenUser =
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3VhcmlvQGVqZW1wbG8uY29tIiwicm9sZSI6InVzdWFyaW8iLCJleHAiOjE3MDE3MzcwMDB9.QpO7m1TRa6RZg4v-Y8moxYPqZ3RGQovW5BdxXy7APlI";
	// //Empleado
	// const staticTokenEmpleado =
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbXBsZWFkb0BlamVtcGxvLmNvbSIsInJvbGUiOiJlbXBsZWFkbyIsImV4cCI6MTcwMTczNzAwMH0.8CbpGZtp04VcUQGVXz_b1DOAkNOl5P74F-9r9eVLCBQ";

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		// console.log("Apretando Boton");
		try {
			const result = await login({
				numero_accion: numero_accion,
				contrasena: contrasena,
			});

			// console.log(response.data.result)
			// Obtener el token de la respuesta

			if (result.result.primerInicioSesion == true) {
				showToast(
					"info",
					"Cambio de Contraseña",
					"Debe cambiar su contraseña en su primer inicio de sesión."
				);
				Navigate("/resetPassword"); // Redirige a la página de cambio de contraseña
				return; // Detener la ejecución del switch para evitar más redirecciones
			} else {
				const { token } = result.result;

				// Almacenar el token en el localStorage o sessionStorage
				localStorage.setItem("authToken", token!);

				// Decodificar el token usando la interfaz para tipar el resultado
				const decodedToken = jwtDecode<JwtPayload>(token!);

				// Guardar el ID del usuario en localStorage
				const userId = decodedToken.numero_accion; // Asumiendo que el ID del usuario está en el campo 'sub'
				localStorage.setItem("userId", userId.toString());

				// Verificación para primer inicio de sesión

				if (isAdeudo == "true") {
					Navigate("/Adeudos");
				} else {
					switch (decodedToken.role) {
						// case "usuario":
						case "user":
							Navigate("/index"); // Comentario: Redirige a la página principal para usuarios regulares
							break;
						case "empleado":
							Navigate("/Invitados"); // Comentario: Redirige a la sección de invitados para empleados
							break;
						case "admin":
							Navigate("/PanelResevaciones"); // Comentario: Redirige al panel de administración para admins
							break;
						case "superadmin":
							Navigate("/admin-usuarios"); // Comentario: Redirige al panel de administración de usuarios para superadmins
							break;
						default:
							Navigate("/login"); // Si el rol no es válido, redirige al login
							break;
					}
				}
			}
		} catch (error: unknown) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				// `error` es un `AxiosError` aquí
				const axiosError = error as AxiosError;

				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						showToast(
							"error",
							"Usuario no Encontrado",
							"El Usuario que ingreso no existe verifique su usuario."
						);
					} else if (axiosError.response.status === 401) {
						showToast(
							"error",
							"Contraseña Incorrecta",
							"El Usuario o contraseña es incorrecto."
						);
					} else {
						showToast(
							"error",
							"Internal Server Error",
							"Un error inesperado acaba de ocurrir contacta a soporte tecnico."
						);
					}
				} else {
					showToast(
						"error",
						"Network Error",
						"A network error occurred."
					);
				}
			} else {
				showToast(
					"error",
					"Unknown Error",
					"Porfavor Contacta a Soporte Tecnico."
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
					<h1>Inicia Sesión</h1>
					<InputText
						placeholder="Usuario"
						onChange={(e) => setNumeroAccion(e.target.value)}
					/>
					{/* <InputText
						placeholder="Contraseña"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/> */}
					<Password
						value={contrasena}
						onChange={(e) => setPassword(e.target.value)}
						toggleMask
						placeholder="contraseña"
					/>

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

export default LoginReservations;
