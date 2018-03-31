class NetworkService {

  makeAPIRequest = (query, options) => {
    return new Promise((resolve, reject) => {
      if (!query) {
        console.log('no query');
        reject("NO QUERY");
      }
      let fetch_options = {
        method: options.method,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      }
      if (!options.method) {
        fetch_options.method = 'get'
      }

      if (options.body) {
        fetch_options.body = JSON.stringify(options.body);
      }
      console.log('options.body', options.body);
      console.log('options', options);
      console.log('query == ', query);
      console.log('body == ', fetch_options.body);
      fetch(query, fetch_options).then(response => response.json())
        .then(responseJson => {
          console.log('responseJSON---- ', responseJson);
          return resolve(responseJson)
        }).catch(err => {
          console.log('error', err);
          return reject({err: err})
        })
    })
  }

  makeAPIGetRequest = (query, options) => {
    options = options || {};
    options.method = 'get';
    return this.makeAPIRequest(query,options);
  }

  makeAPIPostRequest = (query, options) => {
    options = options || {};
    options.method = 'post';
    return this.makeAPIRequest(query, options);
  }
}

module.exports = new NetworkService();
