export const fetchSuggestion = async (state) => {
    const { anchor: cursorPosition } = state.selection.main;
    const lineText = state.doc.lineAt(cursorPosition);
    console.log(lineText);

    if (state.doc.length === 0) {
        return "";
    }

    return "--: Assumption 1\n --: Assumptions 2";

    // const res = await fetch(
    //     `https://random-word-api.herokuapp.com/word?number=5`
    // );
    // const data = await res.json();
    // return data.join(" ");
};
