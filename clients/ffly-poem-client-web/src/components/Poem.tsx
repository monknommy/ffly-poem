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
  poemBox: {
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up('xs')]: {
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(6),
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: 0,
      paddingTop: theme.spacing(6),
    },
    [theme.breakpoints.up(550 + theme.spacing(6))]: {
      width: 550,
    }
  },

  poem: {
    fontFamily: 'WenYueGuDianMingChao',
  },

  poemContent: {
    paddingLeft: theme.spacing(2),
  },

  annotationBox: {
    [theme.breakpoints.up('xs')]: {
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: theme.spacing(6),
      paddingTop: theme.spacing(18),
    },
  },
});

class Poem extends React.Component<Props> {
  render() {
    const { classes, poem } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={8} className={classes.poemBox}>
            <PoemBox {...this.props} />
          </Grid>
          {poem.annotation ?
            <Grid item xs={12} md={4} className={classes.annotationBox}>
              <AnnotationBox {...this.props} />
            </Grid>
            : null}
        </Grid>
      </div>
    );
  }
}
function AnnotationBox(props: Props) {
  const { poem } = props;
  if (!poem.annotation) return null;
  return (<>
    {poem.annotation.split('\n').map((line, index) => (
      <Typography
        key={index}
        variant="body2"
        align="left"
        color="textSecondary"
      >
        {line}
      </Typography>
    ))}
  </>);
}

function PoemBox(props: Props) {
  const { classes, poem } = props;
  const poemContent = formatPoem(poem.content);
  return (
    <>
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
          variant="subtitle1"
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
    </>
  );
}

function formatPoem(content: string | null): string[] {
  const result: string[] = [];
  if (content == null) {
    return result;
  }
  let currentLine = "";
  content.split('').forEach((char: string) => {
    if (char >= '\u4e00' && char <= '\u9fa5') {
      currentLine += char;
    } else if (char === '。' ||
      char === '.' ||
      char === '？' ||
      char === '?' ||
      char === '！' ||
      char === '!' ||
      char === '，' ||
      char === ',') {
      currentLine += char;
      result.push(currentLine);
      currentLine = "";
    }
  });
  return result;
}

export default withStyles(styles)(Poem);