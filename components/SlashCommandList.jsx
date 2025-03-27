// components/SlashCommandList.jsx
export const SlashCommandList = ({ items, command, clientRect }) => {
  const pos = clientRect?.();

  return (
    <div
      style={{
        position: "absolute",
        top: pos?.bottom ?? 0,
        left: pos?.left ?? 0,
        zIndex: 1000,
      }}
      className="w-64 bg-white dark:bg-slate-900 border rounded shadow p-2 space-y-1"
    >
      {items.length ? (
        items.map((item, index) => (
          <button
            key={index}
            onClick={() => command(item)}
            className="w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.description}
            </div>
          </button>
        ))
      ) : (
        <div className="px-3 py-2 text-gray-500 text-sm">No results</div>
      )}
    </div>
  );
};
