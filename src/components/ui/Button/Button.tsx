import "./style.scss";

interface ButtonProps {
  variant?: "primary" | "secondary";
  icon?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  variant = "primary",
  icon,
  style,
  children,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button_comp ${variant} ${disabled ? "disabled" : ""}`}
      style={style}
      disabled={disabled}
      onClick={(e) => onClick?.(e)}
    >
      {icon && <i className={icon} />}
      {children}
    </button>
  );
};
