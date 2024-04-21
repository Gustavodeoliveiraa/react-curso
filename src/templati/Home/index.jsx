import './style.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state

    const postAndPhotos = await loadPosts()
    this.setState({
      posts: postAndPhotos.slice(page, postPerPage),
      allPosts: postAndPhotos
    })
  }

  loadMorePosts= () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postPerPage
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPage)

    posts.push(...nextPost)

    this.setState({posts, page:nextPage})
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value})
  }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length

    const  filteredPosts = !!searchValue ? allPosts.filter(post=> {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    }): posts

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <>
            <h1>Search value: {searchValue }</h1> <br />
            </>
          )}

          <TextInput
            searchValue={searchValue} handleChange={this.handleChange} 
          />
      </div>

        {filteredPosts.length >0 ? <Posts posts={filteredPosts}/> : <h1> Post with title: "{searchValue}" not found</h1> }

        {!searchValue && (
          <Button
          disabled={noMorePosts} 
          onClick= {this.loadMorePosts} 
          text='Load more posts' />
        )}

      </section>
    )
  }
}

export default Home;
