import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function PollDetails() {
  const navigate = useNavigate();
  const { pollId } = useParams();

  return (
    <div className="bg-[#101827] text-white w-full px-4 md:px-6 flex flex-col">
      <div className="poll-details-header flex justify-between py-2 md:py-5 items-center">
        <p className="text-lg font-bold md:text-3xl">Poll Name</p>
        <div className="flex gap-1 md:gap-2">
          <button className="py-1 md:py-3 px-2 md:px-6 text-xs md:text-lg rounded hover:bg-[#29303D]">
            Reset Votes
          </button>
          <button className="py-2 md:py-2 px-2 md:px-6 rounded text-xs md:text-lg bg-[#F43F5E] hover:bg-[#29303D]">
            Delete Poll
          </button>
        </div>
      </div>
      <div className="inline-tabs">
        <div className="flex gap-3 md:gap-7 mt-2 md:mt-4">
          <p
            onClick={() => {
              navigate(`/poll/${pollId}/live`);
            }}
            className="text-xs md:text-lg text-underline border-b-3 md:border-b-5 rounded border-b-red-300 px-1 md:px-2 pt-1 md:pt-2 md:pb-1 hover:bg-gray-500"
          >
            Live
          </p>
          <p
            onClick={() => {
              navigate(`/poll/${pollId}/questions`);
            }}
            className="text-xs md:text-lg text-underline border-b-3 md:border-b-5 rounded border-b-red-300 px-1 md:px-2 pt-1 md:pt-2 md:pb-1 hover:bg-gray-500"
          >
            Questions
          </p>
          <p
            onClick={() => {
              navigate(`/poll/${pollId}/results`);
            }}
            className="text-xs md:text-lg text-underline border-b-3 md:border-b-5 rounded border-b-red-300 px-1 md:px-2 pt-1 md:pt-2 md:pb-1 hover:bg-gray-500"
          >
            Results
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
