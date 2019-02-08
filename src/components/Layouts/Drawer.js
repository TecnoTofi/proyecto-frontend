import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircle';
import StoresIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProductsIcon from '@material-ui/icons/Fastfood';
import MyProductsIcon from '@material-ui/icons/List';
import LogoutIcon from '@material-ui/icons/Close';
// import WalletIcon from '@material-ui/icons/CreditCard';
import MenuIcon from '@material-ui/icons/Menu';
import BestFiveIcon from '@material-ui/icons/TrendingUp';
import WorstFiveIcon from '@material-ui/icons/TrendingDown';
import HistorialIcon from '@material-ui/icons/Assignment';
// import GraficoIcon from '@material-ui/icons/Assessment';
// import CamionIcon from '@material-ui/icons/LocalShipping';
import AssociateForm from '../Productos/AssociateForm';
import AltaPaquete from '../Paquetes/AltaPaquete';
import AltaProducto from '../Productos/AltaProducto';
import CargaBulk from '../Productos/CargaBulk';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
};

class Drawer extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = () => () => {
    this.setState({
      open: !this.state.open,
    });
  };

  logout = () => {
    this.props.logout();
    this.toggleDrawer();
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {this.props.mostrarIconos ? (
            <Fragment>
              <NavLink to='/companies' className={classes.link}>
                <ListItem>
                  <ListItemIcon><StoresIcon /></ListItemIcon>
                  <ListItemText primary='Empresas' />
                </ListItem>
              </NavLink>
              <NavLink to='/products' className={classes.link}>
                <ListItem>
                  <ListItemIcon><ProductsIcon /></ListItemIcon>
                  <ListItemText primary='Productos' />
                </ListItem>
              </NavLink>
              <Divider />
            </Fragment>
          ) : null}
          {this.props.logged ? (
            <Fragment>
              <NavLink to='/profile' className={classes.link}>
                <ListItem button>
                    <ListItemIcon><UserIcon /></ListItemIcon>
                    <ListItemText primary='Mi perfil' />
                </ListItem>
              </NavLink>
              {this.props.mostrarIconos ? (
                <NavLink to='/carrito' className={classes.link}>
                  <ListItem>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary='Carrito' />
                  </ListItem>
                </NavLink>
              ) : null}
              <Divider />
              <NavLink to='/reporte/compras' className={classes.link}>
                <ListItem button >
                    <ListItemIcon><HistorialIcon /></ListItemIcon>
                    <ListItemText primary='Historial de compras' />
                </ListItem>
              </NavLink>
              <NavLink to='/reporte/ventas' className={classes.link}>
                <ListItem button >
                    <ListItemIcon><HistorialIcon /></ListItemIcon>
                    <ListItemText primary='Historial de ventas' />
                </ListItem>
              </NavLink>
              {/* <ListItem button>
                  <ListItemIcon><CamionIcon /></ListItemIcon>
                  <ListItemText primary='Historial de despachos' />
              </ListItem> */}
              <Divider />
              <NavLink to='/misProductos' className={classes.link}>
                <ListItem button >
                    <ListItemIcon><MyProductsIcon /></ListItemIcon>
                    <ListItemText primary='Mis productos' />
                </ListItem>
                </NavLink>
                <AltaProducto
                  companyId={this.props.companyId}
                  getCategories={this.props.getCategories}
                  onClick={this.props.onClickProductAssociate}
                />
                <AssociateForm
                  companyId={this.props.companyId}
                  getProducts={this.props.getNotAssociated}
                  onClick={this.props.onClickAssociate}
                />
                <CargaBulk
                  companyId={this.props.companyId}
                  onClick={this.props.onClickProductsBulk}
                  enqueueSnackbar={this.props.enqueueSnackbar}
                />
                <AltaPaquete 
                  getProducts={this.props.getProductosByCompany}
                  companyId={this.props.companyId}
                  crearPaquete = {this.props.crearPaquete}
                  getCategories={this.props.getCategories}
                  enqueueSnackbar={this.props.enqueueSnackbar}
                />
              <Divider />
              <NavLink to='/reporte/topcincomas' className={classes.link}>
                <ListItem button >
                    <ListItemIcon><BestFiveIcon /></ListItemIcon>
                    <ListItemText primary='Top 5 mas vendido' />
                </ListItem>
              </NavLink>
              <NavLink to='/reporte/topcincomenos' className={classes.link}>
                <ListItem button >
                    <ListItemIcon><WorstFiveIcon /></ListItemIcon>
                    <ListItemText primary='Top 5 menos vendido' />
                </ListItem>
              </NavLink>
              {/* <ListItem button>
                    <ListItemIcon><GraficoIcon /></ListItemIcon>
                    <ListItemText primary='Grafico de ventas por zona' />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><GraficoIcon /></ListItemIcon>
                    <ListItemText primary='Grafico de perdidas' />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><GraficoIcon /></ListItemIcon>
                    <ListItemText primary='Grafico de ventas decadentes' />
                  </ListItem> */}
              <Divider/>
              <ListItem button onClick={this.logout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary='Cerrar sesion' />
              </ListItem>
            </Fragment>
          ) : (
            <Fragment>
              <LoginForm onClick={this.props.login} cajon={true} />
              <SignupForm onClick={this.props.signup}
                  getTypes={this.props.getTypes} 
                  getRubros={this.props.getRubros}
                  cajon={true}
              />
            </Fragment>
          )}
        </List>
      </div>
    );

    return (
      <div>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer()}>
            <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={this.state.open}
          onClose={this.toggleDrawer()}
          onOpen={this.toggleDrawer()}
        >
          <div
            tabIndex={0}
            role="button"
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Drawer);