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
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { ideas } from "@/app/api/ideas";
import Link from "next/link";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
export default async function Page() {
  const { data, refetch } = useQuery({
    queryKey: ["ideas"],
    queryFn: () => {
      return ideas();
    },
  });

  const rows = data?.data || [];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Ideas
      </h1>
      <div>
        <TableContainer
          className="no-scrollbar"
          component={Paper}
          sx={{ maxHeight: "84vh" }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Create At</TableCell>
                <TableCell>Update At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="cursor-pointer">
              {rows?.map((row) => (
                <TableRow
                  hover={true}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="hover:text-blue-500">
                    <Link
                      key={row.id}
                      href={{
                        pathname: "/ideaDetail",
                        query: { idea_id: row.id },
                      }}
                    >
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell sx={{ minWidth: 76 }}>
                    <ThumbUpOffAltIcon className="mr-1" />
                    {row.like_count}
                  </TableCell>
                  <TableCell>
                    <ChatBubbleOutlineIcon className="mr-1" />
                    {row.comments_count}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.created_at).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.updated_at).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
