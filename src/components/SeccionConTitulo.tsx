import React from 'react';

interface SeccionConTituloProps {
  titulo: string;
  lista: React.ReactNode;
}

const SeccionConTitulo: React.FC<SeccionConTituloProps> = ({ titulo, lista }) => {
  return (
    <div className="">
      <p className="font-bold text-lg">{titulo}</p>
      <ul className="list-disc md:pl-2">
        {lista}
      </ul>
    </div>
  );
};

export default SeccionConTitulo;
