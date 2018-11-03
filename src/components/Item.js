import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.item.name}
          className={classes.media}
          height="140"
          src={`${props.item.imagePath}`}
          title={props.item.name}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item.name}
          </Typography>
          {/* <Typography component="p">
          {props.item.description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
      {props.flag === 'companias' ? (
        <Fragment >
          <Button size="small" color="primary">
            Detalles
          </Button>
          <Button size="small" color="primary">
            Productos
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Button size="small" color="primary">
            Ver
          </Button>
        </Fragment>
      )}
        
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);