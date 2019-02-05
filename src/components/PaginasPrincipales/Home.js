import React from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
});

function Home(props){

    return(
        <div className={props.classes.container}>
            <Typography variant='h4'>Gestion de pedidos</Typography>
            <Typography variant='body1'>Bienvenidos al nuevo sistema de gestion de pedidos, desarrollado como parte del proyecto integrador de la carrera Analista Programador de la Universidad ORT del Uruguay.</Typography>
        </div>
    );
}

// export default Home;

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);