import React, { useState } from "react";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";

export default function CodeBlock({ children, name }) {
    const [blockActive, setBlockActive] = useState(true);

    return (
        <div className="mx-auto my-2 w-full max-w-2xl p-3 pl-0.5 flex flex-col border border-gray-500 rounded-md">
            <div className="flex flex-row">
                <div className="ml-1 mr-1.5">
                    <button className="p-1 rounded-sm bg-gray-100 hover:bg-gray-200" onClick={() => setBlockActive(!blockActive)}>
                        {blockActive ? (
                            <BsArrowsCollapse />
                        ) : (
                            <BsArrowsExpand />
                        )}
                    </button>
                </div>
                <div className="grow">
                    {blockActive ? (
                        <>{children}</>
                    ) : (
                        <>
                            <p className="text-sm">{name}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
