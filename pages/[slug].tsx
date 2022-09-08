import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layer from "../components/url-layer/Layer";
import { trpc } from "../utils/trpc";

const Slug: NextPage = () => {
  const router = useRouter();

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

  const getVisitorInfo = trpc.useQuery(["getVisitorInfo"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (getLink.error) {
    return (
      <span className="font-medium mr-2 text-center text-red-500">
        {getLink.error.message}
        <br />
      </span>
    );
  }
  {
  }
  return (
    <Layer
      destination={getLink.data?.link.campaign.url as string}
      slug={router.query.slug as string}
      visitor={getVisitorInfo.data as any}
    />
  );
};
export default Slug;
