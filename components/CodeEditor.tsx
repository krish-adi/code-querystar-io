import React, { useCallback, useEffect } from "react";
import useCodeMirror from "./useCodemirror";

export default function CodeEditor({
    initialDoc,
    onChange,
    className,
}: {
    initialDoc: string;
    onChange: (doc: string) => void;
    className: string;
}) {
    const handleChange = useCallback(
        (state: string) => {
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
