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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { red } from "@mui/material/colors";
import { getRandomColorByLetter } from "@/app/utils/randomColor";

export default function CommentsList(props: any) {
  return (
    <TableContainer
      className="mt-6 no-scrollbar"
      component={Paper}
      sx={{ maxHeight: "56vh" }}
    >
      <List
        sx={{
          width: "100%",
          minWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {props?.data?.map((i, index) => {
          return (
            <div key={i.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: getRandomColorByLetter(i?.user?.name) }}
                  >
                    {slice(0, 1, i?.user?.name ?? "")}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div className="flex justify-between">
                      <span className="flex flex-col justify-center">
                        {i?.user?.name}
                      </span>
                      {i?.user_id == localStorage.getItem("user_id") ? (
                        <Tooltip title="Delete">
                          <IconButton aria-label="settings" className="p-0 m-0">
                            <DeleteOutlineIcon
                              onClick={() => props?.handleDeleteComments(i?.id)}
                            />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </div>
                  }
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
              {index !== props?.data?.length - 1 ? (
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
