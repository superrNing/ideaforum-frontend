"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { createUser, CreateUserParams } from "@/app/api/login";
import { useForm, SubmitHandler } from "react-hook-form";
import { Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import toast from "react-hot-toast";
import { pathOr } from "ramda";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Group 2</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async (res) => {
      console.log(res, "res");

      if (res?.status === 201) {
        toast.success("Registered!");
        localStorage.setItem("user_token", res?.data?.token);
        localStorage.setItem("user_id", res?.data?.user_id);
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      const msg = pathOr(
        "Something Wrong.",
        ["response", "data", "message"],
        error
      );
      toast.error(msg);
    },
  });

  const onSubmit: SubmitHandler<CreateUserParams> = (data) => {
    mutation.mutate({
      ...data,
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SensorOccupiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              autoFocus
              required
              fullWidth
              id="name"
              label="User Name"
              {...register("name", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register("email", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password_confirmation", { required: true })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={
            <>
              <SentimentSatisfiedAltIcon className="mb-1" /> What are you
              expecting?
            </>
          }
          // action={action}
        />
      </Container>
    </ThemeProvider>
  );
}
