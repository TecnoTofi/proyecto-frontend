import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider'

const styles = ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        margin: 50+'px',
        overflowX: 'auto'
      },
    //   table: {
    //     minWidth: 700,
    //   },
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
    console.log(day);
    let month = date.getMonth();
    let year = date.getFullYear();
  
    return `${dayNames[weekDay]} ${day} de ${monthNames[month]} del ${year}`;
  }

const ReporteVentasItem = (props) => {
    const { classes } = props;
    return(
        <div className={classes.root}>
            <Typography variant='h5'>
                Realizada el - {formatDate(new Date(props.transaction.timestamp))}
            </Typography>
            <Typography variant='h5'>
                Total - ${props.transaction.amount}
            </Typography>
            <Divider />
                    {props.transaction.products ? (
                        props.transaction.products.map(prod => (
                            <Typography variant='body1' key={prod.id}>
                                {`${prod.name} x ${prod.quantity} - Total: $${prod.price * prod.quantity} - $${prod.price} la unidad`}
                            </Typography>
                        ))
                    ) : null}
                    {props.transaction.packages ? (
                        props.transaction.packages.map(pack => (
                            <Typography variant='body1' key={pack.id}>
                                {`${pack.name} x ${pack.quantity}`}
                            </Typography>
                        ))
                    ) : null}
                    <Divider />
        </div>
    );
};

ReporteVentasItem.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReporteVentasItem);