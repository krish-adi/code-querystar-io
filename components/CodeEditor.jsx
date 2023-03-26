import React, { useCallback, useEffect } from "react";
import useCodeMirror from "./useCodemirror";

export default function CodeEditor({ initialDoc, onChange, className }) {
    const handleChange = useCallback(
        (state) => {
            onChange(state);
        },
        [onChange]
    );

    const [editorRef, editorView] = useCodeMirror({
        initialDoc,
        onChange: handleChange,
    });

    useEffect(() => {
        if (editorView) {
            // Do nothing
        } else {
            // Loading editor
        }
    }, [editorView]);

    return <div className={`${className}`} ref={editorRef}></div>;
}
