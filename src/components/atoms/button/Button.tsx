import React, { memo } from "react";
import { Button as AntButton } from "antd";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <AntButton onClick={onClick} disabled={disabled} className="custom-button">
      {children}
    </AntButton>
  );
};

export default memo(Button);
