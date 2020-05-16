import React from "react";
// import HomeContainer from './Container/HomeContainer.jsx';
import { connect } from 'react-redux';
import { getGalleryInfo, filterDimension } from './actions/index';
import { GalleryComponent } from './Component/GalleryComponent.jsx';

const App = props => {
  return (
    <>
      <div className='gallery'>
        <GalleryComponent {...props} />
      </div>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    gallery: state.gallery
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getGalleryInfo: (limit, offSet, endingUrl) => dispatch(getGalleryInfo(limit, offSet, endingUrl)),
    filterDimension: (dimension) => dispatch(filterDimension(dimension))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
