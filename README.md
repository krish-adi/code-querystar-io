# SQL code completions for DuckDB with QueryStar

## CodeMirror completions extension references

- https://github.com/saminzadeh/codemirror-extension-inline-suggestion
- https://discuss.codemirror.net/t/inline-code-hints-like-vscode/5533
- https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/ui/components/text_editor/config.ts#L370
- https://discuss.codemirror.net/t/inline-suggested-texts/4714
- https://discuss.codemirror.net/t/implement-a-code-hinting-style-in-codemirror-6-similar-to-the-github-copilot-extension-in-vscode/6058

## How does it work?

1. `@/components/inlineSuggestions` is the CodeMirror extension to provide the interface for code completions.
2. To activate the completions, the user must type their answer with `--?` and `--/`. This can be modified, I just chose this out of some random thought.
3. The extension listens to the user typing and checks for the line text if it begins and end with the markers, and extracts the text within it.
3. This extracted text is then treated as the question and passed to the API, to fetch the SQL completion. 