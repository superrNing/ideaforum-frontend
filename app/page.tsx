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
          sx={{  height: "80vh",backgroundImage: `url('/img/background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center', }}
          className="flex flex-col justify-center items-center"
        >
          <Typography display="block" variant="h3" gutterBottom>
            WELCOME
          </Typography>
          <Typography variant="h5" display="block" gutterBottom>
            To our final Idea Forum project
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
          Lu, Ning
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
          Liu, Zhongrui
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
          Xie, Xiaorui
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
