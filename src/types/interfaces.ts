export interface Servicio {
	nombre: string;
	platillos: Platillo[];
	serviciosAd?: Platillo[];
	selectServicios?: Platillo[];
}

export interface Platillo {
	nombrecorto?: string;
	nombre: string;
	precio: number;
	precioNiño?: number;
	guisos?: Guiso[]; // Guiso seleccionado
	select?: string;
	cantidadAdultos?: number;
	cantidadNiños?: number;
	cantidadServiciosAd?: number;
}

export interface Guiso {
	nombre: string;
	select: boolean;
}

export interface Politica {
	texto: string;
}

//Servicios de desayuno(Solo Salones)

export const listaGuisos: Guiso[][] = [
	[
		{ nombre: "Machacado Norteño", select: false },
		{ nombre: "Chilaquiles y Frijoles", select: false },
		{ nombre: "Huevos con jamón", select: false },
	],
	[
		{ nombre: "Verdes", select: false },
		{ nombre: "Rojos", select: false },
	],
	[
		{ nombre: "Huevos a la mexicana", select: false },
		{ nombre: "Huevos con chorizo", select: false },
		{ nombre: "Huevos con jamón", select: false },
	],
	[], // No hay guisos para este platillo
	[], // No hay guisos para este platillo
];

export const guisosDesayunoBuffet: Guiso[][] = [
	[],
	[
		{ nombre: "Huevos a la mexicana", select: false },
		{ nombre: "Huevos con chorizo", select: false },
		{ nombre: "Huevos con jamón", select: false },
	],
	[],
	[],
	[], // No hay guisos para este platillo
	[], // No hay guisos para este platillo
];

export const platillosDesayuno: Platillo[] = [
	{
		nombrecorto: "Plato de desayuno mixto",
		nombre: "Plato de desayuno mixto: machacado norteño, chilaquiles y frijoles.",
		precio: 285.0,
		guisos: listaGuisos[0],
		cantidadAdultos: 20,
	},
	{
		nombrecorto: "Chilaquiles con queso y pollo",
		nombre: "Chilaquiles con queso y pollo (verdes o rojos)",
		precio: 305.0,
		guisos: listaGuisos[1],
		cantidadAdultos: 20,
	},
	{
		nombrecorto: "Huevos revueltos al gusto",
		nombre: "Huevos revueltos al gusto: A la mexicana, con chorizo o con jamón.",
		precio: 258.0,
		guisos: listaGuisos[2],
		cantidadAdultos: 20,
	},
	{
		nombrecorto: "Huevo con machacado",
		nombre: "Huevo con machacado",
		precio: 294.0,
		cantidadAdultos: 20,
	},
	{
		nombrecorto: "Chile abrazado ",
		nombre: "Chile abrazado (Chile poblano relleno de chilaquiles verdes con una salsa Cherokee y huevo estrellado arriba, ralladura de crema y cebolla morada).",
		precio: 356.0,
		cantidadAdultos: 20,
	},
];

export const serviciosAdicionales: Platillo[] = [
	{
		nombre: "Mimosa",
		precio: 60.0,
	},
	{ nombre: "Jugo de Naranja", precio: 25.0 },
	{
		nombre: "Jugo verde",
		precio: 27.0,
	},
	{ nombre: "Refresco", precio: 18.0 },
	{
		nombre: "Refresco refill ",
		precio: 35.0,
	},
	{
		nombre: "Botellín de agua",
		precio: 21.0,
	},
	{
		nombre: "Botellín agua de sabor",
		precio: 25.0,
	},
	{
		nombre: "Agua mineral",
		precio: 27.0,
	},
];

export const desayunoSalones: Servicio = {
	nombre: "Desayuno",
	platillos: platillosDesayuno, // Corregido el campo `platillos` a `platillo`
	serviciosAd: serviciosAdicionales, // Si no hay servicios adicionales, puedes dejarlo como un array vacío
};

//Desayuno Buffet(Salones y palapas)

