import React from "react";

interface TextComponent {
  type: string;
  className: string;
  placeholder: string;
}

const TextComponent: React.FC<TextComponent> = ({
  type,
  className,
  placeholder,
}) => {
  return <input type={type} className={className} placeholder={placeholder} />;
};

export default TextComponent;
