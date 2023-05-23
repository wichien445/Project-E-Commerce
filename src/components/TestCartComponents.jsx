import React from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function ShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (name, price) => {
    const newItem = { name, price };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const name = event.target.elements.name.value;
          const price = parseFloat(event.target.elements.price.value);
          addItem(name, price);
          event.target.reset();
        }}
      >
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Price:
          <input type="number" name="price" step="0.01" />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ShoppingCart;
