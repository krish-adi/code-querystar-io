import React from "react";
import Block1 from "@/components/blocks/Block1";
import Block2 from "@/components/blocks/Block2";

export default function Home() {
    return (
        <main className="h-screen w-screen">
            <div className="contianer h-full flex flex-col py-10">
                <Block1 />
                <Block2 />
            </div>
        </main>
    );
}
