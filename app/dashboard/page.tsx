"use client";
import { lusitana } from "@/app/ui/fonts";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import {
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Suspense, useState } from "react";

import Link from "next/link";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
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
        <div className="w-6/12">
          <Searcher placeholder="Search Ideas" refetch={handleSearch} />
        </div>
      </div>

      <div>
        <IdeaTable searchKey={searchKey} />
      </div>
    </main>
  );
}
