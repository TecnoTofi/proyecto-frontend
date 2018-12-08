import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () =>{
    this.props.eliminar(this.props.productId);
    this.handleClose();
  }

  render() {
    return (
      <div>
       {/* <Button onClick={this.handleClickOpen}>*/ }
        <IconButton onClick={this.handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        
       {/* </Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Seguro que deseas eliminar este producto?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="contained" autoFocus>
              Cancelar
            </Button>
            <Button onClick={this.handleDelete}
            color="secondary"  variant="contained">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;