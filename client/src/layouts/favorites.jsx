import React from "react";
import Loader from "../components/common/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  getFavoritesList,
  getFavoritesLoadingStatus
} from "../store/favorites";
import ItemFavorites from "../components/ui/itemFavorites";

const Favorites = () => {
  const dispatch = useDispatch();
  const itemsFavorites = useSelector(getFavoritesList());
  const isLoading = useSelector(getFavoritesLoadingStatus());

  const handleDelete = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  if (isLoading)
    return (
      <div className="wrapper-fix">
        <h1 className="mt-3">Избранное</h1>
        <Loader />
      </div>
    );

  if (itemsFavorites.length > 0) {
    return (
      <div className="wrapper-fix">
        <h1 className="mt-3">Избранное</h1>

        <div className="container-fix">
          <div className="d-flex justify-content-start flex-wrap">
            {itemsFavorites.map((item) => (
              <ItemFavorites
                key={item.itemId}
                itemId={item.itemId}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper-fix">
      <h1 className="mt-3">Избранное</h1>
      <h5 className="container-fix">Вы ничего не добавили в избранное</h5>
    </div>
  );
};

export default Favorites;
