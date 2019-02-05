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
import { Button } from '@material-ui/core';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    root: {
      width: '100%',
    //   marginTop: theme.spacing.unit * 3,
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
    },
  });

class TopCincoMenossVendidos extends Component{
    state = {
        productos: [],
        paquetes: [],
        error: ''
    }

    //Recibir data
    async componentWillMount(){

        this.verificarLogin();

        let productos = [], paquetes = [];

        let date = new Date();
        date.setUTCDate(date.getDate() - date.getDate() + 1);
        date.setUTCHours(0, 0, 0, 0);

        let datos = await this.props.getDatos(date);
        console.log('daos', datos)
        if(datos){
            if(datos.productos) productos = datos.productos;
            if(datos.paquetes) paquetes = datos.paquetes;

            this.setState({productos, paquetes});
        }
        else{
            this.setState({error: 'No se pudo obtener la informacion del servidor'});
        }
    }

    verificarLogin = async () => {
        let tokenValido = await this.props.verificarToken();

        if(!tokenValido){
            alert('No ah iniciado sesion.');
            history.goBack();
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
                                <Typography variant='h4'>Productos</Typography>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Codigo
                                            </TableCell>
                                            <TableCell>
                                                Nombre
                                            </TableCell>
                                            <TableCell>
                                                Cantidad
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.productos.map((product, i) => (
                                            <TableRow key={i}>
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
                        {/* <Divider variant="middle" /> */}
                        {this.state.paquetes.length > 0 ? (
                            <Fragment>
                                <Typography variant='h4'>Paquetes</Typography>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Codigo
                                            </TableCell>
                                            <TableCell>
                                                Nombre
                                            </TableCell>
                                            <TableCell>
                                                Cantidad
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.paquetes.map((pack, i) => (
                                            <TableRow key={i}>
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
        );
    }
}

TopCincoMenossVendidos.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopCincoMenossVendidos);