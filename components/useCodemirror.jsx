import React, { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";
import inlineSuggestion from "./inlineSuggestions";
import { fetchSuggestion } from "./suggestionsAPI";

export default function useCodeMirror({ initialDoc, onChange }) {
    const editorRef = useRef(null);
    const [editorView, setEditorView] = useState();

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: initialDoc,
            extensions: [
                basicSetup,
                keymap.of([defaultKeymap]),
                sql(),
                oneDark,
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.changes) {
                        onChange && onChange(update.state.doc.toString());
                    }
                }),
                inlineSuggestion({
                    delay: 600,
                    fetchFn: fetchSuggestion,
                }),
            ],
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current,
        });
        setEditorView(view);

        return () => view.destroy();
    }, [editorRef]);

    return [editorRef, editorView];
}
