import React, { memo } from "react";
import { Input as AntInput, InputProps as AntInputProps } from "antd";

const Input: React.FC<AntInputProps> = ({ className, ...props }) => {
  return <AntInput {...props} className={`custom-input ${className || ""}`} />;
};

export default memo(Input);
