import React, { useState } from "react";

export default function Preview() {
  const [currentQuestionDetails, setCurrentQuestionDetails] = useState({});
  return (
    <div className="pt-7">
      <h1 className="text-sm md:text-xl">Live Preview</h1>
      <div className="text-center">
        <h1 className="text-xl">Poll Name</h1>
      </div>
    </div>
  );
}
