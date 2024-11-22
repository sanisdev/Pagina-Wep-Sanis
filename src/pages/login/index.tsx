import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login, requestPasswordReset } from "../../services/api";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import axios, { AxiosError } from "axios";
import { Password } from "primereact/password";
import { JwtPayload } from "../../interfaces/interfaces";
import { Dialog } from "primereact/dialog";
type ToastSeverity = "success" | "info" | "warn" | "error";

const LoginReservations = () => {
	const { isAdeudo } = useParams<{ isAdeudo: string }>();
	const Navigate = useNavigate();
	const [numero_accion, setNumeroAccion] = useState<string>("");
	const [contrasena, setPassword] = useState<string>("");
	const toast = useRef<Toast>(null);
	const [showDialog, setShowDialog] = useState(false);
	const [email, setEmail] = useState("");

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

		try {
			const result = await login({
				numero_accion,
				contrasena,
			});

			const { primerInicioSesion, token } = result.result;

			// Caso 1: Redirigir a cambio de contraseña si es el primer inicio de sesión
			if (primerInicioSesion) {
				showToast(
					"info",
					"Cambio de Contraseña",
					"Debe cambiar su contraseña en su primer inicio de sesión."
				);
				Navigate("/ChangeInitialPassword");
				return;
			}

			// Guardar el token y el userId en localStorage
			localStorage.setItem("authToken", token!);
			const decodedToken = jwtDecode<JwtPayload>(token!);
			const userId = decodedToken.numero_accion;
			localStorage.setItem("userId", userId.toString());

			// Definir las rutas basadas en el rol
			const roleRoutes: { [key: string]: string } = {
				user: "/index",
				empleado: "/Invitados",
				admin: "/PanelResevaciones",
				master: "/AccountAdmin",
				superadmin: "/AccountAdmin",
			};

			// Verificar reservación pendiente solo si el rol es "user"
			if (
				decodedToken.role === "user" &&
				result.result.reservacionPendiente
			) {
				Navigate("/resumenReservacion");
				return;
			}

			// Redirigir según el rol del usuario
			const route =
				roleRoutes[decodedToken.role as keyof typeof roleRoutes] ||
				"/login";
			Navigate(route);
		} catch (error: unknown) {
			console.error(error);

			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;

				if (axiosError.response) {
					switch (axiosError.response.status) {
						case 404:
							showToast(
								"error",
								"Usuario no Encontrado",
								"El Usuario que ingresó no existe, verifique su usuario."
							);
							break;
						case 401:
							showToast(
								"error",
								"Contraseña Incorrecta",
								"El Usuario o contraseña es incorrecto."
							);
							break;
						default:
							showToast(
								"error",
								"Internal Server Error",
								"Un error inesperado acaba de ocurrir. Contacte a soporte técnico."
							);
							break;
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
					"Por favor, contacte a soporte técnico."
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

	const handleRequestPasswordReset = async () => {
		try {
			await requestPasswordReset({ email });
			setShowDialog(false); // Cierra el diálogo
			Navigate("/ResetPassword"); // Redirige a la pantalla de reset
		} catch (error: any) {
			toast.current!.show({
				severity: "error",
				summary: "Error",
				detail:
					error.response?.data?.message ||
					"Error al enviar el correo.",
			});
		}
	};

	return (
		<div className="flex justify-center align-middle items-center h-[85vh]">
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
					<span
						className="w-full text-center justify-center text-blue-500 cursor-pointer"
						onClick={() => setShowDialog(true)}
					>
						¿Olvidaste tu contraseña?
					</span>
				</div>
			</Card>
			<Dialog
				header="Recuperar Contraseña"
				visible={showDialog}
				style={{ width: "400px" }}
				onHide={() => setShowDialog(false)}
			>
				<div className="flex flex-col gap-4">
					<p>
						Por favor, ingresa tu correo electrónico para
						restablecer tu contraseña.
					</p>
					<InputText
						placeholder="Correo Electrónico"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button
						className="w-full"
						onClick={handleRequestPasswordReset}
					>
						Enviar Correo
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default LoginReservations;
