const getTypes = async (url) => {
    let tipos = await fetch(`${url}/api/helper/type`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('tipos empresa', data);
                              return data.types;
                              // this.setState({companyTypes: data});
                            })
                            .catch(err => console.log(err));
    return tipos;
};

const getRubros = async (url) => {
    let categories = await fetch(`${url}/api/helper/rubro`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('categorias empresa', data);
                              return data.rubros;
                              // this.setState({companyCategories: data});
                            })
                            .catch(err => console.log(err));
    return categories;
};

const getCategories = async (url) => {
    let categories = await fetch(`${url}/api/helper/category`)
                                .then(response => (
                                response.json()
                                ))
                                .then(data => {
                                // console.log('categorias productos', data);
                                return data.categories;
                                // this.setState({productCategories: data})
                                })
                                .catch(err => console.log(err));
    return categories;
}; 

export default {
    getTypes,
    getRubros,
    getCategories
}