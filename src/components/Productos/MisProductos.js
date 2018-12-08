import React, {Component} from "react";
import "typeface-roboto";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import EditIcon from "@material-ui/icons/Create";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
import Alert from './AlertDialog';
import Modificar from './ModificarProducto'

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
        productos: []
    }

    async componentWillMount(){
        let productos = await this.props.getProductos(this.props.company);
        let paquetes = await this.props.getPaquetes(this.props.company);
        // console.log(paquetes);
        let listado = productos.concat(paquetes);
        await this.setState({
            productos: listado
        })
    }

    handleDelete = (id) =>{
        // console.log('llegue', id);
        // this.render(<Alert product={id} props={this.props.eliminarProducto} onClick={this.handleClickOpen} />); 
        this.props.eliminarProducto(id);
        let listado = this.state.productos.filter(prod => {
            return prod.id !== id;
        });
        this.setState({productos: listado});
    }


    handleEdit= () => {
        console.log("editar")
    }
    render(){
        const { classes } = this.props;

        return (
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
                        {this.state.productos.map(product => (
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
                                    {/* <IconButton onClick={() =>{
                                         this.setState({productoSeleccionado:product});
                                         this.handleEdit();
                                     }}>
                                        <EditIcon />
                                    </IconButton>*/}
                                    {/* <IconButton onClick={() =>{
                                         this.setState({productoSeleccionado:product});
                                         this.handleEdit();
                                     }}>
                                        <EditIcon />
                                    </IconButton> */}
                                    
                                    <Modificar product={product} modificar={this.props.modificarProducto} />
                                    
                                    <Alert productId={product.id} eliminar={this.handleDelete} />
                                
                                    {/*<IconButton onClick={this.handleDelete}>
                                        <DeleteIcon />
                                    </IconButton> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
MisProductos.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MisProductos);