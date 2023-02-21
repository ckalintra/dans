const axios = require('axios');

module.exports = async (params) => {
    const response = {
      status: 200,
      message: '',
      data: []
    }
    y
    if(!params?.id) {
      response.status = 400;
      response.message = 'Missing id';
    };


    let defaultRoute = 'http://dev3.dansmultipro.co.id/api/recruitment/positions/' + params.id
    
    const job = await axios.get(defaultRoute);

    response.data = job?.data ?? [];

    return response;
}