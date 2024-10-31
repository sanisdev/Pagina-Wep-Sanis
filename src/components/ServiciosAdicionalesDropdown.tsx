import React from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Platillo } from '../types/interfaces';

interface ServiciosAdicionalesDropdownProps {
  selectedServiceAdicional: Platillo | null;
  serviciosAdicionales: Platillo[];
  onChange: (e: DropdownChangeEvent) => void;
  cantidadServicioAd: number;
  onCantidadChange: (value: number) => void;
}

const ServiciosAdicionalesDropdown: React.FC<ServiciosAdicionalesDropdownProps> = ({
  selectedServiceAdicional,
  serviciosAdicionales,
  onChange,
  cantidadServicioAd,
  onCantidadChange,
}) => {
  return (
    <div className="flex flex-col">
      <Dropdown
        value={selectedServiceAdicional}
        onChange={onChange}
        style={{ width: '100%' }}
        options={serviciosAdicionales}
        optionLabel="nombre"
        placeholder="Servicios Adicionales"
      />
      {selectedServiceAdicional != null && (
        <div className="flex flex-col justify-start mt-4">
          <label htmlFor="">Cantidad</label>
          <input
            type="number"
            min="1"
            value={cantidadServicioAd}
            onChange={(e) =>
              onCantidadChange(parseInt(e.target.value, 10) || 0)
            }
            className="border rounded px-3 py-1"
            placeholder="Cantidad"
          />
        </div>
      )}
    </div>
  );
};

export default ServiciosAdicionalesDropdown;
