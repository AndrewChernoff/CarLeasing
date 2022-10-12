import '../App.scss';

const Inputs = ({cost, downpayment, leasing, downpaymentSum, isRequest, setCost, setDownpayment, setLeasing, setIsActive}) => {
  return (
    <div className="calc__block">
      <div className="calc__block__item">
        <h2>Стоимость автомобиля</h2>
        <div className="calc__block__item-cost">
          <input disabled={isRequest}
            className="calc__block__item-wideInput"
            onClick={() => setIsActive(true)}
            onChange={(e) => {
              setCost(Number(e.currentTarget.value));
            }}
            onBlur={cost < 1000000 || cost > 6000000 ? setCost(1000000) : null}
            type="number"
            value={cost}
          />
          <div>&#8381;</div>
        </div>
        <input disabled={isRequest}
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
              <input disabled={isRequest}
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
        <input disabled={isRequest}
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
          <input disabled={isRequest}
            className="calc__block__item-wideInput"
            onChange={(e) => {
                if(e.currentTarget.value < 1) e.currentTarget.value = 1
              setLeasing(Number(e.currentTarget.value));
            }}
            onBlur={() => (leasing < 1 || leasing > 60 ? setLeasing(1) : null)}
            type="number"
            value={leasing}
          />
          <div>мес.</div>
        </div>
        <input disabled={isRequest}
          onChange={(e) => setLeasing(Number(e.currentTarget.value))}
          type="range"
          id="points"
          name="points"
          min="1"
          max="60"
        />
      </div>
    </div>
  );
};

export default Inputs;
