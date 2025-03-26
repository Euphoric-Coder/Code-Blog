import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import ReactDOM from "react-dom/client";
import { SLASH_COMMANDS } from "./slash-commands-data";
import SlashMenu from "./SlashCommandList";

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
        render: () => {
          let popup = document.createElement("div");
          let reactRoot;
          let editorRef = null;

          return {
            onStart: (props) => {
              editorRef = props.editor;
              document.body.appendChild(popup);
              reactRoot = ReactDOM.createRoot(popup);
              reactRoot.render(
                <SlashMenu
                  editor={editorRef}
                  items={props.items}
                  command={props.command}
                  clientRect={props.clientRect}
                />
              );
            },
            onUpdate(props) {
              reactRoot.render(
                <SlashMenu
                  editor={editorRef}
                  items={props.items}
                  command={props.command}
                  clientRect={props.clientRect}
                />
              );
            },
            onKeyDown({ event }) {
              if (event.key === "Escape") {
                reactRoot?.unmount();
                popup?.remove();
                return true;
              }
              return false;
            },
            onExit() {
              reactRoot?.unmount();
              popup?.remove();
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
