import React, { ChangeEventHandler } from 'react';
import InputFieldComponentStyle from './InputFieldComponent.module.css';

import Dollar from '../../assets/Icons/Dollar';
import Person from '../../assets/Icons/Person';

interface InputFieldProps {
  labelText: string;
  isDollar: boolean;
  value?: string | number;
  onChange?: ChangeEventHandler;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  labelText,
  isDollar,
  value,
  onChange,
  errorMessage,
}): JSX.Element => (
  <>
    <section className={InputFieldComponentStyle.wrapper}>
      <label
        className={InputFieldComponentStyle.inputLabel}
        htmlFor={labelText}
      >
        {labelText}{' '}
        {errorMessage && (
          <span className={InputFieldComponentStyle.Error}>{errorMessage}</span>
        )}
      </label>
      <i className={InputFieldComponentStyle.Icon}>
        {isDollar ? <Dollar /> : <Person />}
      </i>
      <input
        className={InputFieldComponentStyle.input}
        id={labelText}
        name="amount"
        type="number"
        value={value}
        onChange={onChange}
        style={
          errorMessage ? { outlineColor: 'red' } : { outlineColor: '#26c2ae' }
        }
      />
    </section>
  </>
);

export default InputField;
