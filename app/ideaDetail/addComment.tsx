import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { addComment } from "@/app/api/comments";
import Box from "@mui/material/Box";

type CommentParams = {
  user_id: string;
  idea_id: string;
  comment_text: string;
};

export default function AddComment({ idea, visible, refetch, setVisible }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [inputRef, setInputRef] = useState(null);
  // auto focus not work in dialog, focus it after create dom
  useEffect(() => {
    if (inputRef) {
      inputRef?.focus();
    }
  }, [inputRef]);
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: async (res) => {
      console.log(res, "res");

      if (res?.status === 201) {
        toast.success("Comment Success");
        reset();
        refetch && refetch();
        setVisible && setVisible(false);
      }
    },
    onError: (error) => {
      toast.error("Something Wrong");
      reset();
      console.log(error, "error");
    },
  });

  const onSubmit: SubmitHandler<CommentParams> = (data) => {
    mutation.mutate({
      ...data,
      idea_id: idea?.id,
      user_id: localStorage.getItem("user_id"),
    });
  };

  const handleClose = () => {
    reset();
    setVisible(false);
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={visible}
        onClose={handleClose}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <DialogTitle>Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              inputRef={setInputRef}
              required
              margin="dense"
              id="comment_text"
              label="Comment"
              fullWidth
              variant="standard"
              {...register("comment_text", { required: true })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
