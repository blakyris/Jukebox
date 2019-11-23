import React from 'react';

class LibraryExplorer extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="d-flex flex-column flex-wrap item">
          <div className="cover" />
          <div className="d-flex flex-column info noselect">
            <p className="name noselect">{this.props.name}</p>
            <p className="artist noselect">{this.props.artist}</p>
          </div>
      </div>
    );
  }
  
}

export default LibraryExplorer;