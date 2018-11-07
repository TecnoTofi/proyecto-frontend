import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  }
});

function MediaControlCard(props) {
    const { classes } = props;

  return (
    <Card className={classes.card} elevation={0}>
        <CardMedia
            className={classes.cover}
            image={props.product.imagePath}
            title={props.product.name}
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {props.product.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {props.product.company}
            </Typography>
            </CardContent>
            <div className={classes.controls}>
                <Button 
                    variant='contained'
                    color='primary'
                    onClick={() => (
                        props.onClick(props.product.id)
                    )}
                >
                    Borrar
                </Button>
            </div>
        </div>
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);