import React from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: 500+'%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    category: ''
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value}, () => {
      this.props.onChange(this.state.category);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
       
        <FormControl className={classes.formControl} error={this.props.selectError ? true : false}>
          <InputLabel htmlFor="type-helper">{this.props.label}</InputLabel>
          <Select
            name='category'
            value={this.state.category}
            onChange={this.handleChange}
            // helperText={this.props.selectError}
            // error={this.props.selectError ? true : false}
            input={<Input name="type" id="type-helper" />}
          >
            <MenuItem value="">
              <em>Seleccione</em>
            </MenuItem>
            {this.props.content.map(type => <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)}
          </Select>
          <FormHelperText>{this.props.selectError ? this.props.selectError : this.props.helper}</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);