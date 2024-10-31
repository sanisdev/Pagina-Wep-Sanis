interface DescripcionConPoliticasProps {
    descripcion: React.ReactNode;
    politicas: React.ReactNode;
  }
  
  const DescripcionConPoliticas: React.FC<DescripcionConPoliticasProps> = ({ descripcion, politicas }) => {
    return (
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2">{descripcion}</div>
        <div className="md:w-1/2">
          <h2 className="font-bold">Políticas de contratación</h2>
          <div>
            <ul className="list-disc pl-5 m-2">{politicas}</ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default DescripcionConPoliticas;