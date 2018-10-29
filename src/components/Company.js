import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Company = (props) => {
    return(
        <div>
            {props.company ? (
                <Card>
                    {/* <CardMedia
                        style={{height: 0, paddingTop: '56.25%'}}
                        component="img"
                        image={props.company.companyImage}
                        title={props.company.name}
                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {props.company.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' color='primary'>
                            Ver empresa
                        </Button>
                    </CardActions>
                </Card>
            ) : null }
        </div>
    );
};

export default Company;