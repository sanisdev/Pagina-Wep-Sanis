


interface SvgIconProps {
  src: string;
  alt: string;
  ancho: string;
  largo: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, alt, ancho, largo }) => (
  <img className="pr-2" src={src} alt={alt} style={{ width: ancho, height: largo }} />
);


export default SvgIcon;