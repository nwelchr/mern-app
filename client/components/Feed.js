import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FetchingModal from './FetchingModal';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(60);
const itemHorizontalMargin = wp(40);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, doneFetching: false };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ doneFetching: true }), 2000);
  }

  renderItem({ item, index }) {
    const { name, blurb, offering, seeking, pictureUrl } = item;
    return (
      <View
        style={{
          width: viewportWidth * 0.75,
          transform: [
            { translateX: viewportWidth / 2 - (viewportWidth * 0.75) / 2 }
          ],
          justifyContent: 'center'
        }}>
        <Card
          style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#ccc',
            padding: 0,
            overflow: 'hidden'
          }}>
          <CardSection
            style={{
              backgroundColor: 'transparent',
              padding: 0
            }}>
            <View
              style={{
                flex: 1,
                height: 180
              }}>
              <Image
                style={{
                  flex: 1
                }}
                source={{ uri: pictureUrl }}
              />
            </View>
          </CardSection>
          <CardSection
            style={{
              padding: 5,
              paddingLeft: 20,
              paddingBottom: 10,
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
            <Text style={styles.nameStyle}>{name}</Text>
            <Text style={styles.textStyle}>{blurb}</Text>
            <Text> </Text>
            <Text style={[styles.textStyle, styles.titleStyle]}>
              Can offer:
            </Text>
            {offering.map((offer, idx) => {
              const offerSplice =
                offer.length > 35 ? `${offer.substring(0, 35)}...` : offer;
              return (
                <Text key={idx} style={styles.textStyle}>
                  {offerSplice}
                </Text>
              );
            })}
            <Text> </Text>
            <Text style={[styles.textStyle, styles.titleStyle]}>
              Looking for:
            </Text>
            {seeking.map((seek, idx) => {
              const seekSplice =
                seek.length > 35 ? `${seek.substring(0, 35)}...` : seek;
              return (
                <Text key={idx} style={styles.textStyle}>
                  {seekSplice}
                </Text>
              );
            })}
          </CardSection>
        </Card>
      </View>
    );
  }

  render() {
    const { activeSlide, doneFetching } = this.state;

    const notDoneFetching = !doneFetching ? <FetchingModal /> : null;

    const data = Object.values(this.props.users);
    console.log(activeSlide);
    return (
      <Fragment>
        {notDoneFetching}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flex: 4,
            padding: 20
          }}>
          <View style={{ flex: 4 }}>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={data}
              renderItem={this.renderItem.bind(this)}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
          </View>
          <Card style={{ flex: 1, width: '80%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TouchableOpacity style={styles.approveButton}>
                <Icon
                  style={{ position: 'absolute', top: -8 }}
                  name="ios-close-outline"
                  size={90}
                  color="#ED3B6D"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveButton}>
                <Icon
                  style={{ position: 'absolute', top: 14 }}
                  name="md-heart"
                  size={50}
                  color="#23AF7C"
                />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  nameStyle: {
    textAlign: 'left',
    fontFamily: 'HelveticaNeue',
    letterSpacing: 0.3,
    fontWeight: '500',
    fontSize: 20,
    color: '#222',
    margin: 2
  },
  textStyle: {
    textAlign: 'left',
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    letterSpacing: 0.5,
    fontSize: 12,
    color: '#222',
    margin: 2
  },
  approveButton: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 6,
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  titleStyle: {
    fontWeight: '400'
  }
});

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Feed);