export const paltillosDesayunoBuffet: Platillo[] = [
	{
		nombrecorto: "Queso con rajas",
		nombre: "Queso con rajas",
		precio: 360.0,
	},

	{
		nombrecorto: "Huevos revueltos al gusto",
		nombre: "Huevos revueltos al gusto: A la mexicana, con chorizo o con jamón.",
		precio: 360.0,
		guisos: guisosDesayunoBuffet[2],
	},
	{
		nombrecorto: "Chilaquiles verdes con pollo",
		nombre: "Chilaquiles verdes con pollo",
		precio: 360.0,
	},
	{
		nombrecorto: "Chicharrón en salsa verde",
		nombre: "Chicharrón en salsa verde",
		precio: 360.0,
	},
	{
		nombrecorto: "Nopales a la mexicana",
		nombre: "Nopales a la mexicana",
		precio: 360.0,
	},
	{
		nombrecorto: "Hot Cakes",
		nombre: "Hot Cakes",
		precio: 360.0,
	},
];
export const serviciosAdicionalesDesayunoBuffet: Platillo[] = [
	{
		nombre: "Plato de fruta",
		precio: 50.0,
	},
	{
		nombre: "Refresco refill",
		precio: 35.0,
	},
	{
		nombre: "Mimosa",
		precio: 60.0,
	},
	{
		nombre: "Botellín de agua",
		precio: 21.0,
	},
	{
		nombre: "Jugo de Naranja",
		precio: 25.0,
	},
	{
		nombre: "Botellín agua de sabor",
		precio: 25.0,
	},
	{
		nombre: "Jugo verde",
		precio: 27.0,
	},
	{
		nombre: "Agua mineral",
		precio: 27.0,
	},
	{
		nombre: "Refresco",
		precio: 18.0,
	},
];

export const desayunoBuffet: Servicio = {
	nombre: "Desayuno Buffet",
	platillos: paltillosDesayunoBuffet, // Corregido el campo `platillos` a `platillo`
	serviciosAd: serviciosAdicionalesDesayunoBuffet, // Si no hay servicios adicionales, puedes dejarlo como un array vacío
};

//Buffet taquisa(Salones y Palapas)

export const guisosBuffetTaquiza: Guiso[][] = [
	[
		{ nombre: "Asado de puerco", select: false },
		{ nombre: "Cochinita pibil", select: false },
		{ nombre: "Mole", select: false },
		{ nombre: "Picadillo", select: false },
		{ nombre: "Puntas a la albañil", select: false },
		{ nombre: "Queso con rajas", select: false },
		{ nombre: "Tinga de pollo", select: false },
	],
];
export const paltillosBuffetTaquiza: Platillo[] = [
	{
		nombre: "Taquiza",
		precio: 360.0,
		precioNiño: 280,
		guisos: guisosBuffetTaquiza[0],
	},
];

export const buffetTaquiza: Servicio = {
	nombre: "Buffet Taquiza",
	platillos: paltillosBuffetTaquiza, // Corregido el campo `platillos` a `platillo`
};

//Tacos
export const paltillosTacos: Platillo[] = [
	{
		nombre: "4 Tacos al pastor",
		precio: 252.0,
	},
	{
		nombre: "4 Tacos de bistec",
		precio: 212.0,
	},
	{
		nombre: "4 Tacos de chamorro",
		precio: 222.0,
	},
	{
		nombre: "4 Tacos campecha nos",
		precio: 226.0,
	},
];

export const Taquiza: Servicio = {
	nombre: "Taquiza",
	platillos: paltillosTacos, // Corregido el campo `platillos` a `platillo`
};

//Parrillada
export const platillosParrillada: Platillo[] = [
	{
		nombre: "Arrachera*persona ",
		precio: 252.0,
	},
	{
		nombre: "Chamorros ",
		precio: 212.0,
	},
	{
		nombre: "Ribeye (l persona)",
		precio: 222.0,
	},
	{
		nombre: "Costillas BBQ ",
		precio: 226.0,
	},
];
export const serviciosAdicionalesParrillada: Platillo[] = [
	{
		nombre: "Guacamole individual",
		precio: 55.0,
	},
	{
		nombre: "Litro de guacamole",
		precio: 150.0,
	},
	{
		nombre: "Tuétanos(2pz.)",
		precio: 125.0,
	},
	{
		nombre: "Quesadillas maiz o harina(4pz)",
		precio: 50.0,
	},
	{
		nombre: "Verduras asadas(porcion)",
		precio: 60.0,
	},
];

export const parrillada: Servicio = {
	nombre: "Parrillada",
	platillos: platillosParrillada,
	serviciosAd: serviciosAdicionalesParrillada,
};

//Alimentos en palapas
export const platillosdealimentosEnPlapas: Platillo[] = [
	{
		nombre: "Hamburguesa",
		precio: 170.0,
	},
	{
		nombre: "Burritos con papas",
		precio: 125.0,
	},
	{
		nombre: "Hotdog con papas",
		precio: 97.0,
	},
	{
		nombre: "Croissant con ensalada",
		precio: 145.0,
	},
];

export const alimentosEnPlapas: Servicio = {
	nombre: "Alimentos en Palapas",
	platillos: platillosdealimentosEnPlapas,
};

