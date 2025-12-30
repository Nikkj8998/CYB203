interface LogoProps {
  variant?: "default" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ variant = "default", className = "", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-10",
    md: "h-14",
    lg: "h-20"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Cybaem Tech - Beyond Limits" 
        className={`${sizeClasses[size]} w-auto object-contain ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
      />
    </div>
  );
};

export default Logo;
