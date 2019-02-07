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
                            return companias;
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
              data.imageUrl = `${url}/${data.imagePath}`;
              return data;
            })
            .catch(err => console.log(`Error al buscar Company : ${err}`));
  return compania;
};

export default {
    getAllCompanies,
    getCompanyById
}