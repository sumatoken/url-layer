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

  const logVisitor = trpc.useMutation(["logVisitor"], {
    onSuccess() {
      router.push(destination);
    },
    ssr: false,
  });
  logVisitor.isLoading ? console.log("loading") : null;
  useEffect(() => {
    logVisitor.mutate({
      ip: visitor.geoLocation.query,
      slug: String(slug),
      country: visitor.geoLocation.country,
      city: visitor.geoLocation.city,
    });
  }, []);

  return <h1>Loading...</h1>;
}
