import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            userEmail: '',
            userPassword: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        this.props.onClick(this.state.userEmail, this.state.userPassword)
        this.handleClose();
    }

  render() {
    return (
      <div>
        <Button color='inherit' onClick={this.handleClickOpen}>Iniciar Sesion</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Inicio de sesion</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='userEmail'
              name='userEmail'
              label='Direccion de Email'
              type='email'
              fullWidth
              onChange={this.onChange}
            />
            <TextField
                margin='dense'
                id='userPassword'
                name='userPassword'
                label='Contaseña'
                type='password'
                fullWidth
                onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}