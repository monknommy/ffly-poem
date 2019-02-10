import './Poem.css';
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import {Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from 'react';
import Typography from "@material-ui/core/Typography";


const styles = (theme: Theme) => createStyles({
  paper: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 6,
  },

  poem: {
    fontFamily: 'WenYueGuDianMingChao'
  }
});

interface Props extends WithStyles<typeof styles> {
  id: string
  annotation: string | null
  name: string | null
  content: string | null
}

class Poem extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item md={6}>
            <Typography
              variant="h3"
              gutterBottom
              className={classes.poem}
            >
              {this.props.name}
            </Typography>

            <Typography
              variant="h5" 
              paragraph 
              className={classes.poem}>
              {this.props.content}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Poem);