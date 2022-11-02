import React from "react";

import TextField from "@mui/material/TextField";

interface InputProps {
  label: string;
  type?: string;
  id: string;
  value: string;
  error?: string | null;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type,
  id,
  value,
  onChange,
  error,
  disabled,
}: InputProps) => {
  return (
    <TextField
      error={error != null}
      fullWidth
      variant="outlined"
      margin="normal"
      id={id}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      helperText={error}
      disabled={disabled}
    />
  );
};

export default Input;
