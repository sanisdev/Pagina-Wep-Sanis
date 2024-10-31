import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface ServiciosDialogProps {
  visible: boolean;
  onHide: () => void;
  onAddPlatillo: () => void;
  children: React.ReactNode;
}

const ServiciosDialog: React.FC<ServiciosDialogProps> = ({ visible, onHide, onAddPlatillo, children }) => {
  return (
    <Dialog
      visible={visible}
      modal
      footer={
        <Button
          label="Agregar"
          icon="pi pi-check"
          onClick={onAddPlatillo}
        />
      }
      header="Servicios Disponibles"
      closeIcon={<i className="pi pi-times text-gray-600"></i>}
      className="w-96"
      onHide={onHide}
      style={{ width: '40rem' }}
    >
      {children}
    </Dialog>
  );
};

export default ServiciosDialog;
