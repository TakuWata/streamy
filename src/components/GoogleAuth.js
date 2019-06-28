import React from 'react';
import { connect } from 'react-redux';
import { signInAction, signOutAction } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // 1. initialize
    window.gapi.load('client:auth2', () => {
      window.gapi.auth2
        .init({
          clientId:
            '765332415064-ku2epj2287cdvd9ghbhgfo2mncvorbak.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          // initializeが終了後、このarrow funcが実施される
          // 2. instanceをassign
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.authで、今後、auth instanceへアクセスできる。なんでここにthisがある？constじゃダメ？JS理解が不足してる。
          //this.setState({ isSignedIn: this.auth.isSignedIn.get() });

          //3. redux store内での状態をアップデート
          this.onAuthChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
          //これをやることで、リアルタイムで画面のログイン状態を変化できる
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signInAction(this.auth.currentUser.get().getId());
    } else {
      this.props.signOutAction();
    }
  };

  handleSignIn = () => {
    this.auth.signIn();
  };

  handleSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div>Loading</div>;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.handleSignOut} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return <button onClick={this.handleSignIn}>Sign in with Google</button>;
    }
  }
  render() {
    console.log(this.props);
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(
  mapStateToProps,
  { signInAction, signOutAction }
)(GoogleAuth);
