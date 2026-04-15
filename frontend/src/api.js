// const API = "https://prajwal1566.pythonanywhere.com"
//  const API = "https://127.0.0.1:5000"
// export default API;

const API =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:5000"
    : "https://prajwal1566.pythonanywhere.com";

export default API;