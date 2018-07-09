import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import "./article.css";

class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    topic: "",
    start: "",
    end: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ saved: res.data, topic:"", start:"", end:""}),
      )
      .catch(err => console.log(err));
  };

  saveArticle = (id, url) => {  
    this.loadArticles();
    const findArticleByUrl = this.state.saved.find((art) => art.url === url);
   
    if(findArticleByUrl===undefined){
      const findArticleByID = this.state.articles.find((art) => art._id === id);
      const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
      console.log("newSave: "+newSave.url);
      API.saveArticle(newSave)
         .then(this.loadArticles());
    }
    else{
      alert("Article already saved!!");
    }   
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.start && this.state.end) {     
      API.getRecipes(this.state.topic, this.state.start.replace(/-/g, ""), this.state.end.replace(/-/g, ""))
      .then(res =>this.setState({ articles: res.data.response.docs.slice(0,5) }),
       console.log("articles saved in articles array"))
      .catch(err => console.log(err));
    }
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
          <div className="ColDiv">
          <h1>Search</h1>
            <form>
              Article Topic:
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              Start Year:
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start Year"
                type="date"
              />
              End Year:
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Year (required)"
                type="date"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
            </div>
          </Col>
          <Col size="md-12">
          <div className="ColDiv">
          <h1>Results</h1>
          {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <p>{article.snippet}</p>                   
                    <button className="btn btn-danger float-right" onClick={() => this.saveArticle(article._id , article.web_url)}>
                      Save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
          </Col>
          <Col size="md-12">
          <div className="ColDiv">
          <h1>Saved Articles</h1>
          {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <ListItem key={article._id}>
                      <strong>
                        {article.title}
                      </strong>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
           </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
