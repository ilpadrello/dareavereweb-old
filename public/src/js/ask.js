let defaultConfig = {
  method: "POST",
  headers: {
    Accept: "text/plain",
    "Content-Type": "application/json",
  },
};

function mergeObj(config) {
  let objToReturn = { ...defaultConfig, ...config };
}

let ask = {
  fetch: async function (path, body, config, errorCallBack) {
    let config = mergeObj(config);
    if (body) config.body = body;

    let rawResult = await fetch(path, config);
    if (rawResult.status === 200) {
      return rawResult;
    } else {
      console.log(rawResult.status);
    }
  },
  json: async function (path, body, config) {
    let response = await this.fetch(path, body, config);
    data = await response.json();
    return data;
  },
  text: async function (path, body, config) {
    let response = await this.fetch(path, body, config);
    data = await response.text();
    return data;
  },
};
