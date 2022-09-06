import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Links from "../components/url-layer/Links";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [wantOptions, setwantOptions] = useState(false);
  const [campaignLink, setCampaignLink] = useState("");
  const getLinks = trpc.useQuery(["getLinks"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createLink = trpc.useMutation(["createLink"]);

  return (
    <form
      onSubmit={(e) => {
        const campaignSlug = campaignLink.split("/")[5];
        e.preventDefault();
        console.log(campaignSlug);
        createLink.mutate({
          campaignLink,
          campaignSlug,
        });
      }}
    >
      {createLink.error ? (
        <span className="font-medium mr-2 text-center text-red-500">
          {createLink.error.message}
        </span>
      ) : null}

      {createLink.isSuccess && (
        <span className="font-medium mr-2 text-center text-blue-500">
          {createLink.data?.generatedLink?.url}
        </span>
      )}
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row justify-items-stretch items-center gap-6">
          <input
            type="url"
            id="campaign_link"
            className="p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
            placeholder="Campaign page link"
            required
            onChange={(e) => setCampaignLink(e.target.value)}
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
      {getLinks.isLoading && (
        <span className="font-medium mr-2 text-center text-blue-500">
          Loading links...
        </span>
      )}
      {getLinks.data && <Links links={getLinks.data.links} />}
    </form>
  );
};

export default Home;
