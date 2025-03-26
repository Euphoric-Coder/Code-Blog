// components/CodeBlockComponent.jsx
"use client";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export default function CodeBlockComponent({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) {
  return (
    <NodeViewWrapper className="code-block relative">
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(e) => updateAttributes({ language: e.target.value })}
        className="absolute right-2 top-2 bg-white dark:bg-slate-800 text-sm rounded p-1"
      >
        <option value="null">Auto</option>
        <option disabled>───</option>
        {extension.options.lowlight.listLanguages().map((lang, idx) => (
          <option key={idx} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre className="rounded bg-black text-white p-4 overflow-x-auto">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
