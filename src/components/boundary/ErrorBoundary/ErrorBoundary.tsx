import { Button, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RouteNames } from '@enums/RouteNames';
import { RouterStore } from '@store/RouterStore';

import errorImage from '@assets/images/png/error.png';

import './style.less';

export interface ErrorBoundaryProps {
  children?: any;
  routerStore?: RouterStore;
}

interface State {
  hasError: boolean;
}

@inject('routerStore')
@observer
class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  };

  public componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  private onHomeClick = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (this.props.routerStore) {
      const { router } = this.props.routerStore;
      router.navigate(RouteNames.HOME);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <section className="Error__Main">
          <Card
            className="Error__Card"
            style={{ marginTop: 40, width: 800 }}
            bordered={false}
            cover={<img className="Image__Error__Main" src={errorImage} alt="Error" />}
          >
            <h1 className="Error__Title">Oops</h1>
            <h1 className="Error__Message">
              Something went wrong, please navigate back to the home page!
            </h1>
            <br />
            <Button danger className="Error__Button" size="large" onClick={this.onHomeClick}>
              Home
            </Button>
          </Card>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
