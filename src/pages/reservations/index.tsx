import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
	const Navigate = useNavigate();
	return (
		<div className="flex  justify-center align-middle items-center  h-[90vh] w-full">
			<Button
				className="w-[50%] h-[100%] justify-end text-8xl  rounded-none"
				onClick={() => Navigate("/Tournaments")}
			>
				Salones
			</Button>
			<Button
				className="w-[50%] h-[100%] justify-start text-8xl  rounded-none"
				onClick={() => Navigate("/Palapas")}
			>
				Palapas
			</Button>
		</div>
	);
};

export default Index;
