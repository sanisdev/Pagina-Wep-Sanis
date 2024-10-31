import { Card } from "primereact/card";
import { useState } from "react";
import FormAviso from "../../components/formAvisos";
import AddEvents from "../../components/addEvents";
import ListaAvisos from "../../components/listaAvisos";




const Panel: React.FC = () => {
	const [refreshEvents, setRefreshEvents] = useState(false);
	const [refreshAvisos, setRefreshAvisos] = useState(false);

	const handleEventoAgregado = () => {
		setRefreshEvents(!refreshEvents); // Alternar el estado para forzar la actualización
	};
	const handleAvisoAgregado = () => {
		setRefreshAvisos(!refreshEvents); // Alternar el estado para forzar la actualización
	};
	const header = (
		<h1 className="bg-header-card text-black text-xl p-4 rounded-t-xl ala">
			Panel de Control Comunicacion
		</h1>
	);
	return (
		<div className="flex flex-col align-middle justify-center items-center  md:px-32 md:p-8 gap-2 bg-[#242424] ">
			<Card
				className="bg-white  rounded-xl w-[85vw] md:w-full mt-10  md:mt-0 text-black "
				header={header}
			>
				<div className="flex flex-col gap-10  md:p-5">
					<FormAviso actualizarAvisos={handleAvisoAgregado} />
					<AddEvents actualizarEventos={handleEventoAgregado} />
				</div>
			</Card>

			<Card className="mt-5 justify-center align-middle w-[85vw]">
				<ListaAvisos
					refreshEvents={refreshEvents}
					refreshAvisos={refreshAvisos}
				/>{" "}
				{/* Pasar el estado de refresh */}
			</Card>
		</div>
	);
};

export default Panel;
