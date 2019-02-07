import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
      },
})

function formatDate(date) {
    let monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    let dayNames = [
        "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
    ]
    let weekDay = date.getDay();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
  
    return `${dayNames[weekDay]} ${day} de ${monthNames[month]} del ${year}`;
  }

const ReporteComprasItem = (props) => {
    const { classes } = props;
    return(
        <div className={classes.root}>
            <Typography variant='h5'>
                Realizado el - {formatDate(new Date(props.pedido.timestamp))}
            </Typography>
            <Typography variant='h5'>
                Total - ${props.pedido.amount}
            </Typography>
            {props.pedido.voucher ? (
                <Typography variant='h5'>
                    Voucher: {props.pedido.voucher.voucher} - Tipo: {props.pedido.voucher.type} - Valor: {props.pedido.voucher.value}
                </Typography>
            ) : null}
            <Divider />
            {props.pedido.transactions.map(transaction => (
                <Fragment key={transaction.id}>
                    {transaction.products.length > 0 ? (
                        <Fragment>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Imagen</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Precio unidad</TableCell>
                                            <TableCell>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transaction.products.map(prod => (
                                            <TableRow key={prod.id}>
                                                <TableCell>
                                                    <Avatar alt={prod.imageName} src={prod.imageUrl} className={classes.avatar} />
                                                </TableCell>
                                                <TableCell>{prod.name}</TableCell>
                                                <TableCell>{prod.quantity}</TableCell>
                                                <TableCell>$ {prod.price}</TableCell>
                                                <TableCell>$ {prod.price * prod.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Fragment>
                    ) : null}
                    {transaction.packages.length > 0 ? (
                        <Fragment>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Imagen</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Precio unidad</TableCell>
                                            <TableCell>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {transaction.packages.map(pack => (
                                        <TableRow key={pack.id}>
                                            <TableCell>
                                                <Avatar alt={pack.imageName} src={pack.imageUrl} className={classes.avatar} />
                                            </TableCell>
                                            <TableCell>{pack.name}</TableCell>
                                            <TableCell>{pack.quantity}</TableCell>
                                            <TableCell>$ {pack.price}</TableCell>
                                            <TableCell>$ {pack.price * pack.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Fragment>
                    ) : null}
                </Fragment>
            ))}
        </div>
    );
};

ReporteComprasItem.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReporteComprasItem);