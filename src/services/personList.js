import axios from "axios";
export default {
  getListOfPersons() {
    return axios
      .get("https://randomuser.me/api/?results=5")
      .then(response => response.data);
  },
  getPersonImage(id, url) {
    return fetch(url)
        .then(res => {
          return res.blob();
        })
        .then(blob => {
          var img = URL.createObjectURL(blob);
          document.querySelector("#" + id).setAttribute("src", img);
        });
  }
};
