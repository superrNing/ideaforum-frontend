"use client";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { idea } from "@/app/api/ideas";
import { likes, addLike, deleteLike } from "@/app/api/likes";
import { deleteIdea } from "@/app/api/ideas";
import { comments, deleteComment } from "@/app/api/comments";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { getRandomColorByLetter } from "@/app/utils/randomColor";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { slice } from "ramda";
import CommentsList from "./comment";
import * as dayjs from "dayjs";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddComment from "./addComment";
import EditIdea from "./editIdea";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@/app/ui/dialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";
type deleteTypeEmun = "idea" | "comment";

var calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);
export default function Page() {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const [deleteType, setDeleteType] = useState<deleteTypeEmun>("idea");
  const [dialogContent, setDialogContent] = useState<string>(
    "Are you sure you want to delete your idea?"
  );
  const [dialogTitle, setDialogTitle] = useState<string>("Delete Your Idea");
  const params = useSearchParams();
  const idea_id = params?.get("idea_id");
  const [commentVisible, setCommentVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const router = useRouter();
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

  const showEdit = ideaDetail.user_id == localStorage.getItem("user_id");

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

  const removeIdea = useMutation({
    mutationFn: deleteIdea,
    onSuccess: async (res) => {
      console.log(res, "res");
      if (res?.status === 200) {
        toast.success("Your Idea Has Been Deleted!");
        setDialogVisible(false);
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.log(error, "error");
    },
  });

  const removeComment = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (res) => {
      console.log(res, "res");
      if (res?.status === 200) {
        toast.success("Your Comment Has Been Deleted!");
        setDialogVisible(false);
        commentsRefetch();
      }
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.log(error, "error");
    },
  });

  const destoryIdeaOrComment = () => {
    deleteType === "idea"
      ? removeIdea.mutate({ idea_id })
      : removeComment.mutate({ comment_id: deleteCommentId });
  };
  const handleDeleteIdea = () => {
    setDeleteType("idea");
    setDialogContent("Are you sure you want to delete your idea?");
    setDialogTitle("Delete your Idea");
    setDialogVisible(true);
  };

  const handleDeleteComment = (id) => {
    // console.log("id", id);
    setDeleteType("comment");
    setDeleteCommentId(id);
    setDialogContent("Are you sure you want to delete your comment?");
    setDialogTitle("Delete your Comment");
    setDialogVisible(true);
  };

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
            <Avatar
              sx={{
                bgcolor: getRandomColorByLetter(ideaDetail?.user?.name),
              }}
              aria-label="recipe"
            >
              {slice(0, 1, ideaDetail?.user?.name ?? "")}
            </Avatar>
          }
          action={
            showEdit ? (
              <>
                <Tooltip title="Delete">
                  <IconButton aria-label="settings">
                    <DeleteOutlineIcon onClick={handleDeleteIdea} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton aria-label="settings">
                    <EditIcon onClick={() => setEditVisible(true)} />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              ""
            )
          }
          title={ideaDetail?.user?.name ?? ""}
          subheader={dayjs(ideaDetail?.created_at ?? "").calendar()}
        />
        <Dialog
          title={dialogTitle}
          visible={dialogVisible}
          setVisible={setDialogVisible}
          handleConfirm={destoryIdeaOrComment}
          content={dialogContent}
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
          <Tooltip title="Like">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                color={liked ? "error" : "inherit"}
                onClick={addLikes}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Comment">
            <IconButton aria-label="Comment">
              <ChatBubbleOutlineIcon onClick={() => setCommentVisible(true)} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <AddComment
        idea={ideaDetail}
        visible={commentVisible}
        refetch={commentsRefetch}
        setVisible={setCommentVisible}
      />
      <EditIdea
        idea={ideaDetail}
        visible={editVisible}
        refetch={refetch}
        setVisible={setEditVisible}
      />
      {commentsList.length ? (
        <CommentsList
          handleDeleteComments={handleDeleteComment}
          setVisible={setDialogVisible}
          data={commentsList || []}
        />
      ) : (
        ""
      )}
    </>
  );
}
