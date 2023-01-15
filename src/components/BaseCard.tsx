import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Play, NewSeason, NewCycle } from "../types";
import AspectRatio from "@mui/joy/AspectRatio";
import ScoreboardCard from "./ScoreboardCard";
import TextBox from "./TextBox";
import ScoreBox from "./ScoreBox";

interface BaseCardProps {
  content: Play | NewSeason | NewCycle;
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
          {"play_id" in content ? (
            <ScoreboardCard play={content} />
          ) : "timesCycled" in content ? (
            <div
              style={{
                flexDirection: "column",
                alignItems: "center",
                display: "flex",
              }}
            >
              <TextBox
                text={[`Alphabet cycles`, `${content.seasonPhrase}:`]}
                big={true}
              />
              <ScoreBox
                str={content.timesCycled.toString()}
                padWithUnderscores={false}
              />
            </div>
          ) : (
            <TextBox
              text={[`Start of ${content.seasonPhrase.replace("in the ", "")}`]}
              big={true}
            />
          )}
        </CardContent>
      </AspectRatio>
    </Card>
  );
}
