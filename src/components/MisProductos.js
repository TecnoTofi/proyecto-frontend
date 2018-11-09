import React, {Component} from "react";
import "typeface-roboto";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

class MisProductos extends Component{

    handleDelete = () =>{
        console.log("borrar")
    }

    handleEdit= () => {
        console.log("editar")
    }
    render(){
        
        return (

            <Table>
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
                {this.props.products.map(product => (
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
        );
    }
}
export default MisProductos;