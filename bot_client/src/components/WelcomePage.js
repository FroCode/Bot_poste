
import React from "react";
import Image from "next/image";

const WelcomePage = ({ startChat }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative rounded-xl flex-col items-center flex bg-slate-50 justify-center  p-4 w-96 mt-8">
        <Image
          src="/algeriePostLogo.svg"
          alt="Profile Image"
          width={70}
          height={50}
          className="rounded-full"
        />

        <div className="text-center font-jaldi space-y-4 pt-6">
          <p className="text-lg">
            Hello! Nice to see you here. By pressing the Start Chat button, you agree to have your personal data stored as described in our Privacy Policy.
          </p>
          <button
            onClick={startChat}
            className="bg-[#FFB84D] text-black font-jaldi font-bold  text-lg px-6 py-2 w-[70%] rounded-lg hover:bg-[#FF9A00]"
          >
            Start Chat !
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
