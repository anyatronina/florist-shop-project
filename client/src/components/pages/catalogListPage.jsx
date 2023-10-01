import React, { useEffect, useState } from "react";
import FlowerCard from "../ui/flowerCard";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import SearchLine from "../common/searchline";
import Loader from "../common/loader";
import SliderPrice from "../common/sliderPrice";
import GroupList from "../common/groupList";
import Sorting from "../common/sorting";
import { sort } from "../../utils/sortBy";
import { useSelector } from "react-redux";
import { getItems, getItemsLoadingStatus } from "../../store/items";

const CatalogListPage = () => {
  const items = useSelector(getItems());
  const itemsLoading = useSelector(getItemsLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [searchString, setSearchString] = useState("");
  const [priceSlider, setPriceSlider] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  const handleSearchItem = ({ target }) => {
    setSearchString(target.value);
  };

  const handlePriceSlider = (value) => {
    setPriceSlider(value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleChange = (target) => {
    setSortBy(sort(target));
  };

  const handleFilterSelect = (item) => {
    setSearchString("");
    setSelectedFilter(item);
  };

  const getFilteredItems = (searchString) => {
    const ArrIsLoaded = items.filter(
      (item) =>
        parseInt(item.price) >= priceSlider[0] &&
        parseInt(item.price) <= priceSlider[1]
    );

    const filtered = ArrIsLoaded.length === 0 ? items : ArrIsLoaded;
    if (selectedFilter)
      return filtered.filter((item) => item.category === selectedFilter._id);
    if (searchString.trim() !== "") {
      return filtered.filter((item) =>
        item.name.toLowerCase().includes(searchString.toLowerCase().trim())
      );
    }
    return filtered;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  useEffect(() => {
    if (!itemsLoading) {
      const filteredUsers = getFilteredItems(searchString);
      const usersCrop = paginate(filteredUsers, currentPage, pageSize);

      if (usersCrop.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [items, searchString, priceSlider]);

  if (!itemsLoading) {
    const price = items.map((item) => item.price);
    const filteredItems = getFilteredItems(searchString);

    const count = filteredItems.length;
    const sortedItems = _.orderBy(filteredItems, sortBy.iter, sortBy.order);
    const userCrop = paginate(sortedItems, currentPage, pageSize);

    const clearFilter = () => {
      setCurrentPage(1);
      setSearchString("");
      setSelectedFilter();
      setPriceSlider([]);
    };

    return (
      <div className="d-flex wrapper-fix">
        <div className="container col-3 me-2">
          <SearchLine
            value={searchString}
            onChange={handleSearchItem}
          ></SearchLine>
          <Sorting onChange={handleChange} />
          <SliderPrice
            price={price}
            priceSlider={priceSlider}
            onChange={handlePriceSlider}
          />
          <GroupList
            selectedItem={selectedFilter}
            onItemSelect={handleFilterSelect}
          />

          <button className="btn btn-secondary w-50 mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>

        <div className="container-fix col-9 ps-4">
          <div className="d-flex flex-wrap justify-content-flex-start">
            {!itemsLoading &&
              userCrop.map((item) => (
                <FlowerCard
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  img={item.img}
                  id={item._id}
                />
              ))}
          </div>

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <Loader />;
};

export default CatalogListPage;
