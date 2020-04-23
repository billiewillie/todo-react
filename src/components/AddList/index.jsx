import React, { useState } from "react";
import List from "../List";
import Badge from "../Badge";

import "./AddList.scss";
import closeSvg from "../../assets/img/close.svg";

const AddList = ({ colors }) => {
  const [
    visiblePopup,
    setVisiblePopup,
  ] = useState(false);
  const [
    selectedColor,
    setSelectedColor,
  ] = useState(colors[0].id);
  return (
    <div className="add-list">
      <List
        click={() => setVisiblePopup(true)}
        items={[
          {
            icon: "+",
            className: "list__add-button",
            name: "add folder",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="close popup"
            onClick={() => setVisiblePopup(false)}
            className="add-list__popup-close"
          />
          <input
            type="text"
            className="field"
            placeholder="Название категории"
          />
          <ul className="add-list__popup-colors">
            {colors.map((color) => (
              <li>
                <Badge
                  key={color.name}
                  color={color.name}
                  onClick={() =>
                    setSelectedColor(color.id)
                  }
                  className={
                    selectedColor === color.id &&
                    "active"
                  }
                />
              </li>
            ))}
          </ul>
          <button className="button">Add</button>
        </div>
      )}
    </div>
  );
};

export default AddList;
