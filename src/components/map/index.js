import React from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon,
  Listing
} from 'google-maps-react';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Map  google={this.props.google}
            zoom={14}
            style={{height: this.props.height, width: this.props.width}}
            initialCenter={{
              lat: 40.854885,
              lng: -88.081807
            }}
            zoom={14}
            onClick={this.MapClick}
            bounds=""
            onReady={this.MapReady}
            visible='true'
            onDragend={this.MapDragged}
            className='map-Component'>

            </Map>
    );
  }

  MapClick(mapProps, map, clickEvent) {
    alert("Map onClick()");
  }

  MapReady(mapProps, map) {
    alert("MapReady()");
  }
  MapDragged(mapProps, map) {
    alert("MapDragged()");
  }

  Markerclick(props, marker, e) {
    alert('Marker ' + marker.name + ' clicked()');
  }

  Markermouseover(props, marker, e) {
    alert("Marker " + marker.name + " onMouseover()");
  }

}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDUsm1Z_RYw3e6DMtM1L2kDHYtGR-bdy68')
})(MapContainer);
