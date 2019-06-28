import React from 'react';
import ReactDOM from 'react-dom';

const style = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.rootEl = document.getElementById('root');
  }
  render() {
    console.log(this.props);
    return ReactDOM.createPortal(
      <div
        //onClick={() => history.push('/')}
        // modalの外をクリックすると、/へ移動
        onClick={this.props.onDismiss}
        className='ui dimmer modals visible active'
        style={style}
      >
        <div
          onClick={e => e.stopPropagation()}
          // これを入れないと、modalの内側のボタン以外の部分をクリックしても、/へ移動してしまう。
          style={{
            position: 'fixed',
            padding: '2rem',
            width: '25rem',
            height: '10rem',
            backgroundColor: 'white',
            textAlign: 'center'
          }}
        >
          <div>
            <h2>{this.props.title}</h2>
          </div>
          <div>{this.props.content}</div>
          <div>{this.props.actions}</div>
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

export default Modal;
