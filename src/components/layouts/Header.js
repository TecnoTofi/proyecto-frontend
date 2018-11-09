import React, {Fragment} from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import Drawer from '../Drawer';
// import LogoutIcon from '@material-ui/icons/Clear'
import HomeIcon from '@material-ui/icons/Home';
import StoresIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProductsIcon from '@material-ui/icons/Fastfood';
import MenuUsername from '../MenuUsername';

import { NavLink } from 'react-router-dom';

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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.logged ? (
            <Drawer
              companyId={props.loggedUser.userCompanyId}
              categories={props.categories}
              onClickProduct={props.registrarProducto}
              products={props.products}
              companies={props.companies}
              onClickAssociate={props.registroEmpresaProducto}
            />
          ) : null}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <NavLink to='/' className={classes.link}>
                NuestraApp
              </NavLink>
            </Typography>
          <NavLink to='/' className={classes.link}>
            <Button color="inherit"><HomeIcon className={classes.leftIcon} />Dashboard</Button>
          </NavLink>
          <NavLink to='/companies' className={classes.link}>
            <Button color="inherit"><StoresIcon className={classes.leftIcon} />Empresas</Button>
          </NavLink>
          <NavLink to='/products' className={classes.link}>
            <Button color="inherit"><ProductsIcon className={classes.leftIcon} />Productos</Button>
          </NavLink>
          {props.logged ? (
            <Fragment>
              <NavLink to='/carrito' className={classes.link}>
                <Button color="inherit"><ShoppingCartIcon className={classes.leftIcon} />Carrito</Button>
              </NavLink>
              {/* <NavLink to='/profile' className={classes.link}> */}
                <MenuUsername                  
                  userName={props.loggedUser.userName}
                  logout={props.logout}
                  />
                {/* <Button color="inherit"><UserIcon className={classes.leftIcon} />{props.loggedUser.userName}</Button> */}
              {/* </NavLink> */}
              {/* <Button color="inherit" onClick={props.logout}><LogoutIcon className={classes.leftIcon} />Cerrar sesion</Button> */}
            </Fragment>
          ) : (
            <Fragment>
              <LoginForm onClick={props.login} />
              <SignupForm onClick={props.signup}
                  companyTypes={props.companyTypes} 
                  companyCategories={props.companyCategories} 
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