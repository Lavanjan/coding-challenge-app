import React, { memo } from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";

interface ButtonProps extends AntButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <AntButton {...props} className={`custom-button ${props.className || ""}`}>
      {children}
    </AntButton>
  );
};

export default memo(Button);
