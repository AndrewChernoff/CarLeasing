import { useState } from "react";
import "./App.scss";
import preloader from './assets/img/preloader.gif';
import Inputs from "./components/Inputs";
import { postData } from "./DAL/service";

const App = () => {
  const [cost, setCost] = useState(1000000);
  const [downpayment, setDownpayment] = useState(10);
  const [leasing, setLeasing] = useState(1);
  const [isRequest, setIsRequest] = useState(false);
  const [isActiveCost, setIsActiveCost] = useState(false);
  const [isActiveDownpayment, setIsActiveDownpayment] = useState(false);
  const [isActiveLeasing, setIsActiveLeasing] = useState(false);

  const downpaymentSum = Number((cost * (downpayment / 100)).toFixed(0));

   const monthPay = Number(((cost - downpaymentSum) * ((0.035 * Math.pow((1 + 0.035),
    leasing)) / (Math.pow((1 + 0.035), leasing) - 1)))).toFixed(0); 

  const contractSum = Number(downpaymentSum + (leasing * monthPay)).toFixed(0);

  const sendData = (e) => {
      e.preventDefault();
      setIsRequest(true);
       postData("https://hookb.in/eK160jgYJ6UlaRPldJ1P", {
        car_coast: cost,
        initail_payment: downpaymentSum,
        initail_payment_percent: downpayment,
        lease_term: leasing,
        total_sum: 5000000,
        monthly_payment_from: monthPay,
      })
      .then(() => setIsRequest(false))
      .catch(() => {
        alert('Что-то пошло не так!')
        setIsRequest(false);
      }) 
    } 

  const isMaxNumber = (param) => {
    if(cost > 6000000 || downpayment > 60) {
      return 'Слишком большие значения'
    } else {
      return param
    }
  }

  return (
    <div className="calc">
      <div className="container">
        <h1 className="calc__title">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>

        <Inputs setCost={setCost} setDownpayment={setDownpayment} setLeasing={setLeasing}
        cost={cost} downpayment={downpayment} leasing={leasing} downpaymentSum={downpaymentSum} isRequest={isRequest} isActiveCost={isActiveCost}
        setIsActiveCost={setIsActiveCost}
        isActiveDownpayment={isActiveDownpayment} setIsActiveDownpayment={setIsActiveDownpayment}
        isActiveLeasing={isActiveLeasing} setIsActiveLeasing={setIsActiveLeasing}
        />

        <div className="calc__contract">
          <div className="calc__contract_block">
            <h2 className="calc__contract_block-title">
              Сумма договора лизинга
            </h2>
            <div className="calc__contract_block-price">
            {isMaxNumber(contractSum)} &#8381;
            </div>
          </div>

          <div className="calc__contract_block">
            <h2 className="calc__contract_block-title">
              Ежемесячный платеж от
            </h2>
            <div className="calc__contract_block-price">
              {isMaxNumber(monthPay)} &#8381;
            </div>
          </div>

          <button disabled={isRequest}
            onClick={sendData}
          >
          {isRequest? <img src={preloader} style={{maxWidth: '50px'}} alt='Loading...'/> : 'Оставить заявку'}  
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
