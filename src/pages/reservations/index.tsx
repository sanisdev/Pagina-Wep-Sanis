import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
	const Navigate = useNavigate();
	return (
		<div className="flex flex-col md:flex-row justify-center align-middle items-center  h-[90vh] w-full mt-20 md:mt-auto">
			<Button
				className="w-full md:w-[50%] h-[100%] justify-center md:justify-end   rounded-none  bg-sal bg-cover bg-center  border-none transform transition-transform duration-300 hover:scale-105"
				onClick={() => Navigate("/Tournaments")}
				style={{
					fontSize:"5rem"
				}}
			>
				Salones
			</Button>
			<Button
				className="w-full md:w-[50%] h-[100%] bg-bbq bg-cover bg-center justify-center md:justify-start  rounded-none  border-none transform transition-transform duration-300 hover:scale-105"
				onClick={() => Navigate("/Palapas")}
				style={{
					fontSize:"5rem"
				}}
			>
				Palapas
			</Button>
		</div>
	);
};

export default Index;
