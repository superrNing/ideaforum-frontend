"use client";
import { lusitana } from "@/app/ui/fonts";
import * as dayjs from "dayjs";
import { Suspense, useState } from "react";
import Searcher from "@/app/ui/searcher";
import IdeaTable from "@/app/dashboard/ideaTable/page";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
export default function Page() {
  const [searchKey, setSearchKey] = useState<string>("");
  const handleSearch = (params: string) => {
    console.log("params", params);
    setSearchKey(params);
  };
  return (
    <main>
      <div className="flex justify-between">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          I D E A S
        </h1>
        <div className="w-6/12 mb-4">
          <Searcher placeholder="Search Ideas" refetch={handleSearch} />
        </div>
      </div>

      <div>
        {/* <Suspense fallback={<CardsSkeleton />}> */}
        <IdeaTable searchKey={searchKey} />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
