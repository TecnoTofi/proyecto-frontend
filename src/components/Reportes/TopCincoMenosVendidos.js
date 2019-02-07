import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import BackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto'
    },
    table: {
      minWidth: 700,
    },
    media: {
        maxWidth: 400,
    },
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
  });

class TopCincoMenossVendidos extends Component{
    state = {
        productos: [],
        paquetes: [],
        error: '',
        textoCarga: 'Cargando datos...',
    }

    //Recibir data
    async componentWillMount(){

        this.verificarLogin();

        let productos = [], paquetes = [];

        let date = new Date();
        date.setUTCDate(date.getDate() - date.getDate() + 1);
        date.setUTCHours(0, 0, 0, 0);

        let datos = await this.props.getDatos(date);
        
        if(datos){
            if(datos.productos) productos = datos.productos;
            if(datos.paquetes) paquetes = datos.paquetes;
            let textoCarga = '';


            this.setState({productos, paquetes, textoCarga});
        }
        else{
            this.setState({error: 'No se pudo obtener la informacion del servidor'});
        }
    }

    verificarLogin = async () => {
        let tokenValido = await this.props.verificarToken();

        if(!tokenValido){
            this.props.enqueueSnackbar('No ah iniciado sesion.', { variant: 'error'});
            setTimeout(() => history.goBack(), 2000);
        }
    }

    volverAtras = () => {
        history.goBack();
    }

    //Renderizar data
    render(){
        let { classes } = this.props;
        return(
            <Fragment>
                {this.state.textoCarga ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            {this.state.textoCarga}
                        </Typography>
                        <CircularProgress className={classes.progress} />
                    </div>
                ) : (
                    <Fragment>
                        {this.state.productos.length === 0 && this.state.paquetes.length === 0 ? (
                            <div className={classes.texto}>
                                <Typography variant='h6' className={classes.texto}>
                                    Aun no tiene ventas realizadas este mes.
                                </Typography>
                                <Button onClick={this.volverAtras}>
                                <BackIcon />
                                    Volver
                                </Button>
                            </div>
                        ) : (
                            <Fragment>
                                {this.state.productos.length > 0 ? (
                                    <Fragment>
                                        <Typography variant='h4' className={classes.texto}>Productos</Typography>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell padding="checkbox">
                                                    </TableCell>
                                                    <TableCell>Imagen</TableCell>
                                                    <TableCell>Codigo</TableCell>
                                                    <TableCell>Nombre</TableCell>
                                                    <TableCell>Cantidad</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.productos.map((product, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell padding="checkbox">
                                                        </TableCell>
                                                        <TableCell>
                                                            <List dense={false}>
                                                                <ListItem>
                                                                    <ListItemAvatar>
                                                                        <Avatar alt={product.imageName} src={product.imageUrl} className={classes.avatar} />
                                                                    </ListItemAvatar>
                                                                </ListItem>
                                                            </List>
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.code}
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.name}    
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.sum}    
                                                        </TableCell>
                                                        <TableCell>
                                                            {product.description}    
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Fragment>
                                ) : (
                                    <Typography variant='h6' className={classes.texto}>
                                        Aun no ah vendido productos
                                    </Typography>
                                )}
                                {this.state.paquetes.length > 0 ? (
                                    <Fragment>
                                        <Typography variant='h4' className={classes.texto}>Paquetes</Typography>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell padding="checkbox">
                                                    </TableCell>
                                                    <TableCell>Imagen</TableCell>
                                                    <TableCell>Codigo</TableCell>
                                                    <TableCell>Nombre</TableCell>
                                                    <TableCell>Cantidad</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.paquetes.map((pack, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell padding="checkbox">
                                                        </TableCell>
                                                        <TableCell>
                                                            <List dense={false}>
                                                                <ListItem>
                                                                    <ListItemAvatar>
                                                                        <Avatar alt={pack.imageName} src={pack.imageUrl} className={classes.avatar} />
                                                                    </ListItemAvatar>
                                                                </ListItem>
                                                            </List>
                                                        </TableCell>
                                                        <TableCell>
                                                            {pack.code}
                                                        </TableCell>
                                                        <TableCell>
                                                            {pack.name}    
                                                        </TableCell>
                                                        <TableCell>
                                                            {pack.sum}    
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Fragment>
                                ) : (
                                    <Typography variant='h6' className={classes.texto}>
                                        Aun no ah vendido paquetes
                                    </Typography>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

TopCincoMenossVendidos.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopCincoMenossVendidos);