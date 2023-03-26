import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function Home() {
    const [doc, setDoc] = useState(
        "\n\nSELECT \n  f.first_name, \n  f.last_name \nFROM \n  yc.yc_founders f \nJOIN \n  yc.yc_companies c ON f.current_company = c.name \nWHERE \n  f.last_name IN (\n    SELECT \n      last_name \n    FROM \n      yc.yc_founders \n    GROUP BY \n      last_name \n    HAVING \n      COUNT(DISTINCT current_company) >= 3\n  ) \nGROUP BY \n  f.first_name, \n  f.last_name \nHAVING \n  COUNT(DISTINCT c.name) >= 3"
    );
    return (
        <>
            <main className="h-screen w-screen flex flex-col justify-center">
                <CodeEditor
                    className={"max-w-lg mx-auto"}
                    initialDoc={doc}
                    onChange={setDoc}
                />
            </main>
        </>
    );
}
