import { Campaign, VisitorsOnLinks } from "@prisma/client";
import Link from "next/link";
import React from "react";
import copy from "copy-to-clipboard";

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
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div>
            <p className="text-sm">Click on a link to copy it</p>
          </div>
        </div>
      </div>
      {links.map((link, key) => (
        <div key={key} className="flex flex-row justify-between">
          <span
            className="cursor-pointer font-medium mr-2 text-center text-blue-500"
            onClick={() => {
              copy(`${link.url}`);
            }}
          >
            {link.url}
          </span>
          <span className="">Clicks: {link.visitors.length}</span>
        </div>
      ))}
    </div>
  );
}
