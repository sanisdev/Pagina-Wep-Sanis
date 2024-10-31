import { FC, useState } from "react";
import { Platillo, Servicio } from "../types/interfaces";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DescripcionConPoliticas from "./DescripcionConPoliticas";
import SeccionConTitulo from "./SeccionConTitulo";
import PlatillosDropdown from "./PlatillosDropdown";
import { DropdownChangeEvent } from "primereact/dropdown";
import GuisosCantidad from "./GuisosCantidad";
import Guarniciones from "./Guarniciones";

interface CenasFormalesService {
	descripcion: React.ReactNode;
	politicas: React.ReactNode;
	listaPrecios: React.ReactNode;
	servicio: Servicio;
	agregarPlatilloAlCarrito: (nuevoPlatillo: Platillo) => void;
	titulo: string;
}

const CenasFormalesService: FC<CenasFormalesService> = ({
	descripcion,
	politicas,
	listaPrecios,
	servicio,
	// agregarPlatilloAlCarrito,
	titulo,
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [cantidad, setCantidad] = useState<number>(0);
	const [selectedPlatillo, setSelectedPlatillo] = useState<Platillo>();
	const [servicioLocal, setServicioLocal] = useState<Servicio>(servicio);

	const paltilloOptionTemplate = (option: Platillo) => {
		return (
			<div className="flex flex-1 items-center  w-96">
				<div className="truncate">{option.nombre}</div>
			</div>
		);
	};

	const handlePlatilloChange = (e: DropdownChangeEvent) => {
		setSelectedPlatillo(e.value);
	};

	const handleGuisoChange = (guisoIndex: number, checked?: boolean) => {
		if (!selectedPlatillo) return;

		// Asegúrate de que `checked` tenga un valor booleano
		const isChecked = checked ?? false;

		const updatedPlatillo = {
			...selectedPlatillo,
			guisos: selectedPlatillo.guisos?.map((guiso, index) =>
				index === guisoIndex ? { ...guiso, select: isChecked } : guiso
			),
		};

		setSelectedPlatillo(updatedPlatillo);

		// Actualiza el servicio local con el platillo actualizado
		setServicioLocal({
			...servicioLocal,
			platillos: servicioLocal.platillos.map((platillo) =>
				platillo.nombre === updatedPlatillo.nombre
					? updatedPlatillo
					: platillo
			),
		});
	};

	return (
		<div className="md:p-2  space-x-2 space-y-4 text-sm md:text-base" >
			<DescripcionConPoliticas
				descripcion={descripcion}
				politicas={politicas}
			/>
			<SeccionConTitulo titulo={titulo} lista={listaPrecios} />

			<Guarniciones />

			<div>
				<p className="font-bold text-justify">Servicios Adicionales</p>

				<ul>
					<li className="flex flex-row justify-between">
						
							<span className=" ">
								Mesero adicional(4 hrs de servicio).{" "}
							</span>
							<div className={` gap-2 justify-self-end text-righ font-bold`}>
								
								<span>$500.00</span>
							</div>
					
					</li>
					<li className="flex flex-row justify-between">
						
							<span className=" ">
								Mesero adicional(5 hrs de servicio).{" "}
							</span>
							<div className={` gap-2 justify-self-end text-righ font-bold`}>
								
								<span>$600.00</span>
							</div>
					
					</li>
					<li className="flex flex-row justify-between">
						
							<span className=" ">
								Renta de Pantalla(4 hrs).{" "}
							</span>
							<div className={` gap-2 justify-self-end text-righ font-bold`}>
								
								<span>$200.00</span>
							</div>
					
					</li>
					<li className="flex flex-row justify-between">
						
							<span className=" ">
								Hostess(2 hrs de servicio).{" "}
							</span>
							<div className={` gap-2 justify-self-end text-righ font-bold`}>
								
								<span>$550.00</span>
							</div>
					
					</li>
					<li className="flex flex-row justify-between">
						
							<span className=" ">
								Hoora extra de salón(Incluye 2 meseros extras).{" "}
							</span>
							<div className={` gap-2 justify-self-end text-righ font-bold`}>
								
								<span>$1500.00</span>
							</div>
					
					</li>
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
						// onClick={}
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
					<PlatillosDropdown
						selectedPlatillo={selectedPlatillo!}
						platillos={servicio.platillos}
						onChange={handlePlatilloChange}
						itemTemplate={paltilloOptionTemplate}
					/>

					{selectedPlatillo && (
						<GuisosCantidad
							guisos={selectedPlatillo.guisos || []}
							cantidadAdultos={cantidad}
							cantidadNiños={cantidad}
							onGuisoChange={handleGuisoChange}
							onCantidadAdultosChange={setCantidad}
							onCantidadNiñosChange={setCantidad}
							maxSelectableGuisos={3}
						/>
					)}
				</div>
			</Dialog>
		</div>
	);
};

export default CenasFormalesService;
