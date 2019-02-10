import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { PoemQuery_poem } from "./__generated__/PoemQuery";
import React from 'react';
import Typography from "@material-ui/core/Typography";

interface Props extends WithStyles<typeof styles> {
  poem: PoemQuery_poem
}

const styles = (theme: Theme) => createStyles({
  paper: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing.unit * 6,
    [theme.breakpoints.up(550 + theme.spacing.unit * 3 * 2)]: {
      width: 550,
    }
  },

  poem: {
    fontFamily: 'WenYueGuDianMingChao',
  },

  poemContent: {
    paddingLeft: theme.spacing.unit * 2,
  }
});

class Poem extends React.Component<Props> {
  render() {
    const { classes, poem } = this.props;
    const poemContent = this.formatPoem(poem.content);
    return (
      <div className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              className={classes.poem}
            >
              {poem.name}
            </Typography>
            
            {poem.author && poem.author.name ?
              <Typography
                variant="subheading"
                gutterBottom
                align="center"
                className={classes.poem}
              >
                {poem.author.name}
              </Typography>
              : null}

            <div>
              {poemContent.map((poemLine, index) => (
                <Typography
                  key={index}
                  variant="h5"
                  align="center"
                  className={classes.poem + " " + classes.poemContent}>
                  {poemLine}
                </Typography>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  formatPoem(content: string | null): string[] {
    const result: string[] = [];
    if (content == null) {
      return result;
    }
    let currentLine = "";
    content.split('').forEach((char: string) => {
      if (char >= '\u4e00' && char <= '\u9fa5') {
        currentLine += char;
      } else if (char == '。' ||
        char == '.' ||
        char == '？' ||
        char == '?' ||
        char == '！' ||
        char == '!' ||
        char == '，' ||
        char == ',') {
        currentLine += char;
        result.push(currentLine);
        currentLine = "";
      }
    });
    return result;
  }
}

export default withStyles(styles)(Poem);