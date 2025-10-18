import React, { useState } from "react";

export default function ControlFlow() {
  const [questions, setQuestions] = useState(["hello","how"]);
  return (
    <div className="pt-7">
      <h1 className="text-sm md:text-xl">Control Flow</h1>
      <div>
        <div className="text-center text-sm md:text-lg bg-[#1D2432] mt-3 mb-5 p-2 md:p-4 rounded">
          Show Lobby Screen
        </div>
        {questions.map((question) => {
          return (
            <div className="flex px-4 py-5 rounded bg-[#282F3C] justify-between items-center gap-4 mb-2">
              <div className="">
                <p className="bg-green-800 px-3 py-0.5 rounded-full">Status</p>
              </div>
              <div className="">
                How are you bro this is a very very very very large question?
              </div>
              <div className="flex gap-4">
                <button className="bg-yellow-800 px-3 py-0.5 rounded-full">
                  Push
                </button>
                <button className="bg-yellow-500 px-3 py-0.5 rounded-full">
                  Reveal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
