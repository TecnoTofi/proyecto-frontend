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

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'contain'
  }
});

class ProductItem extends Component {
  
  handleProdClick = () => {
    this.props.onCompanyClick(this.props.item.id);
  }

  verDetalle =()=>{
    let id = this.props.item.productId ? this.props.item.productId : this.props.item.id;
    let ventana = this.props.item.esPackage ? 'packageDetalle' : 'productDetalle';
    this.props.cambiarVentana(ventana, id);
  }

  agregarAlCarrito = () => {
    this.props.agregarAlCarrito(this.props.item);
  }

  render(){
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.verDetalle}>
          <CardMedia
            component="img"
            alt={this.props.item.name}
            className={classes.media}
            height="140"
            src={`${this.props.item.imageUrl}`}
            title={this.props.item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.item.name}
            </Typography>
            {this.props.item.price ? (
              <Typography gutterBottom variant="caption" component="h2">
                ${this.props.item.price}
              </Typography>
            ) : null}
            {this.props.item.description ? (
              <Typography gutterBottom variant="overline" component="h2">
                {this.props.item.description}
              </Typography>
            ) : null}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Fragment>
            <Button size="small" color="primary" onClick={this.verDetalle}>
              Ver
            </Button>
            {this.props.flagCart && this.props.flagCart !== this.props.item.companyId ? (
              <Button size="small" color="primary" onClick={this.agregarAlCarrito}>
                <CartIcon className={classes.leftIcon} />
                Agregar
              </Button>
            ) : null}
          </Fragment>
        </CardActions>
      </Card>
    );
  }
  
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductItem);