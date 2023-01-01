import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ContactIcons() {
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 0,
        justifyContent: "space-around",
        maxWidth: 200,
      }}
    >
      <ListItem>
        <ListItemText>
          <Typography variant="body2">
            <a href="mailto:gregory.finley@gmail.com">
              <EmailIcon />
            </a>
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="body2">
            <a href="https://twitter.com/gregoryfinley">
              <TwitterIcon />
            </a>
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="body2">
            <a href="https://www.linkedin.com/in/greg-finley-73294920/">
              <LinkedInIcon />
            </a>
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}
