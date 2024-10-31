import { FC } from "react";

interface GuarnicionesProps {}

const Guarniciones: FC<GuarnicionesProps> = () => {
	return (
		<div className="flex flex-col pt-2">
            <div className="grid grid-cols-2 justify-between items-start  p-2">
                
				<div>
					<p className="font-bold text-justify text-sm md:text-base">
						GUARNICIONES
					</p>
                    <p className="text-sm text-gray-500 pb-2">(1 eleccion de las siguientes opciones);</p>
					<ul>
						<li>Esfera rellena de papa</li>
						<li>Espinaca a la crema y tocino</li>
						<li>Ejotes almendrados con brócolli</li>
					</ul>
				</div>
				<div>
					<p className="font-bold text-justify pb-2 text-sm md:text-base">
						GUARNICIONES PLUS
					</p>
                    <p className="text-sm text-gray-500 pb-2">(1 eleccion de las siguientes opciones);</p>
					<ul>
						<li>Arroz huérfano</li>
						<li>Puré de papa con chile chilaca</li>
						<li>Pasta Penne de 3 quesos</li>
					</ul>
				</div>
            </div>
			
			<div className="grid grid-cols-2 justify-between p-2 ">
            <div>
					<p className="font-bold text-justify text-sm md:text-base">
						CREMAS
					</p>
                    <p className="text-sm text-gray-500 pb-2">(1 eleccion de las siguientes opciones);</p>
					<ul>
						<li>Brocoli</li>
						<li>Champiñones</li>
						<li>Elote</li>
                        <li>Cilantro</li>
					</ul>
				</div>
				<div>
					<p className="font-bold text-justify pb-2 text-sm md:text-base">
						POSTRES
					</p>
                    <p className="text-sm text-gray-500 pb-2">(1 eleccion de las siguientes opciones);</p>
					<ul>
						<li>Flan de la casa</li>
						<li>Mousse de gloria</li>
						<li>Mousse de mango</li>
                        <li>Mousse de frutos rojos</li>
                        <li>Pan de elote</li>
					</ul>
				</div>
            </div>
			
			
			
		</div>
	);
};

export default Guarniciones;
