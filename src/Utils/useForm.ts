import React from 'react';

const types = {
  cep: {
    regex: /[0-9]{5}[\d]{3}/,
    message: 'Por favor, digite um CEP válido.',
  },
  street: {
    regex: /([A-Za-z]\s?){3}$/,
    message: 'Por favor, digite no mínimo 3 caracteres.',
  },
};

const useForm = (type: 'cep' | 'street' | null) => {
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<null | string>(null);

  function validate(value: string): boolean {
    if(type == null) return true;
    if(value.length === 0) {
      setError('Preencha um valor');
      return false;
    }
    if(!types[type].regex.test(value)){
      setError(types[type].message);
      return false;
    }
    setError(null);
    return true;
  }

  function onChange(e: { target: HTMLInputElement }) {
    if(error != null) validate(e.target.value);
    setValue(e.target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
  }
}

export default useForm;
