import _ from "lodash";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SliderPrice = ({ price, priceSlider, onChange }) => {
  const value = [_.min(price), _.max(price)];
  const IsNullValue = priceSlider.length === 0 ? value : priceSlider;

  return (
    <div className="container-fix">
      <p className="fw-bold">Цена</p>
      <Slider
        range
        step={10}
        min={value[0]}
        max={value[1]}
        value={IsNullValue}
        defaultValue={value}
        allowCross={false}
        onChange={(val) => {
          onChange(val);
        }}
      />
      <div className="mt-2 d-flex justify-content-evenly align-items-center user-select-none text-center">
        <div className="searchline w-30">{priceSlider[0] || value[0]} ₽</div>—
        <div className="searchline w-30">{priceSlider[1] || value[1]} ₽</div>
      </div>
    </div>
  );
};

export default SliderPrice;
