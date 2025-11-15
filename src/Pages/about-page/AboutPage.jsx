import React, { useEffect } from 'react';

const AboutPage = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0, behavior: "smooth"
    })
  }, [])

  return (
    <div id="aboutPageContainer" style={{ backgroundColor: "#fafafa", padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="about_wrapper">

          {/* SECTION: ABOUT US */}
          <div id="aboutus" style={sectionStyle}>
            <h1 style={titleStyle}>About Us</h1>
            <p style={textStyle}>
              Is food your first and last love? Happily over stuffed? A born traveller and foodie?
              Of all the places that you visit, food forms an essential part of your itinerary.
              <br /><br />
              Allow us to take you on a journey so epic, that it would make you happy and help you relive your Golden days.
              Dil-o-cious extends it from delicious sweets of north India to hot spices of the South.
              Witness the journey of food from their place of origin to your dinner plate.
              <br /><br />
              But what can be more exciting than the food which elevates the level of fun and passion in you and your life?
              A smile. Yes, it is everything that can change the stressed you into a happy you and we present to you some
              of the food items that definitely bring smile on your face.
            </p>
          </div>

          {/* SECTION: WHO WE ARE */}
          <div id="whoweare" style={sectionStyle}>
            <h1 style={titleStyle}>Who We Are</h1>
            <p style={textStyle}>
              We are an exotic food delivery service which provides you the specialities of any place you can think of.
              It sources authentic food products from their native places.
              <br /><br />
              There are many Indian cities that boast foods found only there—Mumbai’s delicacies,
              Darjeeling tea aroma, or Rajasthan's Ghevar—don’t worry, we deliver it all.
              <br /><br />
              Open our website → choose your favourite delicacy → book → sit back → Boom!
              Delivered to your doorstep in 2–3 days, free of delivery cost.
            </p>
          </div>

          {/* SECTION: WHAT WE DO */}
          <div id="whatwedo" style={sectionStyle}>
            <h1 style={titleStyle}>What We Do</h1>
            <p style={textStyle}>
              Dil-o-cious profiles Indian cities famous for unique foods. Some are street foods,
              others are gourmet delicacies—but all are about taste.
              <br /><br />
              Food is holy. It's sharing. It's identity. It's honesty.
              And we bring that to your table!
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

// ----------------- Stylish Design -----------------
const sectionStyle = {
  background: "white",
  padding: "35px 40px",
  borderRadius: "16px",
  marginBottom: "40px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform .3s ease",
}

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#333",
  textTransform: "uppercase",
  letterSpacing: "1px"
}

const textStyle = {
  fontSize: "17px",
  color: "#555",
  lineHeight: "1.8",
  textAlign: "justify"
}

export default AboutPage;
