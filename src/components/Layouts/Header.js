import React, {Fragment} from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';
import Drawer from './Drawer';
// import HomeIcon from '@material-ui/icons/Home';
import StoresIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProductsIcon from '@material-ui/icons/Fastfood';
import MenuUsername from '../Helpers/MenuUsername';
// import { NavLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // width: 100+'%',
    // left: 0,
    // top: 0,
    // position: 'fixed'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
});

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.logged ? (
            <Drawer
              cambiarVentana={props.cambiarVentana}
              companyId={props.loggedUser.userCompanyId}
              getCategories={props.getCategories}
              getProducts={props.getProducts}
              getNotAssociated={props.getNotAssociated}
              companies={props.companies}
              onClickAssociate={props.registroEmpresaProducto}
              onClickProductAssociate={props.registrarProducto}
              getProductosByCompany={props.getProductosByCompany}
              onClickProductsBulk={props.registroProductosBulk}
              crearPaquete = {props.crearPaquete}
              enqueueSnackbar={props.enqueueSnackbar}
            />
          ) : null}
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              onClick={() => {props.cambiarVentana('home')}}
            >
              {/* <NavLink to='/' className={classes.link}> */}
                NuestraApp
              {/* </NavLink> */}
            </Typography>
          {/* <NavLink to='/' className={classes.link}> */}
            {/* <Button
              color="inherit"
              onClick={() => {props.cambiarVentana('dashboard')}}>
              <HomeIcon className={classes.leftIcon} />
              Dashboard
            </Button> */}
          {/* </NavLink> */}
          {/* <NavLink to='/companies' className={classes.link}> */}
            <Button
              color="inherit"
              onClick={() => {props.cambiarVentana('companies')}}>
              <StoresIcon className={classes.leftIcon} />
              Empresas
            </Button>
          {/* </NavLink> */}
          {/* <NavLink to='/products' className={classes.link}> */}
            <Button
              color="inherit"
              onClick={() => {props.cambiarVentana('productsGeneric')}}>
              <ProductsIcon className={classes.leftIcon} />
              Productos
            </Button>
          {/* </NavLink> */}
          {props.logged ? (
            <Fragment>
              {/* <NavLink to='/carrito' className={classes.link}> */}
                <Button
                  color="inherit"
                  onClick={() => {props.cambiarVentana('carrito')}}>
                  <ShoppingCartIcon className={classes.leftIcon} />
                  Carrito
                </Button>
              {/* </NavLink> */}
                <MenuUsername
                  cambiarVentana={props.cambiarVentana}
                  userName={props.loggedUser.userName}
                  logout={props.logout}
                  />
            </Fragment>
          ) : (
            <Fragment>
              <LoginForm onClick={props.login} />
              <SignupForm onClick={props.signup}
                  getTypes={props.getTypes} 
                  getCategories={props.getRubros} 
                  // getUserTypes={props.getUserTypes}
              />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);