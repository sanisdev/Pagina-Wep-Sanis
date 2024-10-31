import { useNavigate } from "react-router-dom";
import "../../css/login.css";

import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { login } from "../../services/api-comunicacion";
import { Toast } from "primereact/toast";

type ToastSeverity = "success" | "info" | "warn" | "error";

interface AxiosError {
	response?: {
		status: number;
		data?: any;
	};
}



const Login = () => {
	const Navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const toast = useRef<Toast>(null);

	
	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("Apretando Boton");
		try {
			const result = await login({ correo: email, password: password });
			const token = result.result.token;
			localStorage.setItem("token", token!);
			Navigate("/Panel");
			// Aquí puedes manejar el token, por ejemplo, guardarlo en localStorage
			// localStorage.setItem('token', result.token);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				// `error` es un `AxiosError` aquí
				const axiosError = error as AxiosError;

				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						showToast(
							"error",
							"User Not Found",
							"The email or password is incorrect."
						);
					} else if (axiosError.response.status === 401) {
						showToast(
							"error",
							"Invalid Password",
							"The email or password is incorrect."
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
					"An unknown error occurred."
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
		<div>
			<Toast ref={toast} />
			<section>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>

				<div className="signin ">
					<div className="content">
						<h2>Inicio</h2>
						<form onSubmit={handleLogin}>
							<div className="form">
								<div className="inputBox">
									<InputText
										value={email}
										className="inputBox  "
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
									{/* <input type="text" required /> */}
									<i>Usuario</i>
								</div>
								<div className="inputBox ">
									<InputText
										value={password}
										className="inputBox "
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									{/* <input type="password" required /> */}
									<i>Contraseña</i>
								</div>
								{/* <MultiStateCheckbox
									value={value}
									onChange={(
										e: MultiStateCheckboxChangeEvent
									) => setValue(e.value)}
									options={options}
									optionValue="value"
									className="custom-multistate h-3"
								/>
								<span className="custom-span">
									{value || "no value"}
								</span> */}
								{/* <div className="links">
									<a href="#">Olvidé la Contraseña</a>
									{/* <a href="#">Registrase</a> 
								</div> */}

								<div className="inputBox">
									<input type="submit" value="Iniciar" />
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
