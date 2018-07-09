import axios from "axios";

const api= {

  getArticles: function() {
    return axios.get("/api/articles");
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(articleObj) {
    return axios.post("/api/articles", articleObj);
  },
  getRecipes: function(topic, startYear, endYear) {
    const authKey = "569ecd8573a94881ab47111323f96650";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "&end_date=" + endYear;
    console.log(queryURL);
    return axios.get(queryURL);
  }
 
};

export default api;

//// developer.nytimes.com