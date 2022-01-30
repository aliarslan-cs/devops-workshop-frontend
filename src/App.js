import React from 'react';
import axios from 'axios';
import List from './components/List';
import withListLoading from './components/withListLoading';
import FormAddName from './components/FormAddName';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      people: null,
    }
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  rerenderParentCallback() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ loading: true });
    const apiUrl = `http://174.138.11.59:32000/people`;
    axios.get(apiUrl).then((resp) => {
      const allPeople = resp.data;
      this.setState({ loading: false, people: allPeople });
    });
  }

  componentDidUpdate() {
    // if (this.state.loading !== true) {
    //   this.fetchData();
    // }
  }

  render() {
    const ListLoading = withListLoading(List);
    return (
      <>
        <FormAddName
          rerenderParentCallback={this.rerenderParentCallback} />
        <div className="row">
          <ListLoading
            isLoading={this.state.loading}
            people={this.state.people} />
        </div>
      </>
    );
  }
}

export default App;

// parts of code by Shedrack Akintayo
