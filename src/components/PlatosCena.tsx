import React from 'react';

interface Platillo {
  titulo: string;
  descripcion: React.ReactNode;
  precios: string[];
}

interface PlatosProps {
  platillos: Platillo[];
}

const tiempos = [
  '1ER TIEMPO',
  '1ER PLUS',
  '2DO TIEMPO',
  '2DO PLUS',
  '3ER TIEMPO',
  '3ER PLUS',
];

const PlatosCena: React.FC<PlatosProps> = ({ platillos }) => {
  return (
    <div>
      {platillos.map((platillo, index) => (
        <div key={index} className="my-list-container mb-4 ">
          <span className="font-bold">{platillo.titulo}</span>
          <ul className="list-disc gap-4 p-2">{platillo.descripcion}</ul>
          <div className="grid grid-cols-6 md:flex-row text-center w-full justify-evenly border-gray-500 md:border-2">
            {tiempos.map((tiempo, i) => (
              <div
                key={i}
                className={`flex flex-col border-gray-500 justify-center border-2 text-xs ${
                  i !== tiempos.length - 1 ? 'md:border-r-2' : ''
                }`}
              >
                <label>{tiempo}</label>
                <label>{platillo.precios[i]}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlatosCena;
