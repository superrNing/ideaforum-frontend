"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { idea } from "@/app/api/ideas";
import { likes, addLike, deleteLike } from "@/app/api/likes";
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
import toast from "react-hot-toast";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddComment from "./addComment";
var calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);
export default function Page() {
  const params = useSearchParams();
  const idea_id = params?.get("idea_id");
  const [commentVisible, setCommentVisible] = useState<boolean>(false);

  const { data, refetch } = useQuery({
    queryKey: ["ideas", idea_id],
    queryFn: () => {
      return idea({ idea_id });
    },
  });

  const { data: likesData, refetch: likeRefetch } = useQuery({
    queryKey: ["likes", idea_id],
    queryFn: () => {
      return likes({ idea_id, user_id: localStorage.getItem("user_id") });
    },
  });
  const { data: commentsData, refetch: commentsRefetch } = useQuery({
    queryKey: ["comments", idea_id],
    queryFn: () => {
      return comments({ idea_id });
    },
  });
  const ideaDetail = data?.data ?? {};
  const liked = likesData?.data?.liked;
  const commentsList = commentsData?.data?.comments ?? [];
  const like = useMutation({
    mutationFn: addLike,
    onSuccess: async (res) => {
      console.log(res, "res");

      if (res?.status === 201) {
        toast.success("Liked");
        likeRefetch && likeRefetch();
      }
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.log(error, "error");
    },
  });

  const dislike = useMutation({
    mutationFn: deleteLike,
    onSuccess: async (res) => {
      console.log(res, "res");

      if (res?.status === 200) {
        toast.success("Disliked");
        likeRefetch && likeRefetch();
      }
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.log(error, "error");
    },
  });

  const addLikes = () => {
    const params = {
      user_id: localStorage.getItem("user_id"),
      idea_id,
    };
    !liked ? like.mutate(params) : dislike.mutate(params);
  };

  // console.log("likesData,", likesData);
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
            <FavoriteIcon
              color={liked ? "error" : "inherit"}
              onClick={addLikes}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ChatBubbleOutlineIcon onClick={() => setCommentVisible(true)} />
          </IconButton>
        </CardActions>
      </Card>
      <AddComment
        idea={ideaDetail}
        visible={commentVisible}
        refetch={commentsRefetch}
        setVisible={setCommentVisible}
      />
      <CommentsList data={commentsList || []} />
    </>
  );
}
