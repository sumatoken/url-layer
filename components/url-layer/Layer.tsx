import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

interface LayerProps {
  destination: string;
  slug: string;
  visitor: any;
}

export default function Layer({ destination, slug, visitor }: LayerProps) {
  const router = useRouter();
  const getVisitorInfo = trpc.useQuery(["getVisitorInfo"], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const logVisitor = trpc.useMutation(["logVisitor"], {
    onSuccess() {
      router.push(destination);
    },
    ssr: false,
  });
  logVisitor.isLoading ? console.log("loding") : null;
  useEffect(() => {
    if (getVisitorInfo.data && router.query.slug) {
      console.log(getVisitorInfo.data);

      logVisitor.mutate({
        ip: getVisitorInfo.data.geoLocation.query,
        slug: String(router.query.slug),
        country: getVisitorInfo.data.geoLocation.country,
        city: getVisitorInfo.data.geoLocation.city,
      });
    }
  }, []);

  return <h1>Loading...</h1>;
}
