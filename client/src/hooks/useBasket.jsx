import React, { useContext, useState } from "react";

const BasketContext = React.createContext();

export const useBasket = () => {
  return useContext(BasketContext);
};

const BasketProvider = ({ children }) => {
  const [sumBasket, setSum] = useState(0);

  const updateSum = (sum) => {
    setSum(sum);
  };

  return (
    <BasketContext.Provider
      value={{
        sumBasket,
        updateSum
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
