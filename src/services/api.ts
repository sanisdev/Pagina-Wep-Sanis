import axios, { AxiosResponse } from "axios";
import { FechasResponse, LoginResponse, Reservacion, LoginReservationData, ReservacionResponse, changePasswordData } from "../interfaces/interfaces";



const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
	baseURL: API_BASE_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);



  export const login = async (data: LoginReservationData): Promise<LoginResponse>  => {
	// console.log("POST Login");
	try {
        // Realizar la solicitud de login a la API
        const response: AxiosResponse<LoginResponse> = await api.post("/auth/login", data);

		// console.log(response.data.result)
        // Obtener el token de la respuesta
        // const { token } = response.data.result;

        // // Almacenar el token en el localStorage o sessionStorage
        // localStorage.setItem('authToken', token);

        // // Decodificar el token usando la interfaz para tipar el resultado
        // const decodedToken = jwtDecode<JwtPayload>(token);

		// // Guardar el ID del usuario en localStorage
        // const userId = decodedToken.numero_accion; // Asumiendo que el ID del usuario está en el campo 'sub'
		// localStorage.setItem('userId', userId.toString());
		

        // Retornar el role para su uso en la redirección
        return response.data;
    } catch (error: any) {
		console.error('Error during login:', error.response?.data || error.message);
        throw error;
    }
};

export const changePassword = async (data: changePasswordData): Promise<LoginResponse> => {
	
	try {
        // Realizar la solicitud de login a la API
        const response: AxiosResponse<LoginResponse> = await api.put("/auth/change-password", data);
        return response.data;
    } catch (error: any) {
		console.error('Error during change Password:', error.response?.data || error.message);
        throw error;
    }
};
  
export const obtenerFechas = async (id:number): Promise<FechasResponse> => {
	try {
		const response: AxiosResponse<Promise<FechasResponse>> = await api.get(`/reservations/palapa/${id}/reservaciones-restantes`);
		return response.data;
	} catch (error) {
		console.error("Error al obtener las fechas:", error);
		throw error;
	}
}; 

// Función para obtener eventos por fecha
export const obtenerEventosPorFecha = async (fecha: string): Promise<ReservacionResponse[]> => {
	// console.log(`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`)
	try {
	  const response = await api.get(`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`);
	  return response.data;
	} catch (error) {
	  console.error("Error al obtener los eventos por fecha:", error);
	  throw error;
	}
  };

  export const obtenerEventosPorId = async (): Promise<ReservacionResponse[]> => {
	// console.log(`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`)
	try {
	  const response = await api.get(`/reservations/user/${Number(localStorage.getItem("userId"))}/pending`);
	  return response.data;
	} catch (error) {
	  console.error("Error al obtener las reservaciones del usuario:", error);
	  throw error;
	}
  };

  export const agregarReservacion = async (data: Reservacion): Promise<Reservacion> => {
	try {
		const response: AxiosResponse<Reservacion> = await api.post("/reservations", data);
		return response.data;
	} catch (error) {
		console.error("Error al agregar la reservación:", error);
		throw error;
	}
};