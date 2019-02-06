import React from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
    margen: {
        marginBottom: theme.spacing.unit * 3,
    }
});

function Home(props){

    return(
        <div className={props.classes.container}>
            <HomeIcon fontSize='large' />
            <Typography variant='h4' className={props.classes.margen}>Gestion de pedidos</Typography>
            <Typography variant='subtitle1'>Bienvenidos al nuevo sistema de gestion de pedidos, desarrollado como parte del proyecto integrador de la carrera Analista Programador de la Universidad ORT del Uruguay.</Typography>
        </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);