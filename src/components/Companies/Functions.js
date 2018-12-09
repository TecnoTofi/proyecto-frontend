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

const getAllCompanies = async (url) => {
  let companias = await fetch(`${url}/api/company`)
                          .then(response => (
                            response.json()
                          ))
                          .then(data => {
                            let companias = data.map(comp => {
                              comp.imageUrl = `${url}/${comp.imagePath}`;
                              return comp;
                            });
                            // console.log('companias', companias);
                            return companias;
                            // this.setState({companies: companias});
                          })
                          .catch(err => console.log(err));
  return companias;
};

const getCompanyById = async (url, id) => {
  let compania = await fetch(`${url}/api/company/${id}`)
            .then(res => (
              res.json()
            ))
            .then(data => {
              return data;
            })
            .catch(err => console.log(`Error al buscar Company : ${err}`));
  return compania;
};


export default {
    getCompanyTypes,
    getCompanyCategories,
    getAllCompanies,
    getCompanyById
}