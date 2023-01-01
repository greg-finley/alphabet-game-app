import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Stack from "@mui/material/Stack";

export default function Contact() {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <a href="mailto:gregory.finley@gmail.com">
        <EmailIcon />
      </a>
      <a href="https://twitter.com/gregoryfinley">
        <TwitterIcon />
      </a>
      <a href="https://www.linkedin.com/in/greg-finley-73294920/">
        <LinkedInIcon />
      </a>
    </Stack>
  );
}
