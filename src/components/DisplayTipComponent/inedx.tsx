import React, { MouseEventHandler } from 'react';

import DisplayTipComponentStyle from './DisplayTipComponentStyle.module.css';

interface DisplayTipComponentProps {
  tipAmount: string;
  totalAmount: string;
  isButtonDisabled: boolean;
  onClick?: MouseEventHandler;
}

const DisplayTipComponent: React.FC<DisplayTipComponentProps> = ({
  tipAmount,
  totalAmount,
  isButtonDisabled,
  onClick,
}): JSX.Element => {
  return (
    <>
      <section className={DisplayTipComponentStyle.AmountWrapper}>
        <p>
          Tip Amount{' '}
          <span className={DisplayTipComponentStyle.Text}>/ person</span>
        </p>
        <p className={DisplayTipComponentStyle.Amount}>${tipAmount}</p>
      </section>
      <section className={DisplayTipComponentStyle.AmountWrapper}>
        <p>
          Total <span className={DisplayTipComponentStyle.Text}>/ person</span>
        </p>
        <p className={DisplayTipComponentStyle.Amount}>${totalAmount}</p>
      </section>
      <button
        className={DisplayTipComponentStyle.ResetButton}
        type="button"
        disabled={isButtonDisabled}
        onClick={onClick}
      >
        Reset
      </button>
    </>
  );
};

export default DisplayTipComponent;
