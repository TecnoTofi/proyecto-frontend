import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Alert from './AlertDialog';
import ModificarProducto from './ModificarProducto'
import ModificarPaquete from '../Paquetes/ModificarPaquete';
import AjustePrecioCategoria from './AjustePrecioCategoria';
import TextField from '@material-ui/core/TextField';
import SelectMultiple from '../Helpers/SelectMultiple';
import { Typography } from '@material-ui/core';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'code', numeric: false, disablePadding: true, label: 'Codigo' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Nombre' },
  { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Precio' },
  { id: 'tipo', numeric: false, disablePadding: false, label: 'Tipo' },
  { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
  },
  texto: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    productos: [],
    products: [],
    categories: [],
    page: 0,
    rowsPerPage: 10,
    searchName: '',
    selectedCategory: [],
  };

    async componentWillMount(){
        let productos = await this.props.getProductos(this.props.company);
        let paquetes = await this.props.getPaquetes(this.props.company);
        let categories = await this.props.getCategories(this.props.getCategories);

        let listado = productos.concat(paquetes);
        
        this.setState({
            productos: listado,
            products: productos,
            categories
        });
    }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

    onSearchNameChange = (e) => {
        this.setState({
            searchName: e.target.value
        });
    };

    handleSelectCategories = (seleccionados) => {
        let selectedCategory = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({selectedCategory: selectedCategory});
    }

    handleDelete = async (id, esPackage) =>{
        let listado = [];
        if(esPackage) {
            let status = await this.props.eliminarPaquete(id);
            if(status === 200){
                listado = this.state.productos.filter(prod => {
                    if(!prod.esPackage) return prod;
                    else return prod.id !== id;
                });
                this.setState({productos: listado});
            }
        }
        else{
            let status = await this.props.eliminarProducto(id);
            if(status === 200){
                listado = this.state.productos.filter(prod => {
                    if(prod.esPackage) return prod;
                    else return prod.id !== id;
                });
                this.setState({productos: listado});
            }
        }
    }


    handleEdit = (product, pos) => {
        let listado = this.state.productos;
        listado[pos] = product;
        this.setState({ productos: listado });
    }

  render() {
    const { classes } = this.props;
    const { productos, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, productos.length - page * rowsPerPage);

    let filteredList = this.state.productos.filter((item) => {
        return item.name.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1;
    });

    if(this.state.selectedCategory.length > 0){
        filteredList = filteredList.filter(item => {
            let res = false;
            let i = 0;
            let counter = 0;
            while(i<item.categories.length){
                if(this.state.selectedCategory.includes(item.categories[i].id)){
                    counter++;
                }
                i++;
            }
            if(counter > 0) res = true;
            return res;
        });
    }

    return (
        <Fragment>
            {filteredList.length === 0 ? (
              <Typography variant='h6' className={classes.texto}>
                Aun no tiene productos cargados.
              </Typography>
            ) : (
              <Fragment>
                    <div className={classes.container}>
                    <div>
                        <TextField
                            className={classes.textField}
                            name='searchName'
                            placeholder='Nombre del producto'
                            onChange={this.onSearchNameChange}
                        />
                        </div>
                        <div>
                        <SelectMultiple
                            flagType={this.props.flag}
                            flagForm={false}
                            content={this.state.categories}
                            onChange={this.handleSelectCategories}
                        />
                        </div>
                        <div>
                        <AjustePrecioCategoria categories={this.state.categories} ajustarPrecioCategoria={this.props.ajustarPrecioCategoria} />
                        </div>
                    </div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={filteredList.length}
                        />
                        <TableBody>
                        {stableSort(filteredList, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((n, indice) => {
                            const isSelected = this.isSelected(n.id);
                            return (
                                <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={n.id}
                                selected={isSelected}
                                >
                                <TableCell padding="checkbox">
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    {n.code}
                                </TableCell>
                                <TableCell align="right">{n.name}</TableCell>
                                <TableCell align="right">{n.stock}</TableCell>
                                <TableCell align="right">${n.price}</TableCell>
                                <TableCell align="right">{n.esPackage ? 'Paquete' : 'Producto'}</TableCell>
                                <TableCell>
                                  {/* <div> */}
                                    {!n.esPackage ?
                                        <ModificarProducto
                                            // buttonClass={classes.button}
                                            product={n}
                                            categories={this.state.categories}
                                            modificar={this.props.modificarProducto}
                                            actualizarLista={this.handleEdit}
                                            posicion={indice}
                                        />
                                        :
                                        <ModificarPaquete
                                            // buttonClass={classes.button}
                                            products={this.state.products}
                                            categories={this.state.categories}
                                            modificarPaquete={this.props.modificarPaquete}
                                            actualizarLista={this.handleEdit}
                                            posicion={indice}
                                            package={n}
                                            enqueueSnackbar={this.props.enqueueSnackbar}
                                        /> 
                                    }
                                    <Alert productId={n.id} esPackage={n.esPackage} eliminar={this.handleDelete} />
                                  {/* </div> */}
                                </TableCell>
                                </TableRow>
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </div>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                </Fragment>
            ) }
      </Fragment>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);