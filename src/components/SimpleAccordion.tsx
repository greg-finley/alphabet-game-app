import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SimpleAccordionProps {
  defaultExpanded: boolean;
  title: string;
  content: React.ReactNode;
}

export default function SimpleAccordion(props: SimpleAccordionProps) {
  const { defaultExpanded, title, content } = props;
  return (
    <div>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: "primary.main" }}
        >
          <Typography color={"white"}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#676b72" }}>
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
