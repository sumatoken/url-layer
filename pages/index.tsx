import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [wantOptions, setwantOptions] = useState(false);
  const link = trpc.useQuery(["getLink", { link: "https://facebook.com" }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (link.isLoading) console.log("loading");
  if (link.data) console.log(link.data);
  return (
    <form>
      {link.data && (
        <span className="font-medium mr-2 text-center text-red-500">
          {String(link.data.link)}
        </span>
      )}
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row justify-items-stretch items-center gap-6">
          <input
            type="search"
            id="search"
            className="p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
            placeholder="Campaign page link"
            required
          />
          <button
            type="button"
            onClick={() => setwantOptions(!wantOptions)}
            className="text-white text-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2 h-10 dark:bg-blue-600 "
          >
            Options
          </button>
        </div>
        {wantOptions && (
          <div className="flex flex-row gap-2">
            facebook
            <input type="checkbox" placeholder="2" />
            facebook
            <input type="checkbox" placeholder="2" />
            facebook
            <input type="checkbox" placeholder="2" />
            facebook
            <input type="checkbox" placeholder="2" />
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 "
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default Home;
