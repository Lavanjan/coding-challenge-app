import React from "react";
import { Input as AntInput } from "antd";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <AntInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="custom-input"
    />
  );
};

export default Input;
