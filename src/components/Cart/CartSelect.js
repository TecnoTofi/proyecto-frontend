import React, { Component } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class CartSelect extends Component{

    state = {
        selected: this.props.quantity
    };

    handleChange = (event) => {
        this.setState({selected: event.target.value}, () => {
            this.props.onChange(this.props.productId, this.state.selected);
        })
    }
    
    render(){
        const { classes } = this.props;
        return(
            <FormControl className={classes.formControl}>
                <Select
                    value={this.state.selected}
                    onChange={this.handleChange}
                    displayEmpty
                    name='quantity'
                    className={classes.selectEmpty}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
          </FormControl>
        );
    }
}

CartSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CartSelect);
// export default CartSelect;