import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Link, useNavigate } from "react-router-dom";
import CarouselWordCart from "./CarouselWordCart";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import repetitionPic from "../../assets/images/repetition-pic.png";
import { Endpoints } from "../../models/routes";
import { TWord } from "../CreateModule/WordCart";

type TMainContainerProps = {
  title?: string;
  _id?: string;
  words?: TWord[];
};

const MainContainer: React.FC<TMainContainerProps> = ({
  title,
  _id,
  words,
}) => {
  const navigate = useNavigate();

  return (
    <section className="singleModuleMainContainer">
      <header className="singleModuleMainContainer__header">
        <div
          style={{
            borderBottom: "0.0625rem solid #d8dee6",
            paddingBottom: "20px",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="button button--singleModuleGoBack"
          >
            <IoArrowBackOutline />
            Back
          </button>
        </div>
        <h1>{title}</h1>
      </header>
      <div className="wordsSliderContainerWrapper">
        <div className="testsCardsContainer">
          <Link
            to={`${Endpoints.Quiz}/${_id}`}
            className="testsCardsContainer__cardTest"
          >
            <img src={repetitionPic} alt="repetition-pic" />
            <div>
              <h4>Quiz</h4>
              <p>Solve quiz and learn faster!</p>
            </div>
          </Link>
        </div>
        <div className="wordsSliderContainer">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{
              type: "fraction",
            }}
            modules={[Pagination, Navigation]}
          >
            {words?.map((word, index) => {
              return (
                <SwiperSlide key={index}>
                  <CarouselWordCart
                    word={word.word}
                    translate={word.translate}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <p>Tap on cart to see translate</p>
        </div>
        <div className="testsCardsContainer">
          <Link
            to={`${Endpoints.Quiz}/${_id}`}
            className="testsCardsContainer__cardTest testsCardsContainer__cardTest__bottom"
          >
            <img src={repetitionPic} alt="repeat-pic" />
            <div>
              <h4>Quiz</h4>
              <p>Focus on your study module</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainContainer;
