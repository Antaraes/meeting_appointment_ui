import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className=" h-16 bg-secondary sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <h1 className="text-4xl font-signature ml-2">
                <a
                  className="link-underline link-underline-black text-white font-bold"
                  href=""
                  target="_blank"
                  rel="noreferrer"
                >
                  ACE
                </a>
              </h1>
            </div>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p>Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
