import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { Platillo } from '../types/interfaces';



interface PlatillosDropdownProps {
  selectedPlatillo: Platillo;
  platillos: Platillo[];
  onChange: (e: DropdownChangeEvent) => void;
  itemTemplate: (option: Platillo) => JSX.Element;
}

const PlatillosDropdown: React.FC<PlatillosDropdownProps> = ({ selectedPlatillo, platillos, onChange, itemTemplate }) => {
  return (
    <Dropdown
      value={selectedPlatillo}
      onChange={onChange}
      style={{ width: '100%' }}
      options={platillos}
      optionLabel="nombre"
      placeholder="Selecciona un Platillo"
      itemTemplate={itemTemplate}
    />
  );
};

export default PlatillosDropdown;
