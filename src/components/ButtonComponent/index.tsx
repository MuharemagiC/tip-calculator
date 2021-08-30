import React, {
  MouseEventHandler,
  FocusEventHandler,
  ChangeEventHandler,
} from 'react';

import ButtonComponentStyle from './ButtonComponent.module.css';

interface AppComponentsProp {
  tip: number | string;
  isCustom: boolean;
  isDisabled: boolean;
  value?: string;
  onClick?: MouseEventHandler;
  onFocus?: FocusEventHandler;
  onChange?: ChangeEventHandler;
}

const Button: React.FC<AppComponentsProp> = ({
  tip,
  isCustom,
  isDisabled,
  onClick,
  onFocus,
  onChange,
  value,
}): JSX.Element => (
  <>
    {!isCustom ? (
      <button
        className={ButtonComponentStyle.Button}
        type="button"
        disabled={isDisabled}
        onClick={onClick}
      >
        {tip}%
      </button>
    ) : (
      <input
        className={ButtonComponentStyle.InputButton}
        type="number"
        id="otherAmount"
        name="numAmount"
        placeholder={tip.toString()}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
      />
    )}
  </>
);
export default Button;
