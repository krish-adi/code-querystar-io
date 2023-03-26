import React from "react";
import {
    autocompletion,
    CompletionContext,
    completeFromList,
    completeAnyWord,
} from "@codemirror/autocomplete";

export default function addAutocomplete() {
    const createAutocompleteList = () => {
        const keywords = [
            "SELECT",
            "FROM",
            "WHERE",
            "AND",
            "OR",
            "ORDER BY",
            "GROUP BY",
        ];
        return keywords.map((keyword) => {
            return { label: keyword, type: "keyword" };
        });
    };

    function customCompletions(context: CompletionContext) {
        console.log(context);
        let wordMatch = context.matchBefore(/\w*/);
        // let exprMatch = context.matchBefore(/--\?/);
        let exprMatch = context.matchBefore(/--\?\s*\w.*/);

        if (exprMatch) {
            console.log("expr", exprMatch);
            return {
                from: exprMatch.from,
                options: [
                    {
                        label: "--?",
                        type: "text",
                        apply: "⠁⭒*.✩.*⭒⠁",
                        detail: "macro",
                    },
                ],
            };
        }

        if (wordMatch) {
            console.log("word", wordMatch);
            if (wordMatch.from == wordMatch.to && !context.explicit)
                return null;

            return {
                from: wordMatch.from,
                options: [
                    { label: "match", type: "keyword" },
                    { label: "hello", type: "variable", info: "(World)" },
                    {
                        label: "magic",
                        type: "text",
                        apply: "⠁⭒*.✩.*⭒⠁",
                        detail: "macro",
                    },
                    {
                        label: "qs:",
                        type: "text",
                        apply: "⠁⭒*.✩.*⭒⠁",
                        detail: "macro",
                    },
                ],
            };
        }

        return null;
    }
    return autocompletion({
        activateOnTyping: true,
        // override: [completeFromList(createAutocompleteList())],
        override: [customCompletions],
    });
}
