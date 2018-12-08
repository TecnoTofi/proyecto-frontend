import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Typography } from '@material-ui/core';



const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});


class DetalleCompany extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
        };        
    }

    handleToggle = () => {
      this.setState({
        open: !this.state.open,
      });
    }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleToggle}>
          Detalles
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.company.name}</DialogTitle>
          <DialogContent>
          <Card className={classes.card}>
            {/* <CardHeader
                title={this.props.company.name}
                //subheader="September 14, 2016"
            /> */}
            <CardMedia
                className={classes.media}
                image={this.props.company.imageUrl}
                //title="Paella dish"
            />
            <CardContent>
            <Typography>
                {this.props.company.description}
            </Typography>
            <Typography>
               rut :
                {this.props.company.rut}
            </Typography>
            <Typography>
                {this.props.company.firstStreet}
            </Typography>
                
             </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
            </IconButton>
            </CardActions>
          </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DetalleCompany.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetalleCompany);