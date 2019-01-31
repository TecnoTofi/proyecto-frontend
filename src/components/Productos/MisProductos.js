import React, {Component, Fragment} from "react";
import "typeface-roboto";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from '@material-ui/core';
// import EditIcon from "@material-ui/icons/Create";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
import Alert from './AlertDialog';
import ModificarProducto from './ModificarProducto'
import ModificarPaquete from '../Paquetes/ModificarPaquete';
import AjustePrecioCategoria from './AjustePrecioCategoria';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    table: {
      minWidth: 700,
    },
  });

class MisProductos extends Component{

    state = {
        productos: [],
        products: [],
        categories: []
    }

    async componentWillMount(){
        let productos = await this.props.getProductos(this.props.company);
        let paquetes = await this.props.getPaquetes(this.props.company);
        let categories = await this.props.getCategories(this.props.getCategories);

        let listado = productos.concat(paquetes);
        
        this.setState({
            productos: listado,
            products: productos,
            categories
        });
    }

    handleDelete = (id, esPackage) =>{
        let listado = [];
        if(esPackage) {
            this.props.eliminarPaquete(id);
            listado = this.state.productos.filter(prod => {
                if(!prod.esPackage) return prod;
                else return prod.id !== id;
            });
        }
        else{
            this.props.eliminarProducto(id);
            listado = this.state.productos.filter(prod => {
                if(prod.esPackage) return prod;
                else return prod.id !== id;
            });
        }
        this.setState({productos: listado});
    }


    handleEdit = (product, pos) => {
        console.info(product);
        console.info(pos);
        let listado = this.state.productos;
        console.log(this.state.productos);
        listado[pos] = product;
        this.setState({ productos: listado });
    }

    render(){
        const { classes } = this.props;

        return (
            <Fragment>
                {this.state.productos.length === 0 ? (
                    <Typography>
                        Cargando productos...
                        {/* cambiar esto por una loading animation */}
                    </Typography>
                ) : (
                    <Fragment>
                        <AjustePrecioCategoria categories={this.state.categories} ajustarPrecioCategoria={this.props.ajustarPrecioCategoria} />
                        <Paper className={classes.root}>
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
                                            Precio
                                        </TableCell>
                                        <TableCell>
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.productos.map((product, indice) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                            {product.code ? product.code : 'Paquete'}
                                            </TableCell>
                                            <TableCell>
                                                {product.name}    
                                            </TableCell>
                                            <TableCell>
                                                {product.price}    
                                            </TableCell>
                                            <TableCell>
                                                {!product.esPackage ?
                                                    <ModificarProducto
                                                        product={product}
                                                        categories={this.state.categories}
                                                        modificar={this.props.modificarProducto}
                                                        actualizarLista={this.handleEdit}
                                                        posicion={indice}
                                                    />
                                                    :
                                                    <ModificarPaquete
                                                        products={this.state.products}
                                                        categories={this.state.categories}
                                                        modificarPaquete={this.props.modificarPaquete}
                                                        actualizarLista={this.handleEdit}
                                                        posicion={indice}
                                                        package={product}
                                                    /> 
                                                }
                                                <Alert productId={product.id} esPackage={product.esPackage} eliminar={this.handleDelete} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}
MisProductos.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MisProductos);