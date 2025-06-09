import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const LogoName = () => {
  const navigate = useNavigate();
  return (
    <>
    <button onClick={()=> navigate("/")} className= "cursor-pointer">
      <span className="text-sky-500">K</span>
      <span className="text-black">A</span>
      <span className="text-sky-500">K</span>
      <span className="text-black">A</span>
      <span className="text-sky-500">N</span>
      </button>
    </>
  );
};

export default LogoName;
