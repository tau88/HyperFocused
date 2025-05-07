import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { pink } from "@mui/material/colors";

import ExpandMoreStyles from "./ToolIconTemplate.styles";
import { ToolIconTemplateProps } from "./types";

const ToolIconTemplate: React.FC<ToolIconTemplateProps> = ({
  title,
  desc,
  color,
  Icon,
  onClick,
  ...other
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <CardActions disableSpacing>
            <IconButton
              data-testid={"favorite-button"}
              aria-label="add to favorites"
            >
              {!favorite ? (
                <FavoriteBorderIcon onClick={handleFavoriteClick} />
              ) : (
                <FavoriteIcon
                  onClick={handleFavoriteClick}
                  sx={{ color: pink[500] }}
                />
              )}
            </IconButton>
            <IconButton aria-label="settings">
              <ExpandMoreStyles
                data-testid={"expand-button"}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMoreStyles>
            </IconButton>
          </CardActions>
        }
      />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Icon />
        <div style={{ paddingBottom: 20 }} />
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            style={{ marginTop: -20 }}
          >
            {desc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ToolIconTemplate;
