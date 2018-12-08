const   getCompanyTypes = async (url) => {
    let tipos = await fetch(`${url}/api/company/type`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('tipos empresa', data);
                              return data;
                              // this.setState({companyTypes: data});
                            })
                            .catch(err => console.log(err));
    return tipos;
};

const getCompanyCategories = async (url) => {
    let categories = await fetch(`${url}/api/company/category`)
                            .then(response => (
                              response.json()
                            ))
                            .then(data => {
                              // console.log('categorias empresa', data);
                              return data;
                              // this.setState({companyCategories: data});
                            })
                            .catch(err => console.log(err));
    return categories;
};

export default {
    getCompanyTypes,
    getCompanyCategories
}