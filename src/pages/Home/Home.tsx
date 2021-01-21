import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { FormComponentProps, WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';
import { Button, Input, message as AntMessage, Row } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';

import Logo from '@components/icon/Logo';
import AppPage from '@components/structural/AppPage';
import Logger from '@logger';

import './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

export interface HomeProps {
  form: WrappedFormUtils<any>;
}

type AllProps = HomeProps & FormComponentProps;

@observer
class Home extends React.Component<AllProps> {
  private onSendClick = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields();
        Logger.log(`Sending Message: ${values.message}`);
        AntMessage.success('Message Sent!');
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <AppPage useLoader spinning={false} antSpinner className="Home__Body">
        <section className="Home__Container">
          <section className="Home__Content">
            <section className="Logo__Container">
              <Logo />
            </section>
            <Form layout="vertical">
              <FormItem>
                {getFieldDecorator('message', {
                  rules: [
                    {
                      required: true,
                      message: 'Please provide a message',
                    },
                  ],
                })(<TextArea style={{ width: '300px' }} rows={8} placeholder="Enter a message" />)}
              </FormItem>

              <FormItem>
                <Row>
                  <Button style={{ width: '100%' }} type="primary" onClick={this.onSendClick}>
                    Send
                  </Button>
                </Row>
              </FormItem>
            </Form>
          </section>
        </section>
      </AppPage>
    );
  }
}

export default Form.create<HomeProps>()(Home);
