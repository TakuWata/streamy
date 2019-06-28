import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  width: '4.5rem',
  height: '2.2rem',
  lineHeight: '2.2rem',
  fontSize: '12px',
  marginTop: '1rem',
  marginRight: '2rem',
  borderRadius: '.5rem',
  display: 'inline-block'
};
const cancelButtonStyle = {
  backgroundColor: 'black',
  color: 'white',
  width: '4.5rem',
  height: '2.2rem',
  lineHeight: '2.2rem',
  fontSize: '12px',
  marginTop: '1rem',
  borderRadius: '.5rem',
  display: 'inline-block',
  textDecoration: 'none'
};

const spanStyle = {
  display: 'inline-block',
  verticalAlign: 'middle'
};
class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          style={deleteButtonStyle}
        >
          Delete
        </button>
        <Link to='/' style={cancelButtonStyle}>
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete this stream with title ${
      this.props.stream.title
    }`;
  }

  render() {
    return (
      <div>
        Stream Delete
        <Modal
          title='Delete Stream'
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
