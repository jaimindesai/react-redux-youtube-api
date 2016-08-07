import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list'
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCLmTZjgr_fkkXjXYSI9K-N5t_K_n_dk-k';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos:[],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key:API_KEY,term:term},(videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      });
    });

  }
  render(){
    const videoSearch =_.debounce((term) => { this.videoSearch(term)},1000);
    return (
      <div>
      <SearchBar onSearchTermChange={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
      onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
      videos = {this.state.videos} />
      </div>
    );
  }
}



ReactDOM.render(<App />,document.querySelector('.container'));
