// components/slash-extension.js
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import ReactDOM from "react-dom/client";
import { SlashCommandList } from "./SlashCommandList";
import { SLASH_COMMANDS } from "./slash-commands-data";

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false, // allow anywhere
        items: ({ query }) =>
          SLASH_COMMANDS.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 5),

        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },

        render: () => {
          let reactRoot;
          let container = document.createElement("div");

          return {
            onStart(props) {
              document.body.appendChild(container);
              reactRoot = ReactDOM.createRoot(container);
              reactRoot.render(
                <SlashCommandList {...props} editor={props.editor} />
              );
            },
            onUpdate(props) {
              reactRoot.render(
                <SlashCommandList {...props} editor={props.editor} />
              );
            },
            onKeyDown({ event }) {
              if (event.key === "Escape") {
                reactRoot.unmount();
                container.remove();
                return true;
              }
              return false;
            },
            onExit() {
              reactRoot.unmount();
              container.remove();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [Suggestion(this.options.suggestion)];
  },
});
