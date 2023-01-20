import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BaseCardContent } from "../types";
import AspectRatio from "@mui/joy/AspectRatio";
import ScoreboardCard from "./ScoreboardCard";
import TextBox from "./TextBox";
import ScoreBox from "./ScoreBox";

interface BaseCardProps {
  content: BaseCardContent;
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
      <AspectRatio variant="outlined" ratio="1.8/1">
        <CardContent
          sx={{
            color: "#f5c456",
          }}
        >
          {"play" in content ? (
            <ScoreboardCard
              play={content.play}
              customCard={content.customCard}
            />
          ) : "timesCycled" in content ? (
            <div
              style={{
                flexDirection: "column",
                alignItems: "center",
                display: "flex",
              }}
            >
              <TextBox
                text={[`Alphabet cycles`, content.seasonPhrase]}
                size="big"
              />
              <ScoreBox str={content.timesCycled.toString()} fit={true} />
            </div>
          ) : (
            <TextBox
              text={[`Start of ${content.seasonPhrase.replace("in the ", "")}`]}
              size="big"
            />
          )}
        </CardContent>
      </AspectRatio>
    </Card>
  );
}
