import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GitHubIcon from "@mui/icons-material/GitHub";

const items = [
  {
    url: "https://github.com/greg-finley/mlb-alphabet-game",
    text: "Main code / Twitter bots",
  },
  {
    url: "https://github.com/greg-finley/alphabet-game-plays-api",
    text: "API for fetching plays",
  },
  {
    url: "https://github.com/greg-finley/alphabet-game-app",
    text: "Front-end / this site",
  },
];

export default function GitHubLinks() {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {items.map((item) => (
            <ListItem
              key={item.url}
              disablePadding
              component="a"
              href={item.url}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
