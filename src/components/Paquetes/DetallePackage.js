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
import CardMedia from '@material-ui/core/CardMedia';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import BackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    padding: {
        marginLeft: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
  });

class DetallePackage extends Component{

    state = {
        paquete: {},
        dense: false,
        secondary: true,
        textoCarga: 'Cargando paquete...'
    }

    async componentWillMount(){
        let paquete = await this.props.getPackageById(this.props.packageId);

        let textoCarga = '', cargaTerminada = false;
        if(!paquete){
            cargaTerminada = true;
            textoCarga = 'No se pudo encontrar paquete.';
        }

        await this.setState({
            paquete: paquete,
            textoCarga,
            cargaTerminada
        });
    }

    agregarAlCarrito = () => {
        this.props.agregarAlCarrito(this.state.paquete);
    }

    generate = (element) => {
        return [0, 1, 2].map(value =>
          React.cloneElement(element, {
            key: value,
          }),
        );
    }

    volverAtras = () => {
        history.goBack();
    }

    render(){
        const { classes } = this.props;
        const { dense } = this.state;

        return (
            <Fragment>
                {!this.state.paquete ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            {this.state.textoCarga}
                        </Typography>
                        {this.state.cargaTerminada ? (
                            <Button onClick={this.volverAtras}>
                                <BackIcon />
                                Volver
                            </Button>
                        ) : <CircularProgress className={classes.progress} />}
                    </div>
                ) : (
                    <Paper className={classes.root}>
                    <div className={classes.padding}>
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
                        <Divider variant="middle" />
                        <div className={classes.padding}>
                            <Typography variant='h6'>Descripcion</Typography>
                            <Typography variant='body1'>{this.state.paquete.description}</Typography>
                        </div>
                        <Divider variant="middle" />
                        {this.state.paquete.categories ? (
                            <div className={classes.padding}>
                                <Typography variant='h6'>Categorias</Typography>
                                <div>
                                    {this.state.paquete.categories.map(c => (
                                        <Chip key={c.id} label={c.name} className={classes.chip} />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        <Divider variant="middle" />
                        {this.state.paquete.products ? (
                            <div className={classes.padding}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" className={classes.title}>
                                        Productos
                                    </Typography>
                                    <div className={classes.demo}>
                                        <List dense={dense}>
                                            {this.state.paquete.products.map(p => (
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar alt={p.imageName} src={p.imageUrl} className={classes.avatar} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={p.name + ' x ' + p.quantity}
                                                        secondary={p.description}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </Grid>
                            </div>
                        ) : null}
                        <Divider variant="middle" />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                <TableCell padding="checkbox">
                                    </TableCell>
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
                                    {this.props.loggedCompany !== 0 ? (
                                        <TableCell>
                                            Acciones
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={0}>
                                    <TableCell padding="checkbox">
                                    </TableCell>
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
                                    {this.state.paquete.companyId !== this.props.loggedCompany && this.props.loggedCompany !== 0 ? (
                                        <Button size="small" color="primary" 
                                            onClick={()=>
                                                    this.agregarAlCarrito()}>
                                            <CartIcon className={classes.leftIcon} />
                                            Agregar
                                        </Button>
                                    ) : null}
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