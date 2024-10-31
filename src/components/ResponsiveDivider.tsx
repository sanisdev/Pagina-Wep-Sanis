import { useState, useEffect } from 'react';
import { Divider } from 'primereact/divider';

export const ResponsiveDivider = () => {
    const [layout, setLayout] = useState<'vertical' | 'horizontal'>(
      window.innerWidth >= 768 ? 'vertical' : 'horizontal'
    );
  
    useEffect(() => {
      const handleResize = () => {
        setLayout(window.innerWidth >= 768 ? 'vertical' : 'horizontal');
      };
  
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return <Divider layout={layout} />;
  };
