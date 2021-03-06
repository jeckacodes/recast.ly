import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import YOUTUBE_API_KEY from '../config/youtube.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {videos: exampleVideoData, toPlay: exampleVideoData[0]};
    // this.state = {videos: [], toPlay: {}}; //PROBLEM
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(video) {
    this.setState({toPlay: video});
  }
  componentDidMount() {
    this.getYouTubeVideos('cute kittens');
  }
  getYouTubeVideos(query) {
    var options = {
      key: YOUTUBE_API_KEY,
      q: query,
    };
    this.props.searchYouTube(options, (videos) => { this.setState({videos: videos, toPlay: videos[0]}); });
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
          </div>
        </nav>

        <div className="row">
          <div className="col-md-7">
            <div><h5><VideoPlayer video={this.state.toPlay} /></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><VideoList videos={this.state.videos} callback={this.handleClick}/></h5></div>
          </div>
        </div>
      </div>
    );
  }
}



// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;