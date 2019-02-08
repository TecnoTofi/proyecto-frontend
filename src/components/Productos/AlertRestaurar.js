import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import RestoreIcon from "@material-ui/icons/RestoreFromTrash";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';

class AlertRestaurar extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRestaurar = () =>{
    this.props.restaurar(this.props.productId, this.props.esPackage);
    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <Tooltip
          title="Restaurar"
          placement='bottom-end'
          enterDelay={300}
        >
          <IconButton onClick={this.handleClickOpen} >
            <RestoreIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Seguro que deseas restaurar este {this.props.esPackage ? 'paquete' : 'producto'}?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="contained" autoFocus>
              Cancelar
            </Button>
            <Button onClick={this.handleRestaurar}
            color="secondary"  variant="contained">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default AlertRestaurar;