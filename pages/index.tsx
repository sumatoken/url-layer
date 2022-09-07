import type { NextPage } from "next";
import { useState } from "react";
import Links from "../components/url-layer/Links";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [wantOptions, setwantOptions] = useState(false);
  const [campaignLink, setCampaignLink] = useState("");
  const trpcUtils = trpc.useContext();
  const getLinks = trpc.useQuery(["getLinks"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createLink = trpc.useMutation(["createLink"], {
    onSuccess() {
      trpcUtils.invalidateQueries(["getLinks"]);
      alert("link created");
    },
  });
  return (
    <form
      onSubmit={(e) => {
        const campaignSlug = campaignLink.split("/")[5].split("?")[0];

        e.preventDefault();
        createLink.mutate({
          campaignLink: campaignLink.split("?")[0],
          campaignSlug,
        });
      }}
    >
      {createLink.error ? (
        <span className="font-medium mr-2 text-center text-red-500">
          {createLink.error.message}
        </span>
      ) : null}

      <div className="w-full flex flex-col items-center justify-center gap-4 mt-24">
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
