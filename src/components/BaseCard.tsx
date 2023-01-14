import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Play } from "../types";
import AspectRatio from "@mui/joy/AspectRatio";
import ScoreboardCard from "./ScoreboardCard";

interface BaseCardProps {
  content: Play;
}

export default function BaseCard(props: BaseCardProps) {
  const { content } = props;
  return (
    <Card
      sx={{
        backgroundColor: "#97929c",

        marginBottom: "0.5rem",
      }}
    >
      <AspectRatio variant="outlined" ratio="1.91/1">
        <CardContent
          sx={{
            color: "#f9bc32",
          }}
        >
          <ScoreboardCard play={content} />
        </CardContent>
      </AspectRatio>
    </Card>
  );
}
