import React, { useEffect, useState, useRef, LegacyRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";
import inlineSuggestion from "./inlineSuggestions";
import { useCompletions } from "./completionsStore";

export default function useCodeMirror({
    initialDoc,
    onChange,
}: {
    initialDoc: string;
    onChange: (doc: string) => void;
}) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const fetchCompletion = useCompletions((state) => state.fetchCompletion);

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: initialDoc,
            extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
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
                    fetchFn: fetchCompletion,
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
