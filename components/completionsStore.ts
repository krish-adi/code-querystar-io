import { create } from "zustand";
import { EditorState } from "@codemirror/state";

interface CompletionsState {
    question: string;
    fetchStatus: string;
    fetchCompletion: (state: EditorState) => Promise<string | null>;
}

export const useCompletions = create<CompletionsState>()((set) => ({
    question: "",
    fetchStatus: "idle",
    fetchCompletion: async (state: any) => {
        const { anchor: cursorPosition } = state.selection.main;
        const lineText = state.doc.lineAt(cursorPosition);

        const re = /^--\?(.*)--\/$/;
        const match = lineText.text.match(re);
        if (match) {
            console.log(match[1]);
            const question = match[1];
            set({ question: question, fetchStatus: "🏃‍♂️ running querystar ⏰" });
            const res = await fetch(
                `http://127.0.0.1:8000/test/sql?question=${question}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();
            set({ fetchStatus: "completions successfull 🎉" });
            return `\n -- SQL generated for your question: \n\n${data.sql}`;
        }

        // const res = await fetch(
        //     `https://random-word-api.herokuapp.com/word?number=5`
        // );
        // const data = await res.json();
        // return data.join(" ");
        return null;
    },
}));
