import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError(formProps) {
    if (formProps.meta.touched && formProps.meta.error) {
      return <div>{formProps.meta.error}</div>;
    }
  }
  renderInput = formProps => {
    return (
      <div>
        <label>{formProps.label}</label>
        <input
          //   onChange={formProps.input.onChange}
          //   value={formProps.input.value}
          // shortcutで以下のようにできる。propsのinputからpropertyを取得し、input elementのpropertyへ転写
          {...formProps.input}
          autoComplete='off'
        />
        <div>{this.renderError(formProps)}</div>
        {/* thisはunknown。なぜなら、renderInputがそもそもFieldComponentでthisで呼ばれるものだから */}
      </div>
    );
  };

  onSubmit = formValues => {
    // preventDefaultはreduxがやってくれるので不要
    // action creatorで、createの操作を実施。
    //this.props.createStream(formValues);

    //after refuctoring, onSubmit will be passed from component as porps.
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name='title' component={this.renderInput} label='Enter Title' />
        {/* Field componentの認識できないprops、例えばlabelを通すと、renderInput関数にpassされる。
        このようにしてrenderInput関数をcustomizeできる。  */}
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />

        <button>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    // redux formは、FIeld componentのname propertyと一致するエラーを探す
    // FieldのformPropsのmeta.errorに収納される。
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
