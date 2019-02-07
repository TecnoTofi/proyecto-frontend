import React from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core/';
import BackIcon from '@material-ui/icons/ArrowBack';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    container: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
    margen: {
        marginBottom: theme.spacing.unit * 3,
    }
});

function NotFound(props){

    const volverAtras = () => {
        history.goBack();
    }

    return(
        <div className={props.classes.container}>
            <Typography variant='h4' className={props.classes.margen}>404 No encontrado</Typography>
            <Typography variant='subtitle1'>Este sitio no fue encontrado.</Typography>
            <Button onClick={volverAtras}>
                <BackIcon />
                Volver
            </Button>
        </div>
    );
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(NotFound);