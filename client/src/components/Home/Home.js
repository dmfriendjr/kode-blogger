import React, {Component} from "react";
import "./Home.css";
import Carousel from '../Carousel/Carousel.js';
import { Link, Redirect } from 'react-router-dom';
import PostListItem from '../PostListItem/PostListItem';
import postApi from '../../utils/postAPI';


class Home extends Component {
  state = { notes: [],
    redirect: ''
  }

  componentDidMount() {
    postApi.getLastPosts(10).then(res => {
      if (res.data) {
        this.setState({notes: res.data.map(note => 
          {
            return {
              id: note.id, 
              author: note.author,
              title: note.title, 
            }
          })
        });
      }
    });
  }

  viewPost = (id) => {
    this.setState({redirect: <Redirect to={`/posts/${id}`} /> })
  }

  getAllPosts = () => {
    this.setState({redirect: <Redirect to={`posts/all`} />})
  }


  render() {
    return (
      <div className="home">
      {this.state.redirect ? this.state.redirect : ''}
        {/* Home content here...
        <Carousel /> */}
        <div className="recent-post">
          <h2><span id="recent-post-title">recent</span><span id="recent-post-title-second">Posts</span><span id="recent-post-curly">&#123;</span></h2>
        <div>
        {this.state.notes.map(note => {
          return (
            <PostListItem key={note.id} {...note}>
            <div className="text-center"><button className="btn btn-outline-dark" type="button" onClick={() => this.viewPost(note.id)}>View Post</button></div>
            </PostListItem>
          );
        })}
        
      </div>
      </div>
      <h2><span id="recent-post-curly-end">&#125;</span></h2>
      <div className="text-center"><button className="btn btn-outline-dark" type="button" onClick={() => this.getAllPosts()}>All Posts</button></div>
      </div>
    )
  }
}

export default Home;
