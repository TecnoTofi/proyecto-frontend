import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import ProductForm from '../ProductForm';
import AssociateForm from '../AssociateForm';
import Drawer from '../Drawer';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.logged ? (
            <Drawer />
          ) : null}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            NuestraApp
          </Typography>
          {props.logged ? (
            <Fragment>
              <ProductForm 
                categories={props.categories} 
                onClick={props.registrarProducto}
              />
              <AssociateForm 
                products={props.products} 
                companies={props.companies} 
                onClick={props.registroEmpresaProducto}
              />
              <Button color="inherit">{props.loggedUser.userName}</Button>
              <Button color="inherit" onClick={props.logout}>Cerrar sesion</Button>
            </Fragment>
          ) : (
            <Fragment>
              <LoginForm onClick={props.login} />
              <SignupForm onClick={props.signup}
                  companyTypes={props.companyTypes} 
                  userTypes={props.userTypes}
              />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);