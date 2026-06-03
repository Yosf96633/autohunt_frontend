import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className=" h-screen grid place-content-center">
      <Link className=" text-3xl italic font-heading" href={"/dashboard"}>Start hunting!</Link>
    </div>
  );
};

export default page;