//Alimentos con servicio en palapas
export const platillosDeAlimentosConServicioEnPlapas: Platillo[] = [
	{
		nombre: "4 tacos de bistec",
		precio: 100.0,
	},
	{
		nombre: "Hamburguesa al carbon",
		precio: 195.0,
	},
	{
		nombre: "Hotdog con papas",
		precio: 250.0,
	},
	{
		nombre: "Croissant con ensalada",
		precio: 250.0,
	},
];

export const alimentosEnPlapasConServicio: Servicio = {
	nombre: "Alimentos en Palapas con Servicio",
	platillos: platillosDeAlimentosConServicioEnPlapas,
};

//Meriendas

export const entradas: Guiso[][] = [
	[
		{ nombre: "Entrada: Ensalada de frutos rojos", select: false },
		{ nombre: "Entrada: Ensalada hawaiana", select: false },
		{ nombre: "Entrada: Enquites", select: false },
	],
];

export const platillosMeriendas: Platillo[] = [
	{
		nombre: "Lasaña napolitana",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Chile hojaldrado de queso crema con nuez",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Enchiladas suizas",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Chile hojaldrado de pollo",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Enchiladas tipo Cherokee",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Croissant",
		precio: 360.0,
		guisos: entradas[0],
	},
];

export const meriendas: Servicio = {
	nombre: "Meriendas",
	platillos: platillosMeriendas,
};

//Pozole
export const paltillosPozole: Platillo[] = [
	{
		nombre: "Pozole",
		precio: 210.0,
	},
];

export const pozole: Servicio = {
	nombre: "Pozole",
	platillos: paltillosPozole,
};

//Servicio de Canapes

export const guisosCanapés: Guiso[][] = [
	[
		{ nombre: "Camarón Roca", select: false },
		{ nombre: "Tacos artesanales", select: false },
		{ nombre: "Gazpacho de melón", select: false },
		{ nombre: "Pepino con surimi", select: false },
		{ nombre: "Musse de oreo", select: false },
		{ nombre: "Musse de mango", select: false },
		{ nombre: "Pay de manzana", select: false },
	],
	[
		{ nombre: "Camarón Roca", select: false },
		{ nombre: "Tacos artesanales", select: false },
		{ nombre: "Gazpacho de melón", select: false },
		{ nombre: "Ensalada Gapiess", select: false },
		{ nombre: "Musse de oreo", select: false },
		{ nombre: "Musse de mango", select: false },
		{ nombre: "Pay de manzana", select: false },
	],
	[
		{ nombre: "Camarón Roca", select: false },
		{ nombre: "Tacos artesanales", select: false },
		{ nombre: "Rollitos campesinos", select: false },
		{ nombre: "Gazpacho de melón", select: false },
		{ nombre: "Ensalada Gapiess", select: false },
		{ nombre: "Salmon ahumado", select: false },
		{ nombre: "Tiramisu", select: false },
		{ nombre: "Musse de oreo", select: false },
		{ nombre: "Messe de gloria", select: false },
	],
	
];

export const platillosCanapes: Platillo[] = [
	{
		nombre: "OPCIÓN 1",
		precio: 180.0,
		guisos: guisosCanapés[0],
	},
	{
		nombre: "OPCIÓN 2",
		precio: 200.0,
		guisos: guisosCanapés[1],
	},
	{
		nombre: "OPCIÓN 3",
		precio: 390.0,
		guisos: guisosCanapés[2],
	},

];

export const canapes: Servicio = {
	nombre: "Canapes",
	platillos: platillosCanapes,
};
//CENAS Formales

export const opcionesPlatillosCenas: Guiso[][] = [
	[
		{ nombre: "Entrada: Ensalada de frutos rojos", select: false },
		{ nombre: "Entrada: Ensalada hawaiana", select: false },
		{ nombre: "Entrada: Enquites", select: false },
	],
];

export const platillosCenas: Platillo[] = [
	{
		nombre: "Pollo",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "RES",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "SALMON",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "PUERCO",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Enchiladas tipo Cherokee",
		precio: 360.0,
		guisos: entradas[0],
	},
	{
		nombre: "Croissant",
		precio: 360.0,
		guisos: entradas[0],
	},
];

//Politicas

