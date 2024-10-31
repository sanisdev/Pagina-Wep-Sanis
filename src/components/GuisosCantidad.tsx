import React, { useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { Guiso } from "../types/interfaces";
import { Toast } from "primereact/toast";

interface GuisosCantidadProps {
	guisos: Guiso[];
	cantidadAdultos: number;
	cantidadNiños: number;
	onGuisoChange: (index: number, checked: boolean) => void;
	onCantidadAdultosChange: (value: number) => void;
	onCantidadNiñosChange: (value: number) => void;
	maxSelectableGuisos: number;
}

const GuisosCantidad: React.FC<GuisosCantidadProps> = ({
	guisos,
	cantidadAdultos,
	cantidadNiños,
	onGuisoChange,
	onCantidadAdultosChange,
	onCantidadNiñosChange,
	maxSelectableGuisos,
}) => {
	const toast = useRef<Toast>(null);

	const handleGuisoSelection = (index: number, checked: boolean) => {
		const selectedCount = guisos.filter((guiso) => guiso.select).length;

		if (checked && selectedCount >= maxSelectableGuisos) {
			toast.current?.show({
				severity: "warn",
				summary: "Límite alcanzado",
				detail: `Solo se pueden seleccionar ${maxSelectableGuisos} guisos al mismo tiempo.`,
				life: 3000,
			});
			return;
		}

		onGuisoChange(index, checked);
	};
	return (
		<div className="flex flex-col">
			<Toast ref={toast} />
			<div>
				<ul className="list-disc pl-5">
					{guisos.map((guiso, index) => (
						<li
							key={index}
							className="mt-2 flex items-center gap-4"
						>
							<Checkbox
								onChange={(e) =>
									handleGuisoSelection(index, e.checked!)
								}
								checked={guiso.select}
							/>
							<span>{guiso.nombre}</span>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-row justify-between p-4 m-2">
				<div className="flex flex-col justify-start mt-4">
					<label>Cantidad de Platillos Adultos</label>
					<input
						type="number"
						min="1"
						value={cantidadAdultos}
						onChange={(e) =>
							onCantidadAdultosChange(
								parseInt(e.target.value, 10) || 0
							)
						}
						className="border rounded px-3 py-1"
						placeholder="Cantidad"
					/>
				</div>
				<div className="flex flex-col justify-start mt-4">
					<label>Cantidad de Platillos Niños</label>
					<input
						type="number"
						min="0"
						value={cantidadNiños}
						onChange={(e) =>
							onCantidadNiñosChange(
								parseInt(e.target.value, 10) || 0
							)
						}
						className="border rounded px-3 py-1"
						placeholder="Cantidad"
					/>
				</div>
			</div>
		</div>
	);
};

export default GuisosCantidad;
