import axios from "axios";
export default {
  getListOfPersons(number) {
    let url = "https://randomuser.me/api/?results=" + number;
    return axios
      .get(url)
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
