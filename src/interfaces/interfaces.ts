export interface LoginResponse {
	status: string;
	message: string;
	result: {
		token: string | undefined;
		response:Response| undefined;
		primerInicioSesion:boolean | undefined;
	}; // o lo que tu API devuelva en la respuesta
}
export interface Response {
	statusCode: number | undefined;
	error: string | undefined;
	menssage: string;
	
	role:string | undefined;
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
}

// Interfaz para el usuario
interface Usuario {
	nombre: string;
	correo:string;
	telefono:string;
}

export interface InvitadoResponse extends Invitado {
	id: number;
	reservacion_id: number;
	check_in: boolean;
}

export interface Invitado {
	id:number;
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
	tipo_mesa: string; // Tipo de mesa (ej. "estándar")
	invitados: Invitado[]; // Lista de invitados
	estatus: string; // Lista de invitados
}

// Interfaz para la respuesta de la API
export interface EventosDelDiaResponse {
	reservaciones: Reservacion[];
}

export interface ReservacionResponse {
	id:number
	usuario_id: number; // ID del usuario que realiza la reservación
	palapa_id: number; // ID de la palapa
	fecha: string; // Fecha en formato ISO (ej. "2024-10-15T14:00:00Z")
	hora_inicio: string; // Hora de inicio en formato HH:mm:ss
	hora_fin: string; // Hora de fin en formato HH:mm:ss
	numero_mesas: number; // Número de mesas
	numero_manteles: number; // Número de manteles
	color_manteles: string; // Color de los manteles
	notas: string; // Notas adicionales
	tipo_mesa: string; // Tipo de mesa (ej. "estándar")
	usuario: Usuario | null;
	invitados: InvitadoResponse[]; // Lista de invitados
	estatus: string; // Lista de invitados
	palapa: Palapas;
	adeudos: Adeudo[];
}

export interface Adeudo {
	id: number;
	descripcion: string;
	monto: number;
	estatus: string;
	fecha: string;
}

// Interfaz para la Multa
export interface Multa {
	id: number; // ID de la multa
	usuario: Usuario; // Relación con el usuario
	usuario_id: number; // ID del usuario
	descripcion: string; // Descripción de la multa
	coste: number; // Coste de la multa
	fecha: string; // Fecha de la multa en formato ISO
}

export interface Palapas {
	id: number;
	nombre: string;
}
