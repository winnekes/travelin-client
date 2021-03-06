import React, { Component } from 'react';
import { getData } from '../../actions/dispatchHandler';
import { TRIPS_PATH, BASE_URL } from '../../constants';
import { slidesFetched } from '../../actions';
import ImageGallery from 'react-image-gallery';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import '../assets/styles/slideshow.css';

class SlideshowContainer extends Component {
    state = { newSlide: 0 };
    static defaultProps = {
        zoom: 14,
    };

    onSlide = newSlide => {
        this.setState({ newSlide });
        console.log(newSlide);
    };

    componentDidMount = () => {
        this.props.getData(
            `${TRIPS_PATH}/${this.props.match.params.id}/slides`,
            slidesFetched
        );
    };
    render() {
        const slides = this.props.slides;
        const trip = this.props.trip;
        return (
            <div className="slideshow-container">
                {trip && (
                    <>
                        <h1>{trip.tripTitle}</h1>
                        <h2>
                            <Moment format="DD/MM/YY">{trip.tripStart}</Moment>{' '}
                            to <Moment format="DD/MM/YY">{trip.tripEnd}</Moment>
                        </h2>
                    </>
                )}
                {slides && (
                    <div className="slide-container">
                        <div className="slideshow">
                            <ImageGallery
                                items={slides}
                                onSlide={this.onSlide}
                                showThumbnails={false}
                                showFullscreenButton={false}
                                disableArrowKeys={true}
                                slideInterval={7000}
                                autoPlay
                                showNav={false}
                            />

                            {slides && (
                                <div className="image-text">
                                    <h3>{slides[this.state.newSlide].title}</h3>
                                    <h4>
                                        <Moment format="DD/MM/YY HH:mm a">
                                            {slides[this.state.newSlide].date}
                                        </Moment>
                                    </h4>
                                </div>
                            )}
                        </div>

                        <div
                            className="background"
                            style={{
                                height: '100vh',
                                width: '100%',
                            }}
                        >
                            <GoogleMapReact
                                bootstrapURLKeys={{
                                    key:
                                        'AIzaSyDxTJbq2XdBuDML6j4ziSNGnqj8v8u1tBU',
                                }}
                                center={{
                                    lat: slides[this.state.newSlide].lat,
                                    lng: slides[this.state.newSlide].lng,
                                }}
                                defaultZoom={this.props.zoom}
                                options={{
                                    mapTypeControl: false,
                                    scaleControl: false,
                                    streetViewControl: false,
                                    rotateControl: false,
                                    fullscreenControl: false,
                                    mapTypeId: 'hybrid',
                                }}
                            ></GoogleMapReact>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state.slides.slides) {
        return {
            trip: state.slides,
            slides: state.slides.slides.map(slide => ({
                original: `${BASE_URL}${slide.url}`,
                thumbnail: `${BASE_URL}${slide.url}`,
                description: slide.note,
                ...slide,
            })),
        };
    }
};
export default connect(mapStateToProps, { getData })(SlideshowContainer);

/*
 */
