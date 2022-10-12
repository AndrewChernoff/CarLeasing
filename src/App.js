import { useState } from "react";
import "./App.scss";

const App = () => {
  const [cost, setCost] = useState(1000000);
  const [downpayment, setDownpayment] = useState(10);
  const [leasing, setLeasing] = useState(1);

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
                onChange={(e) => {                 
                  setCost(Number(e.currentTarget.value))
                }}
                onBlur={() => (cost < 1000000 || cost > 6000000 ? setCost(1000000) : null)}
                type="text"
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
              <input
                onChange={(e) => {                 
                  setDownpayment(Number(e.currentTarget.value))
                }}
                onBlur={() => downpayment < 10 || downpayment > 60 ? setDownpayment(10) : null}
                type="text"
                value={downpayment}
              />
              <div className="calc__block__item-percent">13%</div>
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
              {/* <div>{leasing}</div> */}
              <input
                onChange={(e) => {                 
                  setLeasing(Number(e.currentTarget.value))
                }}
                onBlur={() => leasing < 1 || leasing > 60 ? setLeasing(10) : null}
                type="text"
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
            <div className="calc__contract_block-price">4 467 313 &#8381;</div>
          </div>

          <div className="calc__contract_block">
            <h2 className="calc__contract_block-title">
              Ежемесячный платеж от
            </h2>
            <div className="calc__contract_block-price">114 455 &#8381;</div>
          </div>

          <button>Оставить заявку</button>
        </div>
      </div>
    </div>
  );
};

export default App;
