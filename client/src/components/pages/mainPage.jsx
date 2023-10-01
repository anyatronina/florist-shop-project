import React from "react";
import FlowerCard from "../ui/flowerCard";
import { generateRandomId } from "../../utils/generateRandomId";
import Loader from "../common/loader";
import { useSelector } from "react-redux";
import { getItems, getItemsLoadingStatus } from "../../store/items";

const MainPage = () => {
  const items = useSelector(getItems());
  const randomItems = generateRandomId(items);
  const itemsLoading = useSelector(getItemsLoadingStatus());

  return (
    <main className="main">
      <section className="intro">
        <div className="wrapper">
          <p className="intro-title p-0">Красота природы для вас</p>
          <p className="intro-subtitle">
            Красота природы находится на расстоянии одного клика в нашем
            интернет-магазине цветов и растений. Мы предлагаем широкий выбор
            цветов, которые привнесут нотку природы в ваш дом и поднимут
            настроение!
          </p>
        </div>
      </section>

      <section className="offer">
        <div className="offer-title">Что мы можем предложить:</div>
        <div className="products-list d-flex justify-content-center">
          {itemsLoading && <Loader />}

          {!itemsLoading &&
            randomItems.map((item) => (
              <FlowerCard
                key={item._id}
                name={item.name}
                price={item.price}
                img={item.img}
                id={item._id}
              />
            ))}
        </div>
      </section>

      <section className="footer">
        <div className="footer-info">
          <div className="footer-title">
            <h2>Мы всегда открыты для обратной связи:</h2>
          </div>
          <div className="footer-contacts-list">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="a-footer"
            >
              instagram
            </a>
            <a
              href="https://vk.com/genebelcher"
              target="_blank"
              className="a-footer"
            >
              vkontakte
            </a>
            <a
              href="https://t.me/mamamoetramy"
              target="_blank"
              className="a-footer"
            >
              telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
