import React, {Component, Fragment} from "react";
import "typeface-roboto";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import IconButton from "@material-ui/core/IconButton";
import CardMedia from '@material-ui/core/CardMedia';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';

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
    }
  });

class DetallePackage extends Component{

    state = {
        paquete: {},
        // companyProducts:[],
    }

    async componentWillMount(){
        let paquete = await this.props.getPackageById(this.props.packageId);
        console.log('paquete', paquete);
        await this.setState({
            paquete: paquete
        });
    }

    agregarAlCarrito = () => {
        this.props.agregarAlCarrito(this.props.packageId);
    }

    render(){
        const { classes } = this.props;

        return (
            <Fragment>
                {!this.state.paquete ? (
                    <Typography>
                        Cargando paquete...
                        {/* cambiar esto por una loading animation */}
                    </Typography>
                ) : (
                    <Paper className={classes.root}>
                        <div>
                            <Typography variant='h4'>{this.state.paquete.name}</Typography>
                            <div>
                                <CardMedia
                                    component='img'
                                    height='10%'
                                    width='20%'
                                    className={classes.media}
                                    src={`${this.state.paquete.imageUrl}`}
                                    title={this.state.paquete.name}
                                />
                            </div>
                        </div>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Empresa
                                        </TableCell>
                                        <TableCell>
                                            Nombre
                                        </TableCell>
                                        <TableCell>
                                            Precio
                                        </TableCell>
                                        <TableCell>
                                            Descripcion
                                        </TableCell>
                                        <TableCell>
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={0}>
                                        <TableCell>
                                            {this.state.paquete.companyName}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.paquete.name}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.paquete.price}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.paquete.description}
                                        </TableCell>
                                        <TableCell>
                                        <Button size="small" color="primary" 
                                            onClick={()=>
                                                    this.agregarAlCarrito()}>
                                            <CartIcon className={classes.leftIcon} />
                                            Agregar
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                )}
            </Fragment>
        );
    }
}
DetallePackage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetallePackage);