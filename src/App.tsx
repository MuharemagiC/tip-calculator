import React, { useState, useEffect } from 'react';
import AppStyle from './App.module.css';

import { TIPS, inputLabels } from './constants/index';

import Logo from './assets/Icons/Logo';
import Button from './components/ButtonComponent';
import InputField from './components/InputFieldComponent';
import DisplayTipComponent from './components/DisplayTipComponent/inedx';

const App = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [bill, setBill] = useState('0');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    setIsDisabled(!isDisabled);
  }, [currentTip]);

  useEffect(() => {
    const tip = currentTip !== 0 ? currentTip : parseFloat(customTip);
    if (
      bill === '' ||
      bill === '0' ||
      numberOfPeople === 0 ||
      tip === 0 ||
      Number.isNaN(tip)
    ) {
      setTipAmount('0.00');
      setTotalAmount('0.00');
    } else {
      const tipAmountPerPerson = (
        (parseFloat(bill) * (tip / 100)) /
        numberOfPeople
      ).toFixed(2);
      const totalAmountPerPerson = (
        parseFloat(bill) / numberOfPeople +
        parseFloat(tipAmountPerPerson)
      ).toFixed(2);

      setTipAmount(tipAmountPerPerson);
      setTotalAmount(totalAmountPerPerson);
    }
  }, [bill, numberOfPeople, currentTip, customTip]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const buttonText = event.target as HTMLElement;
    setCurrentTip(parseInt(buttonText.innerText.split('%')[0], 10));
    setIsDisabled(!isDisabled);
    setCustomTip('');
  };

  const handleFocus = (): void => {
    setCurrentTip(0);
    setIsDisabled(!isDisabled);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    if (parseInt(input, 10) > 100) setCustomTip('100');
    else if (parseInt(input, 10) < 0) setCustomTip('0');
    else setCustomTip(input);

    setCurrentTip(0);
  };

  const handleChangeBill = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const input = event.target.value;
    setBill(input);
  };

  const handleChangeNumberOfPeople = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const input = event.target.value;
    if (input === '' || input === '0') {
      setErrorMessage("Can't be zero");
      setNumberOfPeople(0);
    } else {
      setNumberOfPeople(parseInt(input, 10));
      setErrorMessage('');
    }
  };

  const resetAll = (): void => {
    setBill('0');
    setCustomTip('');
    setCurrentTip(0);
    setNumberOfPeople(0);
    setIsDisabled(false);
  };

  return (
    <main className={AppStyle.Main}>
      <Logo />
      <section className={AppStyle.Container}>
        <section className={AppStyle.LeftContainer}>
          <InputField
            labelText={inputLabels.BILL}
            isDollar
            value={bill}
            onChange={handleChangeBill}
          />
          <p className={AppStyle.InputLabel}>Select Tip %</p>
          <section className={AppStyle.ButtonList}>
            {TIPS.map(tip => (
              <Button
                key={tip + 1}
                tip={tip}
                isCustom={false}
                isDisabled={tip === currentTip && isDisabled}
                onClick={handleClick}
              />
            ))}
            <Button
              tip="custom"
              isCustom
              isDisabled={false}
              onFocus={handleFocus}
              onChange={handleChange}
              value={customTip}
            />
          </section>
          <InputField
            labelText={inputLabels.NUMBER_OF_PEOPLE}
            isDollar={false}
            value={numberOfPeople}
            onChange={handleChangeNumberOfPeople}
            errorMessage={errorMessage}
          />
        </section>
        <section className={AppStyle.TipDisplay}>
          <DisplayTipComponent
            tipAmount={tipAmount}
            totalAmount={totalAmount}
            isButtonDisabled={
              !parseFloat(bill) && !currentTip && !numberOfPeople && !customTip
            }
            onClick={resetAll}
          />
        </section>
      </section>
    </main>
  );
};

export default App;
