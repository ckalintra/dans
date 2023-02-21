const axios = require('axios');

module.exports = async (query) => {
    const response = {
      status: 200,
      message: '',
      data: []
    }

    const queries = [];

    if(query.description) queries.push({ key: 'description', value: query.description })
    if(query.location) queries.push({ key: 'location', value: query.location })
    if(query.full_time) queries.push({ key: 'full_time', value: query.full_time })
    if(query.page) queries.push({ key: 'page', value: query.page })

    let makeQuery = '';

    if(queries.length > 0) {
      queries.forEach((q, index) => {
        if(index === 0) {
          makeQuery+=`?${q.key}=${q.value}`
        } else {
          makeQuery+=`&${q.key}=${q.value}`
        }
      })
    }

    let defaultRoute = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json' + makeQuery
    
    const jobs = await axios.get(defaultRoute);

    response.data = jobs?.data ?? [];

    return response;
}