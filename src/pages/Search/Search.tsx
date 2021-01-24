import * as React from 'react';

import AppPage from '@components/structural/AppPage';

import './style.less';

interface State {
  loading: boolean;
}

class Search extends React.Component<Record<string, unknown>, State> {
  public state: State = {
    loading: true,
  };

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
  }

  public render() {
    return (
      <AppPage useLoader spinning={this.state.loading} antSpinner className="Search__Body">
        <p>Search Page</p>
      </AppPage>
    );
  }
}

export default Search;
