import React, { useContext, useState } from "react";
import ItemModalPage from "../components/pages/itemModalPage";

const ModalContext = React.createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [statusModal, setStatusModal] = useState(false);
  const [itemId, setItemId] = useState(null);

  function openModal(itemId) {
    setItemId(itemId);
    setStatusModal(true);
  }

  function closeModal() {
    setStatusModal(false);
  }

  return (
    <ModalContext.Provider value={{ statusModal, openModal, closeModal }}>
      {children}
      {statusModal && <ItemModalPage itemId={itemId} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
