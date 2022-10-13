import { useState } from "react";
import "./App.scss";
import Inputs from "./components/Inputs";
import { postData } from "./DAL/service";

const App = () => {
  const [cost, setCost] = useState(1000000);
  const [downpayment, setDownpayment] = useState(10);
  const [leasing, setLeasing] = useState(1);
  const [isRequest, setIsRequest] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const downpaymentSum = Number((cost * (downpayment / 100)).toFixed(0));

   const monthPay = (cost - downpaymentSum) * ((0.035 * Math.pow((1 + 0.035),
    leasing)) / (Math.pow((1 + 0.035), leasing) - 1)); 

  const contractSum = Number(downpaymentSum + (leasing * monthPay)).toFixed(0);

  console.log(`${((cost - downpaymentSum) *
    ((0.035 * Math.pow(1 + 0.035, leasing))) /
      (Math.pow(1 + 0.035, leasing) - 1))
}`)
console.log(cost)
console.log(downpaymentSum)
console.log(leasing)
console.log(monthPay)
console.log(((cost - downpaymentSum) *
((0.035 * Math.pow(1 + 0.035, leasing)))))

  /* const blurEvent = () => {
    if (cost < 1000000 || cost > 6000000) setCost(1000000);
    setIsActive(false);
  }; */

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

        <Inputs setCost={setCost} setDownpayment={setDownpayment} setLeasing={setLeasing} setIsActive={setIsActive}
        cost={cost} downpayment={downpayment} leasing={leasing} downpaymentSum={downpaymentSum} isRequest={isRequest}
        />

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
              {monthPay.toFixed(0)} &#8381;
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
