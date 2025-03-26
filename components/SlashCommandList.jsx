// components/SlashCommandList.jsx
import { useEffect } from "react";

export default function SlashMenu({ editor, items, command, clientRect }) {
  useEffect(() => {
    const el = document.getElementById("slash-menu");
    if (el && clientRect) {
      el.style.position = "absolute";
      el.style.left = `${clientRect().left}px`;
      el.style.top = `${clientRect().bottom + 5}px`;
    }
  }, [clientRect]);

  return (
    <div
      id="slash-menu"
      className="z-[1000] w-72 rounded-md border bg-white dark:bg-slate-800 shadow-lg p-2 space-y-1"
    >
      {items.length === 0 ? (
        <div className="px-3 py-2 text-sm text-gray-400">No results</div>
      ) : (
        items.map((item, index) => (
          <button
            key={index}
            onClick={() => command(item)}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700"
          >
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.description}
            </div>
          </button>
        ))
      )}
    </div>
  );
}
