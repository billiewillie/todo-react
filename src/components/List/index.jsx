import React from "react";
import classNames from "classnames";
import axios from "axios";
import Badge from "../Badge";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({
  items,
  isRemovable,
  click,
  onRemove,
}) => {
  const removeList = (item) => {
    if (window.confirm("Delete?")) {
      axios
        .delete(
          "http://localhost:3001/lists/" + item.id
        )
        .then(() => {
          onRemove(item.id);
        });
    }
  };
  return (
    <ul onClick={click} className="list">
      {items.map((item) => (
        <li
          key={item.name}
          className={classNames(item.className, {
            active: item.active,
          })}
        >
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <Badge color={item.color.name} />
            )}
          </i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              onClick={() => removeList(item)}
              className="remove-icon"
              src={removeSvg}
              alt="Remove"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
