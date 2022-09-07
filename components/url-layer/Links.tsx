import { Campaign, VisitorsOnLinks } from "@prisma/client";
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
type LinkType = {
  links: {
    campaign: Campaign;
    url: string;
    visitors: VisitorsOnLinks[];
  }[];
};
export default function Links({ links }: LinkType) {
  return (
    <div className="flex flex-col gap-3 justify-between items-center">
      {links.map((link, key) => (
        <div key={key} className="flex flex-row justify-between">
          <span className="font-medium mr-2 text-center text-blue-500">
            <Link href={link.url}>{link.url}</Link>
          </span>
          <span className="">Clicks: {link.visitors.length}</span>
        </div>
      ))}
    </div>
  );
}
