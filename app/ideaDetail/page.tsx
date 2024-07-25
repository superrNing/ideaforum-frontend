"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { idea } from "@/app/api/ideas";
import { likes } from "@/app/api/likes";
import { comments } from "@/app/api/comments";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { slice } from "ramda";
import CommentsList from "./comment";
import * as dayjs from "dayjs";
var calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);
export default function Page() {
  const params = useSearchParams();
  const idea_id = params?.get("idea_id");

  // const { id, name } = router.query;
  const { data, refetch } = useQuery({
    queryKey: ["ideas", idea_id],
    queryFn: () => {
      return idea({ idea_id });
    },
  });

  const { data: likesData, refetch: likeRefetch } = useQuery({
    queryKey: ["likes", idea_id],
    queryFn: () => {
      return likes({ idea_id });
    },
  });
  const { data: commentsData, refetch: commentsRefetch } = useQuery({
    queryKey: ["comments", idea_id],
    queryFn: () => {
      return comments({ idea_id });
    },
  });
  const ideaDetail = data?.data ?? {};

  const commentsList = commentsData?.data?.comments ?? [];

  return (
    <>
      <Card sx={{ minWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {slice(0, 1, ideaDetail?.user?.name ?? "")}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={ideaDetail?.user?.name ?? ""}
          subheader={dayjs(ideaDetail?.user?.created_at ?? "").calendar()}
        />

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {ideaDetail?.title ?? ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ideaDetail?.description ?? ""}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <CommentsList data={commentsList || []} />
    </>
  );
}
