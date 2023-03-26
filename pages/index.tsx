import React, { useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function Home() {
    const [doc, setDoc] = useState(
        "-- Start typing your SQL code here\n\n\n\n\n\n\n"
    );
    return (
        <>
            <main className="h-screen w-screen">
                <div className="contianer h-full flex flex-col py-10">
                    <div className="mx-auto w-full max-w-2xl p-3 flex flex-col border border-gray-500 rounded-md">
                        <div className="flex flex-row mb-2">
                            <button className="py-1 px-2 font-light text-xs bg-blue-500 text-white rounded-sm">
                                RUN
                            </button>
                        </div>
                        <CodeEditor
                            className={"w-full"}
                            initialDoc={doc}
                            onChange={setDoc}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
