import { FC, useState } from "react";
import { Platillo, Servicio } from "../types/interfaces";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface OneServiceProps {
	descripcion: React.ReactNode;
	servicio: Servicio;
	agregarPlatilloAlCarrito: (nuevoPlatillo: Platillo) => void;
	titulo: string;
	politicas: React.ReactNode;
}

const OneService: FC<OneServiceProps> = ({
	descripcion,		
	servicio,
	agregarPlatilloAlCarrito,
	titulo,
	politicas,
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [cantidad, setCantidad] = useState<number>(0);
    const platilloLocal:Platillo=servicio.platillos[0];

	const handleAddPlatillo = () => {
		// Crear un nuevo objeto platillo con las cantidades seleccionadas
		const platilloConCantidades: Platillo = {
			...platilloLocal, // Copia las propiedades del platillo original
			cantidadAdultos: cantidad, // Cantidad de platillos para adultos seleccionada
			guisos: platilloLocal.guisos?.map(guiso => ({ ...guiso })) // Mantener los guisos del platillo
		};
	
		// Actualizar el estado local del platillo
		// setPlatilloLocal(platilloConCantidades);
	
		// Agregar el platillo actualizado al carrito
		agregarPlatilloAlCarrito(platilloConCantidades);
	
		// Cerrar el diálogo después de agregar
		setVisible(false);
	};

	return (
		<div className="md:p-2  space-x-2 space-y-4">
			<div className="flex flex-col md:flex-row gap-2">
				{" "}
				<div className="md:w-1/2">{descripcion}</div>
				<div className="md:w-1/2">
					<h2 className="font-bold">Políticas de contratación</h2>
					<div>
						{/* <ul className="list-disc pl-5 m-2 ">
                        {politicas.map((politica) => (
                            <li >{politica.texto}</li>
                        ))}
                    </ul> */}
						<ul className="list-disc pl-5 m-2">{politicas}</ul>
					</div>
				</div>
			</div>

			<div className="md:w-1/2">
				<p className=" font-bold text-lg ">{titulo}</p>
				<ul className="list-none md:pl-2">
					<li>Lista</li>
				</ul>
			</div>

			<button
				className="bg-black w-full text-white py-2 px-4 rounded hover:bg-zinc-800"
				onClick={() => setVisible(true)}
			>
				<span>Reservar</span>
			</button>

			<Dialog
				visible={visible}
				modal
				footer={
					<Button
						label="Agregar"
						icon="pi pi-check"
						onClick={handleAddPlatillo}
					/>
				}
				header="Seleciona la cantidad"
				closeIcon={<i className="pi pi-times text-gray-600"></i>}
				className="w-96"
				onHide={() => {
					if (!visible) return;
					setVisible(false);
				}}
				style={{ width: "20rem" }}
			>
				<div className="flex flex-col space-y-2">
					
					<input
						type="number"
						min="1"
						value={cantidad}
						onChange={(e) =>
							setCantidad(
								parseInt(e.target.value, 10) || 0
							)
						}
						className="border rounded px-3 py-1"
						placeholder="Cantidad"
					/>
				</div>
			</Dialog>
		</div>
	);
};

export default OneService;
