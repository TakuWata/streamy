import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderButton(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div style={{ margin: '.5rem' }}>
          <Link style={{ margin: '1rem' }} to={`/streams/edit/${stream.id}`}>
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`}>Delete</Link>
        </div>
      );
    } else {
      return null;
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='streams/new'>Create Stream</Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div key={stream.id}>
          <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
          <div>{stream.description}</div>
          <div>{this.renderButton(stream)}</div>
          <hr />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderList()}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
