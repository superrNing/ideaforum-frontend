import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { addComment } from "@/app/api/comments";
import Box from "@mui/material/Box";
import { updateIdea, IdeaParams } from "@/app/api/ideas";

type CommentParams = {
  user_id: string;
  idea_id: string;
  comment_text: string;
};

export default function EditIdea({ idea, visible, refetch, setVisible }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: updateIdea,
    onSuccess: async (res) => {
      console.log(res, "res");

      if (res?.status === 200) {
        toast.success("Idea updated");
        reset();
        refetch && refetch();
        setVisible && setVisible(false);
      }
    },
    onError: (error) => {
      toast.error("Something Wrong");
      console.log(error, "error");
    },
  });

  const onSubmit: SubmitHandler<IdeaParams> = (data) => {
    mutation.mutate({
      ...data,
      idea_id: idea?.id,
      user_id: localStorage.getItem("user_id"),
    });
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (idea) {
      setValue("title", idea?.title);
      setValue("description", idea?.description);
    }
  }, [idea]);

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
          <DialogTitle>Edit Idea</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              autoFocus
              {...register("title", { required: true })}
            />

            <TextField
              margin="normal"
              required
              multiline
              fullWidth
              rows={8}
              label="Description"
              id="description"
              autoComplete="current-password"
              {...register("description", { required: true })}
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
