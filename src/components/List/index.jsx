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
  onClickItem,
  activeItem,
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
          onClick={
            onClickItem
              ? () => onClickItem(item)
              : null
          }
          className={classNames(item.className, {
            active:
              activeItem &&
              activeItem.id === item.id,
          })}
        >
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <Badge color={item.color.name} />
            )}
          </i>
          <span>
            {item.name}
            {item.tasks &&
              ` (${item.tasks.length})`}
          </span>
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
