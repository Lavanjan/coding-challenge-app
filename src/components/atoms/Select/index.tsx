import React, { memo } from "react";
import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";

const Select: React.FC<AntSelectProps> = ({ className, ...props }) => {
  return (
    <AntSelect {...props} className={`custom-select ${className || ""}`} />
  );
};

export default memo(Select);
