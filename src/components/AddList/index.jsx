import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import List from "../List";
import Badge from "../Badge";

import "./AddList.scss";
import closeSvg from "../../assets/img/close.svg";

const AddList = ({ colors, onAdd }) => {
  const [
    visiblePopup,
    setVisiblePopup,
  ] = useState(false);
  const [
    selectedColor,
    setSelectedColor,
  ] = useState(3);
  const [isLoading, setIsLoading] = useState(
    false
  );
  const [inputValue, setInputValue] = useState(
    ""
  );
  useEffect(() => {
    if (Array.isArray(colors))
      setSelectedColor(colors[0].id);
  }, [colors]);
  const onClose = () => {
    setInputValue("");
    setVisiblePopup(false);
    setSelectedColor(colors[0].id);
  };
  const addList = () => {
    if (!inputValue) {
      alert("enter list name!");
      return;
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/lists", {
          name: inputValue,
          colorId: selectedColor,
        })
        .then(({ data }) => {
          const color = colors.filter(
            (c) => c.id === selectedColor
          )[0].name;
          const listObj = {
            ...data,
            color: { name: color },
          };
          onAdd(listObj);
          onClose();
        });
    }
  };
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
            onClick={onClose}
            className="add-list__popup-close"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
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
          <button
            onClick={addList}
            className="button"
          >
            Add
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
