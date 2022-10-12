import { useState } from "react";
import "./App.scss";
import { postData } from "./DAL/service";

const App = () => {
  const [cost, setCost] = useState(1000000);
  const [downpayment, setDownpayment] = useState(1);
  const [leasing, setLeasing] = useState(1);
  const [isRequest, setIsRequest] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const downpaymentSum = (cost * (downpayment / 100)).toFixed(0);
  const monthPay = (cost - downpaymentSum) *
    ((0.035 * Math.pow(1 + 0.035, leasing)) /
      (Math.pow(1 + 0.035, leasing) - 1));

  const contractSum = Number(downpaymentSum + leasing * monthPay);


  const blurEvent = () => {
    if (cost < 1000000 || cost > 6000000) setCost(1000000);
    setIsActive(false);
  };

  const sendData = (e) => {
      e.preventDefault();
      setIsRequest(true);
       postData("https://shoppingcart-379da-default-rtdb.firebaseio.com/cartItems.json", {
        car_coast: cost,
        initail_payment: downpaymentSum,
        initail_payment_percent: downpayment,
        lease_term: leasing,
        total_sum: 5000000,
        monthly_payment_from: monthPay,
      }).then(() => setIsRequest(false)) 
    } 
  

  return (
    <div className="calc">
      <div className="container">
        <h1 className="calc__title">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>

        <div className="calc__block">
          <div className="calc__block__item">
            <h2>Стоимость автомобиля</h2>
            <div className="calc__block__item-cost">
              <input
                className="calc__block__item-wideInput"
                onClick={() => setIsActive(true)}
                onChange={(e) => {
                  setCost(Number(e.currentTarget.value));
                }}
                onBlur={
                  cost < 1000000 || cost > 6000000 ? setCost(1000000) : null
                }
                type="number"
                value={cost}
              />
              <div>&#8381;</div>
            </div>
            <input
              onChange={(e) => setCost(Number(e.currentTarget.value))}
              type="range"
              id="points"
              name="points"
              min="1000000"
              max="6000000"
            />
          </div>

          <div className="calc__block__item">
            <h2>Первоначальный взнос</h2>
            <div className="calc__block__item-cost">
              <div className="calc__block__item-percent">{downpaymentSum}₽</div>

              <span>
                <div className="percent__wrapper">
                  <input
                    className="calc__block__item-percentInput"
                    onChange={(e) => {
                      setDownpayment(Number(e.currentTarget.value));
                    }}
                    onBlur={() =>
                      downpayment < 10 || downpayment > 60
                        ? setDownpayment(10)
                        : null
                    }
                    type="number"
                    value={`${downpayment}`}
                  />
                  %
                </div>
              </span>
            </div>
            <input
              onChange={(e) => setDownpayment(Number(e.currentTarget.value))}
              type="range"
              id="points"
              name="points"
              min="10"
              max="60"
            />
          </div>

          <div className="calc__block__item">
            <h2>Срок лизинга</h2>
            <div className="calc__block__item-cost">
              <input
                className="calc__block__item-wideInput"
                onChange={(e) => {
                  setLeasing(Number(e.currentTarget.value));
                }}
                onBlur={() =>
                  leasing < 1 || leasing > 60 ? setLeasing(1) : null
                }
                type="number"
                value={leasing}
              />
              <div>мес.</div>
            </div>
            <input
              onChange={(e) => setLeasing(Number(e.currentTarget.value))}
              type="range"
              id="points"
              name="points"
              min="1"
              max="60"
            />
          </div>
        </div>

        <div className="calc__contract">
          <div className="calc__contract_block">
            <h2 className="calc__contract_block-title">
              Сумма договора лизинга
            </h2>
            <div className="calc__contract_block-price">
              {contractSum} &#8381;
            </div>
          </div>

          <div className="calc__contract_block">
            <h2 className="calc__contract_block-title">
              Ежемесячный платеж от
            </h2>
            <div className="calc__contract_block-price">
              {monthPay.toFixed(2)} &#8381;
            </div>
          </div>

          <button disabled={isRequest}
            onClick={sendData}
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
