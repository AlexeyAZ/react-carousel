import React, { Component } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import theme from './theme';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const media = theme.main.media;

const CarouselWrapper = styled(Slider)`
  padding-left: 50px;
  padding-right: 50px;

  .slick-track {
    &:focus {
      outline: none;
    }
  }
  
  .slick-arrow {
    transform: translateY(-50%) scaleY(1.3);

    &.slick-prev,
    &.slick-next {
      height: 30px;
      width: 25px;

      &:before {
        content: '';
        border-top: 2px solid rgba(0,0,0,0.4);
        border-left: 2px solid rgba(0,0,0,0.4);
        display: block;
        height: 20px;
        width: 20px;
      }
    }

    &.slick-prev {
      left: 20px;

      &:before {
        transform: rotate(-45deg);
      }
    }

    &.slick-next {
      
      right: 20px;

      &:before {
        transform: rotate(135deg);
      }
    }
  }

  .slick-slide {
    padding: 10px;

    div {

      &:focus {
        outline: none;
      }
    }

    @media (max-width: ${props => props.theme.media.mobile_s + 'px'}) {
      padding: 0;
    }
  }
`;

const CarouselItem = styled.div`
  background-color: white;
  padding: 20px 10px;
`;

const CarouselImg = styled.div`
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding-bottom: 70%;
  position: relative;
  width: 50%;
`;

const CarouselImgInner = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const CarouselImgSpinner = styled.div`
  animation: spinner 3s infinite;
  border-radius: 50%;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 30px;
  width: 30px;

  @keyframes spinner {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const CarouselImgHelper = styled.img`
  visibility: hidden;
  overflow: hidden;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CustomerOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProductInfo = styled.p`
  text-align: center;
`;

const StarsWrapper = styled.div`
  position: relative;
`;

const StarsContainer = styled.div`
  display: flex;
`;

const StarsLine = styled.div`
  background-color: #388dce;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.rate ? (props.rate * 100 / 5).toFixed(1) + '%' : 0};
`;

const StarsImageWrapper = styled.div`
  background-color: rgba(0,0,0,0.1);
  display: flex;
  overflow: hidden;
  position: relative;
  height: 16px;
  width: 16px;
`;

const StarsImage = styled.div`
  transform: translate(-50%, -50%);
  background-color: transparent;
  box-sizing: content-box;
  border: 10px solid white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 10px;
  width: 10px;
`;

const Delimiter = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const Link = styled.a`
  transition: 0.3s ease;
  color: ${props => props.theme.colors.blue};

  &:hover {
    color: ${props => props.theme.colors.blueDark};
  }
`;

const Rating = (rate) => {
  var stars = [];
  for (var i = 0; i < 5; i++) {
    stars.push(<StarsImageWrapper key={`star_${i}`}><StarsImage /></StarsImageWrapper>)
  }

  return <StarsWrapper><StarsLine {...rate}/><StarsContainer>{stars}</StarsContainer></StarsWrapper>;
};

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }

    this.imageLoad = this.imageLoad.bind(this);
  }

  componentDidMount() {
    fetch('data.json')
      .then(res => res.json())
      .then(
        (result) => {
          const data = result.map(item => {item.load = false; return item});

          this.setState({
            data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  imageLoad (index, e) {
    this.setState((prevState, props) => {
      const newState = prevState.data[index].load = true;

      return newState;
    });
  }

  render() {
    const slides = this.state.data.map((item, index) => {

      return (
        <CarouselItem index={index} key={index}>
          <CarouselImg>

            {item.load ? 
              <CarouselImgInner style={{ backgroundImage: `url(${item.img.url})` }}></CarouselImgInner> :
              <CarouselImgSpinner />
            }

            <CarouselImgHelper onLoad={this.imageLoad.bind(this, index)} src={item.img.url} alt='' />
          </CarouselImg>

          <CustomerOptions>
            <Rating rate={item.rate}/>
            <Delimiter>|</Delimiter>
            <Link href="">Отзывы: {item.reviews}</Link>
          </CustomerOptions>

          <ProductInfo>
            <Link href={item.href}>{item.name}</Link>
          </ProductInfo>
          

          <ProductActions>
            <div><strong>{item.price} <span>{item.currency}</span></strong></div>
            <Link href="">BUY</Link>
          </ProductActions>
        </CarouselItem>
      )
    });

    const settings = {
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: media.tablet,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: media.mobile,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: media.mobile_s,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    
    return (
      <div>
        <CarouselWrapper {...settings}>
          {slides}
        </CarouselWrapper>
      </div>
    );
  }
}