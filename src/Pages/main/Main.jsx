import React from 'react';
import '../../App.css';
import '../main/Main.css';
import Slider from "react-slick";
import testimonial from '../../Assests/data/Testimonials.json';
import Card from '../../Components/Card';
import About from '../../Components/about/About';
import TopPicks from '../../Components/TopPicks';

// Images
import ghewar from '../../Assests/images/ghewar.webp';
import hyderabad from '../../Assests/images/hyderabad.webp';
import kolkata from '../../Assests/images/kolkata.webp';
import mysore_pak from '../../Assests/images/mysore_pak.webp';
import ooty from '../../Assests/images/ooty.webp';
import rajasthan from '../../Assests/images/rajasthan.webp';

const Main = () => {

  // For Testimonial Slider
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  // For Above the fold Slider
  const settings1 = {
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2500,
    arrows: true,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  // DARK MODE detector that updates LIVE
  const [isDark, setIsDark] = React.useState(
    typeof document !== "undefined" &&
    document.body.classList.contains("dark")
  );

  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const update = () => {
      setIsDark(document.body.classList.contains("dark"));
    };

    // observe body class for live updates
    const observer = new MutationObserver(() => update());
    observer.observe(document.body, { attributes: true });

    update();
    return () => observer.disconnect();
  }, []);

  // Main container text color
  const mainContainerStyle = {
    color: isDark ? "#e6eef8" : "#111827",
    transition: "color 0.25s ease"
  };

  // Testimonial heading
  const testimonialHeadingStyle = {
    color: isDark ? "#e6eef8" : "#111827",
    fontSize: "3.2rem",
    fontWeight: 800,
    textAlign: "center",
    margin: "2.8rem 0",
    letterSpacing: "0.02em",
    transition: "color 0.25s ease"
  };

  // Inject CSS override to ensure ALL headings become visible
  React.useEffect(() => {
    const primary = isDark ? "#e6eef8" : "#111827";
    const secondary = isDark ? "#9aa6bf" : "#6b7280";

    const styleId = "main-dark-fix";
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.innerHTML = `
      #mainContainer h1,
      #mainContainer h2,
      #mainContainer h3,
      #mainContainer .topPicksHeading,
      #mainContainer .testimonial-title {
        color: ${primary} !important;
        opacity: 1 !important;
      }

      #mainContainer p,
      #mainContainer span,
      #mainContainer h4,
      #mainContainer h5 {
        color: ${secondary} !important;
      }
    `;
  }, [isDark]);

  return (
    <div id="mainContainer" style={mainContainerStyle}>

      {/* Carousel Container */}
      <div id="carouselMain">
        <Slider {...settings1}>
          <div><img src={ghewar} alt="ghewar" width="100%" /></div>
          <div><img src={hyderabad} alt="hyderabad" width="100%" /></div>
          <div><img src={kolkata} alt="kolkata" width="100%" /></div>
          <div><img src={mysore_pak} alt="mysore-pak" width="100%" /></div>
          <div><img src={ooty} alt="ooty" width="100%" /></div>
          <div><img src={rajasthan} alt="rajasthan" width="100%" /></div>
        </Slider>
      </div>

      {/* Top Picks */}
      <TopPicks />

      {/* Testimonials */}
      <div id="testimonials">
        <h1 style={testimonialHeadingStyle} className="testimonial-title">
          CUSTOMER'S SPEAK
        </h1>

        <div id="testimonialSlider">
          <Slider {...settings}>
            <div><Card val={testimonial[0]} /></div>
            <div><Card val={testimonial[1]} /></div>
            <div><Card val={testimonial[2]} /></div>
            <div><Card val={testimonial[3]} /></div>
            <div><Card val={testimonial[4]} /></div>
          </Slider>
        </div>
      </div>

      {/* About */}
      <About />

    </div>
  );
};

export default Main;
