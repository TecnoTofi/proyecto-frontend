import React, { Component, Fragment } from 'react';
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
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // width: 100+'%',
    // left: 0,
    // top: 0,
    // position: 'fixed'
  },
  grow: {
    flexGrow: 1,
    textAlign: 'right',
    
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

class Header extends Component {
  state = {
    width: 0,
    mostrarIconos: false,
  }
  
  updateDimensions = () => {
  var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

      if(width >= 760) this.setState({width, mostrarIconos: false});
      else this.setState({width, mostrarIconos: true});
  }

  componentWillMount() {
      this.updateDimensions();
  }
  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }

  render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {this.state.width < 760 || this.props.logged ? (
            <Drawer
              cambiarVentana={this.props.cambiarVentana}
              companyId={this.props.loggedUser.userCompanyId}
              getCategories={this.props.getCategories}
              getProducts={this.props.getProducts}
              getNotAssociated={this.props.getNotAssociated}
              companies={this.props.companies}
              onClickAssociate={this.props.registroEmpresaProducto}
              onClickProductAssociate={this.props.registrarProducto}
              getProductosByCompany={this.props.getProductosByCompany}
              onClickProductsBulk={this.props.registroProductosBulk}
              crearPaquete = {this.props.crearPaquete}
              enqueueSnackbar={this.props.enqueueSnackbar}
              logged={this.props.logged}
              loggedUser={this.props.loggedUser}
              logout={this.props.logout}
              login={this.props.login}
              getTypes={this.props.getTypes}
              getRubros={this.props.getRubros}
              mostrarIconos={this.state.mostrarIconos}
            />
          ) : null}
            <NavLink to='/' className={classes.link}>
              <Typography
                variant="h6"
                color="inherit"
              >
                NuestraApp
              </Typography>
            </NavLink>
          {/* <NavLink to='/' className={classes.link}> */}
            {/* <Button
              color="inherit"
              onClick={() => {this.props.cambiarVentana('dashboard')}}>
              <HomeIcon className={classes.leftIcon} />
              Dashboard
            </Button> */}
          {/* </NavLink> */}
          {this.state.width >= 760 ? (
            <div className={classes.grow}>
            <NavLink to='/companies' className={classes.link}>
              <Button
                color="inherit">
                <StoresIcon className={classes.leftIcon} />
                Empresas
              </Button>
            </NavLink>
            <NavLink to='/products' className={classes.link}>
              <Button
                color="inherit">
                <ProductsIcon className={classes.leftIcon} />
                Productos
              </Button>
            </NavLink>
            {this.props.logged ? (
              <Fragment>
                <NavLink to='/carrito' className={classes.link}>
                  <Button
                    color="inherit">
                    <ShoppingCartIcon className={classes.leftIcon} />
                    Carrito
                  </Button>
                </NavLink>
                  <MenuUsername
                    cambiarVentana={this.props.cambiarVentana}
                    userName={this.props.loggedUser.userName}
                    logout={this.props.logout}
                  />
              </Fragment>
            ) : (
              <Fragment>
                <LoginForm onClick={this.props.login} />
                <SignupForm onClick={this.props.signup}
                    getTypes={this.props.getTypes}
                    getRubros={this.props.getRubros}
                />
              </Fragment>
            )}
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
            }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);