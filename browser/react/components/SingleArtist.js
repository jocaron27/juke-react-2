import React, { Component } from 'react';
import Songs from '../components/Songs';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import AllAlbums from './AllAlbums';

export default class SingleArtist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedArtist: {},
      albums: [],
      songs: []
    };
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId;
    const promises = [
    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(artist => {
        this.setState({ selectedArtist: artist })
      }),
    axios.get(`/api/artists/${artistId}/albums`)
    .then(res => res.data)
    .then(albums => {
    this.setState({ albums: albums })
    }),
    axios.get(`/api/artists/${artistId}/songs`)
    .then(res => res.data)
    .then(songs => {
      this.setState({ songs: songs })
    })]
    Promise.all(promises)
    .catch(console.error);
  }

  render () {
    console.log(this.state.selectedArtist)
    return (
        <div>
          <h3>{ this.state.selectedArtist.name }</h3>
          <ul className="nav nav-tabs">
            <li><Link to={`/artists/${this.state.selectedArtist.id}/albums`}>ALBUMS</Link></li>
            <li><Link to={`/artists/${this.state.selectedArtist.id}/songs`}>SONGS</Link></li>
          </ul>
          
          <Route path="/artists/:artistId/albums" render={
            (routeProps) => <AllAlbums albums={this.state.albums} />
          } />
          <Route path="/artists/:artistId/songs" render={
            (routeProps) => <Songs songs={this.state.songs} />
          } />
        </div>
      );
  }
}