export const politicasList: Politica[] = [
	{
	
		texto: "Se separará el lugar con 2 mil pesos y firma del contrato.",
	},
	{
	
		texto: "Los alimentos deberán ser liquidados 5 días antes del evento.",
	},
	{
	
		texto: "Vinos y Licores son proporcionados por el socio y deberá pagar descorche.",
	},
	{
	
		texto: "Descorche por botella de menos de un litro cuesta $190.00",
	},
	{
	
		texto: "El vino de mesa no tiene costo de descorche.",
	},
	{
	
		texto: "No se permite el ingreso de alimentos externos (solo botana y postres).",
	},
	{
	
		texto: "Precios incluyen IVA",
	},
	{
	
		texto: "Obligatorio entregar el listado de invitados mínimo 3 días antes del evento (incluyendo socios).",
	},
	{
	
		texto: "Mínimo de 20 personas para contratar el servicio.",
	},
	{
		
		texto: "Cualquier cambio indispensable notificar una semana antes del evento.",
	},
];

export const politicasList2: Politica[] = [
	{
		texto: "Se separará el lugar con 2 mil pesos y firma del contrato.",
	},
	{
		texto: "Los alimentos deberán ser liquidados 5 días antes del evento.",
	},
	{
		texto: "Vinos y Licores son proporcionados por el socio y deberá pagar descorche.",
	},
	{
		texto: "Descorche por botella de menos de un litro cuesta $190.00",
	},
	{
		texto: "El vino de mesa no tiene costo de descorche.",
	},
	{
		texto: "No se permite el ingreso de alimentos externos (solo botana y postres).",
	},
	{
		texto: "Precios incluyen IVA.",
	},
	{
		texto: "Obligatorio entregar el listado de invitados mínimo 3 días antes del evento (incluyendo socios).",
	},
	{
		texto: "Mínimo de 20 personas para contratar el servicio.",
	},
	{
		texto: "Cualquier cambio indispensable notificar una semana antes del evento.",
	},
	{
		texto: "Contratando este servicio en palapas, NO se cobra el acceso de invitado.",
	},
];

export const politicasAlimentosPalapas: Politica[] = [
	{
		texto: "Se liquida al contratar el evento",
	},
	{
		texto: "Precios incluyen IVA.",
	},
	{
		texto: "Obligatorio entregar el listado de invitados minimo 3 dias antes del evento(incluyendo socios).",
	},
	{
		texto: "Minimo de 10 personas para contratar el servicio",
	},
	{
		texto: "Contratando este servicio , Si se cobra el acceso de invitados",
	},
];
export const politicasAlimentosPalapasConServicio: Politica[] = [
	{
		texto: "Se separa el lugar con 2 mil pesos y firmas del contrato",
	},
	{
		texto: "Los alimentos deberián ser liquidados 5 dias antes del evento",
	},
	{
		texto: "Precios incluyen IVA",
	},
	{
		texto: "Obligatorio entregar el listado de invitados minimo 3 dias antes del evento(incluyendo socios).",
	},
	{
		texto: "Minimo de 20 personas para contratar el servicio.",
	},
	{
		texto: "Contratando este servicio , Si se cobra el acceso de invitados",
	},
];
export const politicasMeriendas: Politica[] = [
	{
		texto: "Se separa el lugar con 2 mil pesos y firmas del contrato",
	},
	{
		texto: "Los alimentos deberián ser liquidados 5 dias antes del evento",
	},
	{
		texto: "Vinos y Licores son proporcionados por el socio y deberá pagar descorche.",
	},
	{
		texto: "Descorche por botella de menos de un litro cuesta $190.00",
	},
	{
		texto: "El vino de mesa no tiene costo de descorche.",
	},
	{
		texto: "No se permite el ingreso de alimentos externos (solo botana y postres).",
	},
	{
		texto: "Precios incluyen IVA.",
	},
	{
		texto: "Obligatorio entregar el listado de invitados mínimo 3 días antes del evento (incluyendo socios) .",
	},
	{
		texto: "Mínimo de 20 personas para contratar el servicio.",
	},
	{
		texto: "Cualquier cambio indispensable notificar una semana antes del evento.",
	},
];
export const politicasCanapés: Politica[] = [
	{
		texto: "Se separa el lugar con 2 mil pesos y firmas del contrato",
	},
	{
		texto: "Los alimentos deberián ser liquidados 5 dias antes del evento",
	},
	{
		texto: "Vinos y Licores son proporcionados por el socio y deberá pagar descorche.",
	},
	{
		texto: "Descorche por botella de menos de un litro cuesta $190.00",
	},
	{
		texto: "El vino de mesa no tiene costo de descorche.",
	},
	{
		texto: "No se permite el ingreso de alimentos externos (solo botana y postres).",
	},
	{
		texto: "Precios incluyen IVA.",
	},
	{
		texto: "Obligatorio entregar el listado de invitados mínimo 3 días antes del evento (incluyendo socios) .",
	},
	{
		texto: "Mínimo de 20 personas para contratar el servicio.",
	},
	{
		texto: "Cualquier cambio indispensable notificar una semana antes del evento.",
	},
];
