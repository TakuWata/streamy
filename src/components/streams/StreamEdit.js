import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    console.log(formValues);
    console.log(this.props.match.params.id);
    // formEdit actionをみると、idとformValuesをパラメーターとして取得することがわかる。
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm
            // initialValues={this.props.stream}
            // このままだと、不要なIDなどのあたいも含まれてしまうそのため以下のように変更
            initialValues={_.pick(this.props.stream, 'title', 'description')}
            // lodashのpickを使って、keyがtitleとdescriptionのものを抽出した。
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
