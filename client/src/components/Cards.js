import React from "react";

const Cards = () => {
  return (
    <>
      {" "}
      <h2 className="text-center text-base/7 font-semibold text-indigo-600 mt-4">
        Essential Features
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-xl font-medium tracking-tight text-[#FAA845] sm:text-4xl">
        Your Safety, Your Strength
      </p>
      <div className="cardsContainer">
        <div className="cards">
          <a className="cards__item" href="#">
            <span className="cards__date">1. Emergency Alerts:</span>
            <h3 className="cards__title">
              In an emergency situation, a woman can quickly send an alert to
              her pre-selected contacts and nearby authorities, providing them
              with her location and details of the incident.
            </h3>
            <span className="cards__more">Read More</span>
          </a>
          <a className="cards__item" href="#">
            <span className="cards__date">2. Location Tracking:</span>
            <h3 className="cards__title">
              A woman going for a walk or traveling to an unknown place can
              share her location with a trusted friend or family member,
              ensuring someone is aware of her whereabouts at all times.
            </h3>
            <span className="cards__more">Read More</span>
          </a>
          <a className="cards__item" href="#">
            <span className="cards__date">3. Incident Reporting:</span>
            <h3 className="cards__title">
              After experiencing or witnessing an incident of harassment in
              public, the user can quickly file a report through the app,
              notifying the appropriate parties without drawing attention to
              herself.
            </h3>
            <span className="cards__more">Read More</span>
          </a>
          <a className="cards__item" href="#">
            <span className="cards__date">4. Educational Content:</span>
            <h3 className="cards__title">
              A woman can read articles about recognizing signs of emotional
              abuse, understanding her legal rights in her country, or learning
              about mental health care to better cope with everyday challenges.
            </h3>
            <span className="cards__more">Read More</span>
          </a>
          <a className="cards__item" href="#">
            <span className="cards__date">5. Workshops for Women:</span>
            <h3 className="cards__title">
              A woman can attend a self-defense workshop to learn how to protect
              herself in various situations or participate in a mental wellness
              session to manage stress and build emotional resilience.{" "}
            </h3>
            <span className="cards__more">Read More</span>
          </a>
          <a className="cards__item" href="#">
            <span className="cards__date">Job Opportunities for Women:</span>
            <h3 className="cards__title">
              A woman can browse job listings, apply for remote work
              opportunities, and receive mentorship advice to navigate her
              career path confidently.
            </h3>
            <span className="cards__more">Read More</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Cards;
