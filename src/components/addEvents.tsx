import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import { newEvento } from "../services/api-comunicacion";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

interface Evento {
	url: string;
	name: string;
	file: File;
}

interface FormEventsProps {
	actualizarEventos: () => void;
}

const AddEvents: React.FC<FormEventsProps> = ({ actualizarEventos }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const toast = useRef<Toast>(null);
	const [loading, setLoading] = useState(false);

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;

		if (files) {
			setLoading(true); // Activar estado de carga
			const newImages: Evento[] = Array.from(files).map((file) => {
				const url = URL.createObjectURL(file);
				return { url, name: file.name, file };
			});

			try {
				for (const evento of newImages) {
					await newEvento(evento);
				}

				toast.current?.show({
					severity: "success",
					summary: "Éxito",
					detail: "Eventos agregados correctamente",
				});
				actualizarEventos();
			} catch (error) {
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: "Hubo un problema al agregar los eventos",
				});
			} finally {
				setLoading(false); // Desactivar estado de carga
			}
		}
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className="px-2">
			<Toast ref={toast} />
			<h1 className="text-xl text-cyan-700">Nuevo Evento</h1>
			<input
				type="file"
				accept="image/*"
				multiple
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleImageUpload}
			/>
			<Button
				label="+"
				outlined
				className="flex w-full"
				onClick={handleButtonClick}
				disabled={loading} // Desactivar el botón durante la carga
			>
				{loading && (
					<ProgressSpinner
						style={{ width: "20px", height: "20px" }}
						strokeWidth="4"
						fill="var(--background-color)"
						animationDuration=".5s"
					/>
				)}
			</Button>
			{loading && <div className="text-center mt-2">Cargando...</div>}
		</div>
	);
};

export default AddEvents;
