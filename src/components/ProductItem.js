import React, { Component, Fragment } from 'react';
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
import CartIcon from '@material-ui/icons/AddShoppingCart';

// import { NavLink } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

class ImgMediaCard extends Component {
  
  handleProdClick = () => {
    this.props.onCompanyClick(this.props.item.id);
  }

  render(){
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.props.item.name}
            className={classes.media}
            height="140"
            src={`${this.props.item.imagePath}`}
            title={this.props.item.name}
            
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.item.name}
            </Typography>
            <Typography gutterBottom variant="caption" component="h2">
              {this.props.item.price}
            </Typography>
            <Typography gutterBottom variant="overline" component="h2">
              {this.props.item.description}
            </Typography>
            {/* <Typography component="p">
            {props.item.description}
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
        {this.props.flag === 'companias' ? (
          <Fragment >
            <Button size="small" color="primary">
              Detalles
            </Button>
            {/* <NavLink to='/company/products'> */}
              <Button size="small" color="primary" onClick={this.handleProdClick} >
                Productos
              </Button>
            {/* </NavLink> */}
          </Fragment>
        ) : (
          <Fragment>
            <Button size="small" color="primary">
              Ver
            </Button>
            {this.props.flagCart ? (
              <Button size="small" color="primary">
                <CartIcon className={classes.leftIcon} />
                Agregar
              </Button>
            ) : null}
          </Fragment>
        )}
          
        </CardActions>
      </Card>
    );
  }
  
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);