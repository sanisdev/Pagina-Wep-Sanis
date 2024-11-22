// src/services/api.ts
import axios, { AxiosResponse } from "axios";
import {
	CreateAvisoDto,
	Evento,
	EventoResponse,
	LoginData,
	LoginResponse,
} from "../interfaces/interfaces";

const API_BASE_URL = "https://api.sanis.mx";

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

export const login = async (data: LoginData): Promise<LoginResponse> => {
	console.log("POST Login");
	try {
		const response: AxiosResponse<LoginResponse> = await api.post(
			"/auth/login",
			data
		);
		return response.data;
	} catch (error) {
		// console.error("Error during login:", error);
		throw error;
	}
};

// export const getProtectedData = async () => {
//     try {
//       const response: AxiosResponse<any> = await api.get('/avisos');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching protected data:', error);
//       throw error;
//     }
//   };
//

export const obtenerAvisos = async (): Promise<any[]> => {
	try {
		const response: AxiosResponse<any[]> = await api.get("/avisos");
		return response.data;
	} catch (error) {
		console.error("Error al obtener los avisos:", error);
		throw error;
	}
};

// Función para obtener los eventos
export const obtenerEventos = async (): Promise<EventoResponse[]> => {
	try {
		const response: AxiosResponse<EventoResponse[]> = await api.get(
			"/eventos",
			{
				responseType: "json",
			}
		);

		// No necesitas convertir las imágenes a Blob ya que ya tienes las URLs
		const eventosConUrls = response.data.map((evento: EventoResponse) => {
			return { ...evento };
		});

		return eventosConUrls;
	} catch (error) {
		console.error("Error al obtener los eventos:", error);
		throw error;
	}
};

export const eliminarEvento = async (id: number): Promise<void> => {
	try {
		await api.delete(`/eventos/${id}`);
	} catch (error) {
		console.error("Error al eliminar el evento:", error);
		throw error;
	}
};

export const newEvento = async (evento: Evento): Promise<void> => {
	const formData = new FormData();
	formData.append("file", evento.file);
	formData.append("name", evento.name);

	await api.post("/eventos", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const agregarAviso = async (aviso: CreateAvisoDto) => {
	try {
		const response = await api.post("/avisos", aviso, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		// Manejo de errores
		console.error("Error al agregar aviso:", error);
		throw error; // Lanza el error para que pueda ser manejado en el componente
	}
};

export const editarAviso = async (id: number, aviso: CreateAvisoDto) => {
	try {
		const response = await api.put(`/avisos/${id}`, aviso, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		// Manejo de errores
		console.error("Error al editar aviso:", error);
		throw error; // Lanza el error para que pueda ser manejado en el componente
	}
};

export const eliminarAviso = async (id: number) => {
	try {
		const response = await api.delete(`/avisos/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error al eliminar aviso:", error);
		throw error;
	}
};
