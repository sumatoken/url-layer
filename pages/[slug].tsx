import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const Slug: NextPage<{ ip: string | undefined }> = ({ ip }) => {
  const router = useRouter();
  const [ipAddress, setIp] = useState("");
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

  const logVisitor = trpc.useMutation(["logVisitor"]);
  if (getLink.error) {
    return (
      <span className="font-medium mr-2 text-center text-red-500">
        {getLink.error.message}
        <br />
      </span>
    );
  }

  useEffect(() => {
    if (getLink.data && getVisitorInfo.data && router.query.slug) {
      logVisitor.mutate({
        ip: getVisitorInfo.data.geoLocation.ip as string,
        slug: String(router.query.slug),
        country: getVisitorInfo.data.geoLocation.country,
        city: getVisitorInfo.data.geoLocation.city,
      });
      if (logVisitor.isSuccess) {
        router.push(getLink.data.link.campaign.url as string);
      }
      console.log("visitor", getVisitorInfo.data);
      console.log(getLink.data);
    }
  }, [getLink, logVisitor, getVisitorInfo]);

  return (
    <h1>
      Slug: {String(router.query.slug)}
      <br />
      Source: {String(router.query.ref)}
    </h1>
  );
};

export default Slug;
