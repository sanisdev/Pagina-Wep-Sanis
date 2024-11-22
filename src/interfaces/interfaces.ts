export interface LoginResponse {
	status: string;
	message: string;
	result: {
		token: string | undefined;
		response: Response | undefined;
		primerInicioSesion: boolean | undefined;
		reservacionPendiente: boolean | undefined;
	}; // o lo que tu API devuelva en la respuesta
}
export interface Response {
	statusCode: number | undefined;
	error: string | undefined;
	menssage: string;

	role: string | undefined;
}

export interface LoginData {
	correo: string;
	password: string;
}
export interface LoginReservationData {
	numero_accion: string;
	contrasena: string;
}
export interface changePasswordData {
	numero_accion: number;
	currentPassword: string;
	newPassword: string;
}

export interface EventoResponse {
	id: number;
	url: string;
	name: string;
	file: File | null;
}

export interface Evento {
	url: string;
	name: string;
	file: File;
}

export interface CreateAvisoDto {
	descripcion: string;
}

export interface Aviso {
	id: number;
	descripcion: string;
}
//Interfaces reservaciones

export interface FechasResponse {
	status: string;
	message: string;
	result: string[]; // o 'any[]' si los datos son de otro tipo
}

export interface JwtPayload {
	numero_accion: number; // Asegúrate de usar el tipo adecuado
	role: string;
	exp: number; // Expiración del token en formato UNIX
}

// Interfaz para el usuario
export interface Usuario {
	numero_accion: number;
	nombre: string;
	correo: string;
	telefono: string;
	
}

export interface InvitadoResponse extends Invitado {
	reservacion_id?: number;
}

export interface Invitado {
	id: number | null;
	nombre: string;
	check_in: boolean;
	numero_pulsera: number | undefined;
	pulsera_devuelta: boolean;
}

// Interfaz para una reservación
export interface Reservacion {
	usuario_id: number; // ID del usuario que realiza la reservación
	palapa_id: number; // ID de la palapa
	fecha: string; // Fecha en formato ISO (ej. "2024-10-15T14:00:00Z")
	hora_inicio: string; // Hora de inicio en formato HH:mm:ss
	hora_fin: string; // Hora de fin en formato HH:mm:ss
	numero_mesas: number; // Número de mesas
	numero_manteles: number; // Número de manteles
	color_manteles: string; // Color de los manteles
	notas: string; // Notas adicionales
	invitados: Invitado[]; // Lista de invitados
	estatus: string; // Lista de invitados
}

// Interfaz para la respuesta de la API
export interface EventosDelDiaResponse {
	reservaciones: Reservacion[];
}

export interface ReservacionResponse {
	id: number;
	usuario_id: number; // ID del usuario que realiza la reservación
	palapa_id: number; // ID de la palapa
	fecha: string; // Fecha en formato ISO (ej. "2024-10-15T14:00:00Z")
	hora_inicio: string; // Hora de inicio en formato HH:mm:ss
	hora_fin: string; // Hora de fin en formato HH:mm:ss
	numero_mesas: number; // Número de mesas
	numero_manteles: number; // Número de manteles
	color_manteles: string; // Color de los manteles
	notas: string; // Notas adicionales
	estatus: string;
	usuario: Usuario | null;
	invitados: InvitadoResponse[]; // Lista de invitados
	palapa: Palapas;
	tablon:boolean;
}



export interface Palapas {
	id: number;
	nombre: string;
}

export interface UpdateInvitadosBatchDto {
	invitados: Invitado[];
}

export interface UsuarioSimplificado {
	nombre: string;
  }

// Interfaz para cada reservación del día
export interface ResponseReservacionDia {
	id: number;
	usuario: UsuarioSimplificado;
	palapa: Palapas;
	invitados: Invitado[];
}

export interface UpdateReservacion {
	fecha: string; // Fecha en formato ISO (ej. "2024-10-15T14:00:00Z")
	numero_mesas: number; // Número de mesas
	numero_manteles: number; // Número de manteles
	color_manteles: string; // Color de los manteles
	notas: string; // Notas adicionales
	estatus: string;
	invitados: InvitadoResponse[]; // Lista de invitados
	tablon:boolean;
 }

 export interface RegisterUserData {
	numero_accion: number;
	nombre: string;
	correo: string;
	contrasena: string;
	role?: string;
	telefono: string;
  }
  
  export interface RegisterResponse {
	status: string;
	message: string;
	result: any;
  }
  
  export interface SearchResponse<T> {
    results: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface CreateUserDto {
    numero_accion: number;
    nombre: string;
    correo: string;
    // contrasena: string;
    telefono: string;
}

export interface RequestPasswordResetData {
	email: string;
}

export interface PasswordResetResponse {
	status: string;
	message: string;
}

export interface ResetPasswordDto {
	token: string;
	newPassword: string;
  }