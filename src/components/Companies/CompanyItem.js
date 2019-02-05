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
import DetalleCompany from './DetalleCompany';
import { NavLink } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'contain',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
};

class CompanyItem extends Component {
  
  handleProdClick = () => {
    this.props.onCompanyClick(this.props.item.id);
  }

  render(){
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <NavLink to='/products/company' className={classes.link}>
          <CardActionArea onClick={this.handleProdClick}>
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
            </CardContent>
          </CardActionArea>
        </NavLink>
        <CardActions>
          <Fragment >
            <DetalleCompany company={this.props.item} />
            <NavLink to='/products/company' className={classes.link}>
              <Button size="small" color="primary" onClick={this.handleProdClick} >
                Productos
              </Button>
            </NavLink>
          </Fragment>
        </CardActions>
      </Card>
    );
  }
}

CompanyItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompanyItem);