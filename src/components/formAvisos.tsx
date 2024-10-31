import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { agregarAviso } from "../services/api-comunicacion";
import { ProgressSpinner } from "primereact/progressspinner";

interface FormAvisosProps {
	actualizarAvisos: () => void;
}

const FormAviso: React.FC<FormAvisosProps> = ({ actualizarAvisos }) => {
	const [descripcion, setDescripcion] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useRef<Toast>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		try {
			await agregarAviso({ descripcion });
			toast.current?.show({
				severity: "success",
				summary: "Éxito",
				detail: "Aviso agregado correctamente",
			});
			setDescripcion(""); // Limpiar el campo de descripción
			actualizarAvisos();
		} catch (error) {
			toast.current?.show({
				severity: "error",
				summary: "Error",
				detail: "No se pudo agregar el aviso. Inténtalo de nuevo.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="rounded-xl  bg-white  border-2 shadow-2xl md:px-2  md:mx-2">
			<Toast ref={toast} /> {/* Componente Toast para mostrar mensajes */}
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col space-y-6">
					<div className="flex flex-col ">
						<h1 className="text-xl text-cyan-700">Nuevo Aviso</h1>
					</div>
					<div className="flex flex-col">
						<div className="">
							{" "}
							<label>Descripción:</label>
						</div>
						<InputTextarea
							className="border-2 border-solid border-black text-black bg-white !imporrtant"
							value={descripcion}
							onChange={(
								e: React.ChangeEvent<HTMLTextAreaElement>
							) => setDescripcion(e.target.value)}
							maxLength={500}
							rows={5}
							cols={30}
							style={{ backgroundColor: "white" }}
						/>
					</div>
					<div className="w-full justify-end text-end">
						<Button
							label=" Agregar Aviso"
							severity="info"
							className="border-2  text-black bg-sky-400"
							type="submit"
							disabled={loading}
							// onClick={manejarSubmit}
							// style={{ backgroundColor: "skyblue" }}
						>
							{loading && (
								<ProgressSpinner
									style={{ width: "20px", height: "20px" }}
								/>
							)}
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
};

export default FormAviso;
