import React from "react";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function Subtotal({ items }) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
