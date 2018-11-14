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
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

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
        let productos = await this.props.getProductos();
        await this.setState({
            productos: productos
        })
    }

    handleDelete = () =>{
        console.log("borrar")
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
                                    {product.code}
                                </TableCell>
                                <TableCell>
                                    {product.name}    
                                </TableCell>
                                <TableCell>
                                    {product.price}    
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={this.handleEdit}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={this.handleDelete}>
                                        <DeleteIcon />
                                    </IconButton> 
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