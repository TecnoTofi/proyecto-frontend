import React, { Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = ({
    root: {
        width: '100%',
        margin: 50+'px',
        overflowX: 'auto'
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
                            <Fragment>
                                <List dense={false}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={prod.imageName} src={prod.imageUrl} className={classes.avatar} />
                                        </ListItemAvatar>
                                    </ListItem>
                                </List>
                                <Typography variant='body1' key={prod.id}>
                                    {`${prod.name} x ${prod.quantity} - Total: $${prod.price * prod.quantity} - $${prod.price} la unidad`}
                                </Typography>
                            </Fragment>
                        ))
                    ) : null}
                    {props.transaction.packages ? (
                        props.transaction.packages.map(pack => (
                            <Typography variant='body1' key={pack.id}>
                            {`${pack.name} x ${pack.quantity} - Total: $${pack.price * pack.quantity} - $${pack.price} la unidad`}
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