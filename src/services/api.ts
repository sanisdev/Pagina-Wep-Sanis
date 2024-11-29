import axios, { AxiosResponse } from "axios";
import {
	FechasResponse,
	LoginResponse,
	Reservacion,
	LoginReservationData,
	ReservacionResponse,
	changePasswordData,
	UpdateInvitadosBatchDto,
	ResponseReservacionDia,
	Invitado,
	UpdateReservacion,
	RegisterUserData,
	RegisterResponse,
	SearchResponse,
	Usuario,
	CreateUserDto,
	RequestPasswordResetData,
	PasswordResetResponse,
	ResetPasswordDto,
} from "../interfaces/interfaces";

const API_BASE_URL = "https://https.api-reservaciones.com";


const api = axios.create({
	baseURL: API_BASE_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const login = async (
	data: LoginReservationData
): Promise<LoginResponse> => {
	// console.log("POST Login");
	try {
		// Realizar la solicitud de login a la API
		const response: AxiosResponse<LoginResponse> = await api.post(
			"/auth/login",
			data
		);

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
		console.error(
			"Error during login:",
			error.response?.data || error.message
		);
		throw error;
	}
};

// Función para registrar un nuevo usuario
export const registerUser = async (
	data: RegisterUserData
  ): Promise<RegisterResponse> => {
	try {
	  // Realizar la solicitud POST al endpoint de registro
	  const response: AxiosResponse<RegisterResponse> = await api.post(
		'/register',
		data
	  );
  
	  // Retornar la respuesta de la API
	  return response.data;
	} catch (error: any) {
	  // Manejo de errores
	  console.error(
		'Error during user registration:',
		error.response?.data || error.message
	  );
	  throw error;
	}
  };

export const changePassword = async (
	data: changePasswordData
): Promise<LoginResponse> => {
	try {
		// Realizar la solicitud de login a la API
		const response: AxiosResponse<LoginResponse> = await api.put(
			"/auth/change-password",
			data
		);
		return response.data;
	} catch (error: any) {
		console.error(
			"Error during change Password:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const requestPasswordReset = async (
	data: RequestPasswordResetData
): Promise<PasswordResetResponse> => {
	try {
		const response: AxiosResponse<PasswordResetResponse> = await api.post(
			'/auth/request-password-reset',
			data
		);
		return response.data;
	} catch (error: any) {
		console.error(
			'Error during password reset request:',
			error.response?.data || error.message
		);
		throw error;
	}
};

export const resetPassword = async (
	data: ResetPasswordDto
  ): Promise<PasswordResetResponse> => {
	try {
	  const response: AxiosResponse<PasswordResetResponse> = await api.put(
		'/auth/reset-password',
		data
	  );
	  return response.data;
	} catch (error: any) {
	  console.error('Error during password reset:', error.response?.data || error.message);
	  throw error;
	}
  };

export const obtenerFechas = async (id: number): Promise<FechasResponse> => {
	try {
		const response: AxiosResponse<Promise<FechasResponse>> = await api.get(
			`/reservations/palapa/${id}/reservaciones-restantes`
		);
		return response.data;
	} catch (error) {
		console.error("Error al obtener las fechas:", error);
		throw error;
	}
};

// Función para obtener eventos por fecha
// export const obtenerEventosPorFecha = async (fecha: string): Promise<ReservacionResponse[]> => {
// 	// console.log(fecha)
// 	 console.log(`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`)
// 	try {
// 	  const response = await api.get(`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`);
// 	  console.log("Lista de eventos"+response.data)
// 	  return response.data;
// 	} catch (error) {
// 	  console.error("Error al obtener los eventos por fecha:", error);
// 	  throw error;
// 	}
//   };

export const obtenerEventosPorId = async (): Promise<ReservacionResponse> => {
	// console.log(`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`)
	try {
		const response = await api.get(
			`/reservations/user/${Number(
				localStorage.getItem("userId")
			)}/pending`
		);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error("Error al obtener las reservaciones del usuario:", error);
		throw error;
	}
};

export const agregarReservacion = async (
	data: Reservacion
): Promise<Reservacion> => {
	try {
		const response: AxiosResponse<Reservacion> = await api.post(
			"/reservations",
			data
		);
		return response.data;
	} catch (error) {
		console.error("Error al agregar la reservación:", error);
		throw error;
	}
};

/**
 * Actualiza la lista de invitados de una reservación específica.
 * @param reservacionId ID de la reservación a actualizar
 * @param invitados Lista de invitados con los datos actualizados
 * @returns Promesa con la respuesta de la API
 */
export const actualizarInvitados = async (
	reservacionId: number,
	invitados: UpdateInvitadosBatchDto
): Promise<ReservacionResponse> => {
	try {
		const response: AxiosResponse<ReservacionResponse> = await api.put(
			`/reservaciones/${reservacionId}/invitados`,
			invitados
		);
		return response.data;
	} catch (error: any) {
		console.error(
			"Error al actualizar invitados:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const obtenerInvitadosDelDia = async (
	fecha: string
): Promise<ResponseReservacionDia[]> => {
	// console.log(fecha)
	console.log(
		`/reservations/reservaciones/fecha/${encodeURIComponent(fecha)}`
	);
	try {
		const response = await api.get(
			`/reservations/invitados-dia/${encodeURIComponent(fecha)}`
		);
		console.log("Lista de eventos" + response.data);
		return response.data;
	} catch (error) {
		console.error("Error al obtener los eventos por fecha:", error);
		throw error;
	}
};

export const updateBatch = async (data: { invitados: Invitado[] }) => {
	try {
		// Envía `data` directamente, ya que ahora contiene `invitados` como propiedad
		const response = await api.put(`/invitados/batch-update`, data);
		console.log("Respuesta del servidor:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error al actualizar los invitados en batch:", error);
		throw error;
	}
};

// Función para actualizar una reservación en el backend
export const updateReservacion = async (
	id: number,
	data: UpdateReservacion
): Promise<any> => {
	try {
		// Realizar la solicitud PATCH a la API
		const response = await api.patch(`/reservations/${id}`, data);

		// Retornar la respuesta
		return response.data;
	} catch (error: any) {
		console.error(
			"Error updating reservation:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const cancelarReservacion = async (
	id: number,
	estatus: string
): Promise<any> => {
	try {
		// Valida que el estatus sea válido
		if (!["PENALIZADA", "CANCELADA"].includes(estatus)) {
			throw new Error("Estatus inválido");
		}

		// Realiza la solicitud al endpoint con el estatus proporcionado
		const response = await api.patch(
			`/reservations/${id}/status/${estatus}`
		);
		return response.data;
	} catch (error: any) {
		console.error(
			`Error al cambiar el estatus de la reservación a ${estatus}:`,
			error.response?.data || error.message
		);
		throw error;
	}
};

export const obtenerReservacionesPorMes = async (month: number): Promise<ReservacionResponse[]> => {
	try {
		const response = await api.get<ReservacionResponse[]>(`reservations/month/${month}`);
		return response.data;
	} catch (error: any) {
		console.error("Error al obtener las reservaciones:", error.response?.data || error.message);
		throw error;
	}
};

export const actualizarInvitado = async (id: number, updateData: Partial<Invitado>): Promise<Invitado> => {
    try {
        const response = await api.patch<Invitado>(`/invitados/${id}`, updateData);
        return response.data;
    } catch (error: any) {
        console.error("Error al actualizar el invitado:", error.response?.data || error.message);
        throw error;
    }
};

export const actualizarEstatusReservacion = async (id: number, estatus: string): Promise<{ message: string }> => {
    try {
        const response = await api.patch<{ message: string }>(`reservations/${id}/status/${estatus}`);
        return response.data;
    } catch (error: any) {
        console.error("Error al actualizar el estatus de la reservación:", error.response?.data || error.message);
        throw error;
    }
};

export const buscarUsuarios = async (params: {
    globalSearch?: string;
    page?: number;
    pageSize?: number;
}): Promise<SearchResponse<Usuario>> => {
    try {
        const response = await api.get<SearchResponse<Usuario>>('/users/search', { params });
        return response.data;
    } catch (error: any) {
        console.error("Error en la búsqueda:", error.response?.data || error.message);
        throw error;
    }
};

export const registrarUsuario = async (userData: CreateUserDto): Promise<any> => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error: any) {
        console.error("Error al registrar usuario:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<void> => {
	try {
		await api.delete(`/users/${id}`);
	} catch (error: any) {
		console.error('Error al eliminar usuario:', error.response?.data || error.message);
		throw error;
	}
};

export const updateUser = async (numero_accion: number, data: Partial<Usuario>): Promise<Usuario> => {
	try {
	  const response = await api.patch(`/users/${numero_accion}`, data);
	  return response.data;
	} catch (error) {
	  console.error('Error al actualizar el usuario:', error);
	  throw error;
	}
  };