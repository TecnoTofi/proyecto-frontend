const getTypes = async (url) => {
    let tipos = await fetch(`${url}/api/helper/type`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              return data.types;
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
                              return data.rubros;
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
                                return data.categories;
                                })
                                .catch(err => console.log(err));
    return categories;
}; 

export default {
    getTypes,
    getRubros,
    getCategories
}