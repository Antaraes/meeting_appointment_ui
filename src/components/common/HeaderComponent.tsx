import React from "react";

interface HeaderComponent {
  title: string;
  className: string;
}

const HeaderComponent: React.FC<HeaderComponent> = ({ title, className }) => {
  return <p className={className}>{title}</p>;
};

export default HeaderComponent;