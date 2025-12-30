import React, { useState } from "react";

interface Item {
  id: string;
  label: string;
  quantity: number;
}

export function DragDropWithQuantity() {
  const [items, setItems] = useState<Item[]>([]);
  const [dragItem, setDragItem] = useState<Item | null>(null);
  const [customLabel, setCustomLabel] = useState("");

  // Predefined draggable items
  const draggableItems: Item[] = [
    { id: "1", label: "Apple", quantity: 1 },
    { id: "2", label: "Banana", quantity: 1 },
    { id: "3", label: "Orange", quantity: 1 },
  ];

  // Drag start
  const handleDragStart = (item: Item) => {
    setDragItem(item);
  };

  // Drop logic with quantity increment
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragItem) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.label === dragItem.label);
      if (existing) {
        return prev.map((i) =>
          i.label === dragItem.label ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...dragItem }];
      }
    });
    setDragItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  // Remove item
  const removeItem = (label: string) => {
    setItems((prev) => prev.filter((i) => i.label !== label));
  };

  // Add custom item via form
  const addCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel.trim()) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.label === customLabel.trim());
      if (existing) {
        return prev.map((i) =>
          i.label === customLabel.trim()
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [
          ...prev,
          { id: Date.now().toString(), label: customLabel.trim(), quantity: 1 },
        ];
      }
    });

    setCustomLabel("");
  };

  return (
    <div className="p-4 flex flex-col gap-8">
      {/* Draggable items */}
      <div className="flex gap-8">
        <div className="flex flex-col gap-2">
          <h2>Drag Me</h2>
          {draggableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="p-2 bg-blue-200 cursor-move rounded"
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Drop target */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex flex-col p-4 w-64 min-h-50 bg-gray-100 border-2 border-dashed rounded"
        >
          <h2>Dropped Items</h2>
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 p-1"
            >
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                {item.label} x {item.quantity}
              </label>
              <button
                onClick={() => removeItem(item.label)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form to add custom item */}
      <form onSubmit={addCustomItem} className="flex gap-2 items-center">
        <input
          type="text"
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          placeholder="Add custom item"
          className="border p-1 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}

const ShoppingListPage = () => {
  return (
    <div>
      <DragDropWithQuantity />
    </div>
  );
};

export default ShoppingListPage;
