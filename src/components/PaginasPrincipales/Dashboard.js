// import React from 'react';
// import 'typeface-roboto';
// import Typography from '@material-ui/core/Typography';

// function Dashboard(){
//     return(
//         <div>
//             <Typography variant='h4'>Dashboard</Typography>
//             <Typography variant='body1'>Aqui podran tener acceso rapido a visualizar y controlar su cuenta</Typography>
//         </div>
//     );
// }

// export default Dashboard;


import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, withSnackbar } from 'notistack';

class App extends React.Component {
  handleClick = () => {
    this.props.enqueueSnackbar('I love snacks.');
  };

  handleClickVariant = variant => () => {
    // variant could be success, error, warning or info
    this.props.enqueueSnackbar('This is a warning message!', { variant });
  };

  render() {
    return (
      <React.Fragment>
        {/* <Button onClick={this.handleClick}>Show snackbar</Button>
        <Button onClick={this.handleClickVariant('error')}>Show warning snackbar</Button> */}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const MyApp = withSnackbar(App);

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;