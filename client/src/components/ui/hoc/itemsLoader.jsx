// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getDataStatus, loadItemsList } from "../../store/items";

// const ItemsLoader = ({ children }) => {
//   const dataStatus = useSelector(getDataStatus());
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!dataStatus) dispatch(loadItemsList());
//   }, []);

//   if (!dataStatus) return "Loading...";
//   return children;
// };

// export default ItemsLoader;
