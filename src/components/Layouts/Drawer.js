import React from 'react';
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
// import WalletIcon from '@material-ui/icons/CreditCard';
import ProductsIcon from '@material-ui/icons/List';
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

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <NavLink to='/profile' className={classes.link}>
            <ListItem button onClick={() => {
              this.toggleDrawer(); //por alguna razon no se esta llamando
              // this.props.cambiarVentana('profile');
            }}>
                <ListItemIcon><UserIcon /></ListItemIcon>
                <ListItemText primary='Mi perfil' />
            </ListItem>
          </NavLink>
          {/* <ListItem button>
              <ListItemIcon><WalletIcon /></ListItemIcon>
              <ListItemText primary='Mis metodos de pago' />
          </ListItem> */}
          <Divider />
          {/* <ListItem button>
              <ListItemIcon><HistorialIcon /></ListItemIcon>
              <ListItemText primary='Historial de compras' />
          </ListItem> */}
          <NavLink to='/reporte/compras' className={classes.link}>
            <ListItem button onClick={() => {
              this.toggleDrawer(); //por alguna razon no se esta llamando
              // this.props.cambiarVentana('reporteCompras');
            }}>
                <ListItemIcon><HistorialIcon /></ListItemIcon>
                <ListItemText primary='Historial de compras' />
            </ListItem>
          </NavLink>
          <NavLink to='/reporte/ventas' className={classes.link}>
            <ListItem button onClick={() => {
              this.toggleDrawer(); //por alguna razon no se esta llamando
              // this.props.cambiarVentana('reporteVentas');
            }}>
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
           <ListItem button onClick={() => {
             this.toggleDrawer(); //por alguna razon no se esta llamando
            //  this.props.cambiarVentana('myProducts');
           }}>
              <ListItemIcon><ProductsIcon /></ListItemIcon>
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
            // companies={this.props.companies} 
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
            {/* <ListItem button>
                <ListItemIcon><BestFiveIcon /></ListItemIcon>
                <ListItemText primary='Top 5 mas vendido' />
            </ListItem> */}
            <NavLink to='/reporte/topcincomas' className={classes.link}>
              <ListItem button onClick={() => {
                this.toggleDrawer(); //por alguna razon no se esta llamando
                // this.props.cambiarVentana('reporteTopCincoMas');
              }}>
                  <ListItemIcon><BestFiveIcon /></ListItemIcon>
                  <ListItemText primary='Top 5 mas vendido' />
              </ListItem>
            </NavLink>
            <NavLink to='/reporte/topcincomenos' className={classes.link}>
              <ListItem button onClick={() => {
                this.toggleDrawer(); //por alguna razon no se esta llamando
                // this.props.cambiarVentana('reporteTopCincoMenos');
              }}>
                  <ListItemIcon><WorstFiveIcon /></ListItemIcon>
                  <ListItemText primary='Top 5 menos vendido' />
              </ListItem>
            </NavLink>
            {/* <ListItem button>
                <ListItemIcon><WorstFiveIcon /></ListItemIcon>
                <ListItemText primary='Top 5 menos vendido' />
            </ListItem> */}
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
            // onClick={this.toggleDrawer()}
            // onKeyDown={this.toggleDrawer()}
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