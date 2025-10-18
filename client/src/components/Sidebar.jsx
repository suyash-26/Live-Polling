import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/contextProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Modal from "./modal/Modal";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(true);
  const { state, dispatch } = useContext(AuthContext);
  const [pollModal, setPollModal] = useState(false);
  const [polls, setPolls] = useState(["Hello", "how"]);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex">
      {open && (
        <div className=" bg-[#1D2432] text-white px-2 md:px-5 md:pt-4 h-screen fixed md:static w-[200px] md:w-[320px]">
          <div className="header flex justify-between">
            <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-xl md:text-2xl">
              LIVE POLL
            </h1>
            <div className="flex gap-[8px]">
              {state?.isAutenticated ? (
                <button onClick={() => navigate("/logout")}>Logout</button>
              ) : (
                <button
                  className="cursor-pointer text-xs md:text-base"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
              <button
                className="cursor-pointer text-xs md:text-base md:hidden"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-9">
            <button
              onClick={() => {
                if (!state.isAutenticated) {
                  navigate("/login");
                  return;
                }
                setPollModal(true);
              }}
              className="bg-[#FF4081] p-1 md:p-3 rounded-[10px] mt-1 md:mt-2 text-white cursor-pointer w-full"
            >
              + New Poll
            </button>
          </div>
          <h1 className="mt-5 md:mt-8 text-lg">My Polls</h1>
          {polls && polls.length > 0 ? (
            polls.map((poll, index) => {
              return (
                <div
                  className="mt-2"
                  onClick={() => {
                    navigate("/poll/hello");
                  }}
                >
                  <h1 className=" mb-2 p-1 md:p-2 rounded-[10px] bg-gradient-to-r from-blue-500 to-purple-600 text-white text-transparent">
                    hello
                  </h1>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-gray-300 md:mt-2">
              Create your first poll
            </p>
          )}
          <Modal
            isOpen={pollModal}
            title={"Create Poll"}
            onClose={() => setPollModal(false)}
          >
            <div className="p-10 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ">
              Hello
            </div>
          </Modal>
        </div>
      )}
      {!open && (
        <p
          onClick={() => setOpen(true)}
          className="fixed text-white top-[10px] left-[10px]"
        >
          Open
        </p>
      )}
      {children}
    </div>
  );
}
