import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class UploadButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            image: null
        }
    }

    handleChange = (e) => {
        this.setState({image: e.target.files[0]}, () => {
            this.props.onImageUpload(this.state.image);
        });
    };

    render(){
        const { classes } = this.props;

        return (
            <div>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={this.handleChange}
              />
              <label htmlFor="contained-button-file">
                <Button 
                    color='inherit'
                    variant="contained"
                    component="span"
                    className={classes.button}
                >
                  Subir imagen
                </Button>
              </label>
            </div>
          );
    }
}

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);