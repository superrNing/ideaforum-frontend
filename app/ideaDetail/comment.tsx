import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { slice } from "ramda";
import * as dayjs from "dayjs";
import { TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function CommentsList({ data = [] }) {
  return (
    <TableContainer
      className="mt-6 no-scrollbar"
      component={Paper}
      sx={{ maxHeight: "60vh" }}
    >
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {data?.map((i, index) => {
          return (
            <div key={i.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{slice(0, 1, i?.user?.name ?? "")}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={i?.user?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {i?.comment_text}
                      </Typography>
                      <Typography sx={{ display: "block" }} variant="caption">
                        {` — ${dayjs(i?.created_at ?? "").calendar()}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index !== data?.length - 1 ? (
                <Divider variant="inset" component="li" />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </List>
    </TableContainer>
  );
}
