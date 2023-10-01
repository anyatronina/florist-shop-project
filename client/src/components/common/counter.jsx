import React from "react";
import { useState } from "react";
import { useBasket } from "../../hooks/useBasket";

const Counter = ({ amount }) => {
  const [sum, setSum] = useState(amount);
  const { updateSum } = useBasket();

  updateSum(sum);

  const handleIncrement = () => {
    setSum((prevState) => {
      ++prevState;
      updateSum(prevState);
      return prevState;
    });
  };

  const handleDecrement = () => {
    if (sum !== 1) {
      setSum((prevState) => {
        --prevState;
        updateSum(prevState);
        return prevState;
      });
    }
  };

  return (
    <div className="d-flex mb-3">
      <button
        className={
          sum === 1 ? "btn cart-page-btn disabled" : "btn cart-page-btn"
        }
        onClick={handleDecrement}
      >
        -
      </button>
      <p className="my-2 mx-3 width-help">{sum}</p>
      <button className="btn cart-page-btn" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;
