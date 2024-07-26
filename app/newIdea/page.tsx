"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { addIdea, IdeaParams } from "@/app/api/ideas";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import toast from "react-hot-toast";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddIdea() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: addIdea,
    onSuccess: async (res) => {
      console.log(res, "res");

      if (res?.status === 201) {
        toast.success("Created!");
        router.push("/");
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
      user_id: localStorage.getItem("user_id"),
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TipsAndUpdatesIcon fontSize="large" />

          <Typography component="h1" variant="h5">
            NEW IDEA
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
