const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
const url = "https://demo7993830.mockable.io/"; //Must be in a .env file when implementing to different environments

export const services = {
  getMinMaxValues: async () => {
    const res = await fetch(`${url}/getMinMaxValues`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
  getRangeValues: async () => {
    const res = await fetch(`${url}/getRangeValues`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return res;
  },
};
