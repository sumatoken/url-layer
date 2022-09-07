import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const Slug: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const getLink = trpc.useQuery(
    [
      "getLink",
      {
        slug: router.query.slug as string,
      },
    ],
    {
      refetchOnReconnect: false, // replacement for enable: false which isn't respected.
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  if (getLink.error) {
    return (
      <span className="font-medium mr-2 text-center text-red-500">
        {getLink.error.message}
        <br />
      </span>
    );
  }
  useEffect(() => {
    if (getLink.data) {
      router.push(getLink.data.link.campaign.url as string);
    }
  }, [getLink]);

  return (
    <h1>
      Slug: {String(router.query.slug)}
      <br />
      Source: {String(router.query.ref)}
    </h1>
  );
};

export default Slug;
