import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
export default function Page() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box
          sx={{ bgcolor: "#cfe8fc", height: "80vh" }}
          className="flex flex-col justify-center items-center"
        >
          <Typography display="block" variant="h3" gutterBottom>
            WELCOME
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Too Tired To Do The Design
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            So
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Just Welcome
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
