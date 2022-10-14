import "../App.scss";

const Inputs = ({
  cost, downpayment, leasing, downpaymentSum, isRequest,
  setCost, setDownpayment, setLeasing, setIsActiveCost,
  isActiveCost, setIsActiveDownpayment, isActiveDownpayment, isActiveLeasing, setIsActiveLeasing,
}) => {

  const blurEvent = () => {
    setIsActiveLeasing(false);
    setIsActiveDownpayment(false);
    setIsActiveCost(false);
  }

  return (
    <div className="calc__block">
      <div className="calc__block__item" style={{opacity: isRequest? 0.5 : 1}}>
        <h2>Стоимость автомобиля</h2>
        <div
          className="calc__block__item-cost"
          style={{
            border: isActiveCost ? "#F3F3F4 2px solid" : "none",
            background: isActiveCost ? "#FFF" : "#F3F3F4",
          }}
        >
          <input
            disabled={isRequest}
            style={{ background: isActiveCost ? "#FFF" : "#F3F3F4" }}
            className="calc__block__item-wideInput"
            onChange={(e) => {
              setCost(Number(e.currentTarget.value));
            }}
            onClick={() => {
              setIsActiveLeasing(false);
              setIsActiveDownpayment(false);
              setIsActiveCost(true);
            }}
            onBlur={() => {
              blurEvent();
              if (cost < 1000000 || cost > 6000000) setCost(1000000);
            }}
            type="number"
            min="1000000"
            max="6000000"
            value={cost}
          />
          <div>&#8381;</div>
        </div>
        <input
          disabled={isRequest}
          onChange={(e) => setCost(Number(e.currentTarget.value))}
          type="range"
          id="points"
          name="points"
          min="1000000"
          max="6000000"
          value={`${cost}`}
        />
      </div>

      <div className="calc__block__item" style={{opacity: isRequest? 0.5 : 1}}>
        <h2>Первоначальный взнос</h2>
        <div
          className="calc__block__item-cost"
          style={{
            border: isActiveDownpayment ? "#F3F3F4 2px solid" : "none",
            background: isActiveDownpayment ? "#FFF" : "#F3F3F4",
          }}
        >
          <div className="calc__block__item-percent">{downpaymentSum}₽</div>

          <span>
            <div
              className="percent__wrapper"
              style={{
                background: isActiveDownpayment ? "#FFF" : "#F3F3F4",
              }}
            >
              <input
                disabled={isRequest}
                className="calc__block__item-percentInput"
                style={{
                  background: isActiveDownpayment ? "#FFF" : "#F3F3F4",
                }}
                onChange={(e) => {
                  setDownpayment(Number(e.currentTarget.value));
                }}
                onClick={() => {
                  setIsActiveLeasing(false);
                  setIsActiveCost(false);
                  setIsActiveDownpayment(true);
                }}
                onBlur={() => {
                  blurEvent();
                  if (downpayment < 10 || downpayment > 60) setDownpayment(10);
                }}
                type="number"
                value={`${downpayment}`}
                min="10"
                max="60"
              />
              %
            </div>
          </span>
        </div>
        <input
          disabled={isRequest}
          onChange={(e) => setDownpayment(Number(e.currentTarget.value))}
          type="range"
          id="points"
          name="points"
          min="10"
          max="60"
          value={`${downpayment}`}
        />
      </div>

      <div className="calc__block__item" style={{opacity: isRequest? 0.5 : 1}}>
        <h2>Срок лизинга</h2>
        <div
          className="calc__block__item-cost"
          style={{
            border: isActiveLeasing ? "#F3F3F4 2px solid" : "none",
            background: isActiveLeasing ? "#FFF" : "#F3F3F4",
          }}
        >
          <input
            style={{
              background: isActiveLeasing ? "#FFF" : "#F3F3F4",
            }}
            disabled={isRequest}
            className="calc__block__item-wideInput"
            onChange={(e) => {
              setLeasing(Number(e.currentTarget.value));
            }}
            type="number"
            min="1"
            max="60"
            value={leasing}
            onClick={() => {
              setIsActiveLeasing(true);
              setIsActiveDownpayment(false);
              setIsActiveCost(false);
            }}
            onBlur={() => {
              blurEvent();
              if (leasing < 1 || leasing > 60) setLeasing(1);
            }}
          />
          <div>мес.</div>
        </div>
        <input
          disabled={isRequest}
          onChange={(e) => setLeasing(Number(e.currentTarget.value))}
          type="range"
          id="points"
          name="points"
          min="1"
          max="60"
          value={`${leasing}`}
        />
      </div>
    </div>
  );
};

export default Inputs;
