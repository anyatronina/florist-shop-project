import React from "react";
import FlowerPage from "./flowerPage";
import { useModal } from "../../hooks/useModal";

const ItemModalPage = ({ itemId }) => {
  const { closeModal } = useModal();

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <FlowerPage itemId={itemId} />
      </div>
    </div>
  );
};

export default ItemModalPage;
