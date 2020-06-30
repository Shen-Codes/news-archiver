import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from '@material-ui/core';

import { doFetchStories } from '../actions/story';
import './searchstories.css';

class SearchStories extends Component {
   constructor(props) {
      super(props);

      this.state = {
         query: ''
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   onSubmit(event) {
      const { query } = this.state;
      if (query) {
         this.props.onFetchStories(query);

         this.setState({ query: '' });
      }

      event.preventDefault();
   }

   onChange(event) {
      const { value } = event.target;
      this.setState({
         query: value
      });
   }

   render() {
      return (
         <form onSubmit={this.onSubmit}>
            <Input
               className="search-input"
               type="text"
               fullWidth={false}
               value={this.state.query}
               onChange={this.onChange}
               placeholder="Search Hacker News"
            />
            <div className="search-button">
               <Button variant="contained" type="submit">
                  Search
               </Button>
            </div>
         </form>
      );
   }
}

const mapDispatchToProps = dispatch => ({
   onFetchStories: query => dispatch(doFetchStories(query))
});

export default connect(null, mapDispatchToProps)(SearchStories);
