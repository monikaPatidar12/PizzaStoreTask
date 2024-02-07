import React from "react";
import '../style/createOrder.css'

const SelectBox = ({ options, selectedValue, onChange, label }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select value={selectedValue} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
