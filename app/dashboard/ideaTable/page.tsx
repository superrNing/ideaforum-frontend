import * as React from "react";
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
import Paper from "@mui/material/Paper";
import * as dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ideas } from "@/app/api/ideas";
import Link from "next/link";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
export default function Page({ searchKey }: { searchKey: string }) {
  // const [param, setParam] = useState<object>();
  const { data, isLoading } = useQuery({
    queryKey: [`idea_${searchKey}`, searchKey],
    queryFn: () => {
      return ideas({ search_key: searchKey });
    },
  });
  const rows = data?.data || [];
  return (
    <>
      <TableContainer
        className="no-scrollbar"
        component={Paper}
        sx={{ maxHeight: "80vh" }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "18%" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "45%" }}>
                Content
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Likes</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Comments</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Create At</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="cursor-pointer">
            {rows.length && !isLoading ? (
              rows?.map((row) => (
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
                  <TableCell className="hover:text-blue-500">
                    <Link
                      key={row.id}
                      href={{
                        pathname: "/ideaDetail",
                        query: { idea_id: row.id },
                      }}
                    >
                      {row.description}
                    </Link>
                  </TableCell>
                  <TableCell sx={{ minWidth: 76 }}>
                    <ThumbUpOffAltIcon className="mr-1" />
                    {row.like_count}
                  </TableCell>
                  <TableCell>
                    <ChatBubbleOutlineIcon className="mr-1" />
                    {row.comments_count}
                  </TableCell>
                  <TableCell>
                    {dayjs.utc(row.created_at).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs.utc(row.updated_at).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                hover={true}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "70vh",
                }}
              >
                <TableCell className="hover:text-blue-500 " colSpan={6}>
                  <p className="text-center">NO RESULT</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
