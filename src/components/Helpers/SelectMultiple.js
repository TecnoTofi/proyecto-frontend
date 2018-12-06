import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginRight: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 500+'%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultipleSelect extends React.Component {
  state = {
    type: [],
  };

  handleChange = event => {
    this.setState({ type: event.target.value }, () => {
        this.props.onChange(this.state.type);
    });
  };

  render() {
    const { classes } = this.props;

    let titulo = this.props.titulo ? this.props.titulo : this.props.flagType === 'productos' ? 'Categoria/s' : 'Rubro/s';

    return (
      <div className={classes.root}>
        <FormControl
          className={classes.formControl}
          fullWidth={this.props.flagForm}
          error={this.props.selectError ? true : false}
        >
          <InputLabel htmlFor="select-multiple-checkbox">{titulo}</InputLabel>
          <Select
            fullWidth
            multiple
            value={this.state.type}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value.id} label={value.name} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.props.content.map(type => (
              <MenuItem key={type.id} value={type}>
                <Checkbox checked={this.state.type.indexOf(type) > -1} />
                <ListItemText primary={type.name} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{this.props.selectError ? this.props.selectError : this.props.helper}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);