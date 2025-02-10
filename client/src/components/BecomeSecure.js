import React from "react";

const BecomeSecure = () => {
  return (
    <>
      <h2 className="text-center text-base/7 font-semibold text-indigo-600 pt-20">
        Know the steps to become secure
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-[#FAA845] sm:text-5xl">
        Become Secure
      </p>
      <div className="timeline mt-4">
        <div className="timeline-main">
          <div className="timeline-wrap">
            <div className="timeline-card">
              <div className="timeline-card-wrap">
                <div className="card-head-wrap">
                  <h2 className="timeline-card-head">
                    1. Register on the Website
                  </h2>
                </div>
                <p className="timeline-card-text">
                  Visit the website and create your account by entering your
                  basic details, such as name, email, and phone number.
                </p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-card-wrap">
                <div className="card-head-wrap">
                  <h2 className="timeline-card-head">
                    2. Set Up Emergency Contacts
                  </h2>
                </div>
                <p className="timeline-card-text">
                  Add trusted contacts (family, friends, or authorities) who
                  will be alerted in case of an emergency.
                </p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-card-wrap">
                <div className="card-head-wrap">
                  <h2 className="timeline-card-head">
                    3. Send SOS with Live Location
                  </h2>
                </div>
                <p className="timeline-card-text">
                  In an emergency, tap the SOS button to send an instant alert
                  along with your real-time location to your emergency contacts
                  and local authorities.
                </p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-card-wrap">
                <div className="card-head-wrap">
                  <h2 className="timeline-card-head">4. Track Live Location</h2>
                </div>
                <p className="timeline-card-text">
                  our live location is continuously updated, allowing your
                  trusted contacts to track your whereabouts and ensure your
                  safety.
                </p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-card-wrap">
                <div className="card-head-wrap">
                  <h2 className="timeline-card-head">
                    5. Nearby Police Stations & Hospitals
                  </h2>
                </div>
                <p className="timeline-card-text">
                  Quickly find the nearest police stations and hospitals using
                  the app’s built-in directory, ensuring immediate access to
                  help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeSecure;
