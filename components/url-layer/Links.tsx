import { Campaign } from "@prisma/client";
import Link from "next/link";
import React from "react";

/* 
[
  {
    url: "http://localhost:3000/lab22-by-sara,
  },
  {
    url: "http://localhost:3000/lab77-by-james,
  },
 ...
]

*/
type LinkType = { links: { url: string; campaign: Campaign }[] };
export default function Links({ links }: LinkType) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, key) => (
        <span key={key} className="font-medium mr-2 text-center text-blue-500">
          <Link href={link.url}>{link.url}</Link>
        </span>
      ))}
    </div>
  );
}
