import React from 'react';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

function Home(){
    return(
        <div>
            <Typography variant='h4'>Gestion de pedidos</Typography>
            <Typography variant='body1'>Bienvenidos al nuevo sistema de gestion de pedidos, desarrollado como parte del proyecto integrador de la carrera Analista Programador de la Universidad ORT del Uruguay.</Typography>
        </div>
    );
}

export default Home;