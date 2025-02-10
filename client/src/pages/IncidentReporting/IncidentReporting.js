import React from "react";
import policeImage from "../../assets/helpline/police.png";
import Mental from "../../assets/helpline/mental.png";
import Suicide from "../../assets/helpline/suicide.png";
import Pyscological from "../../assets/helpline/pyscological.png"
import IncidentReportinCard from "../../components/IncidentReportinCard";

const PoliceCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gradient-to-r from-[#ddd9d4] to-[#FBEABF]">
        <IncidentReportinCard
          image={policeImage}
          title="Police"
          tel="tel:+103"
          desc="Call 103 – 24 hour helpline for crime against women in Mumbai and the police will be there immediately to take action."
        />
        <IncidentReportinCard
          image={Mental}
          title="Mental Health Helpline: iCall"
          tel="tel:+9152987821 "
          desc="
iCall (TISS Mumbai) is a helpline offering emotional support and mental health services through trained counselors. Available 24/7"
        />
        <IncidentReportinCard
          image={Suicide}
          title="Suicide Prevention"
          tel="tel:+9820466726"
          desc="Aasra Suicide Prevention is a dedicated helpline offering 24/7 support for individuals experiencing mental health crises, including suicidal thoughts."
        />

        <IncidentReportinCard
          image={Pyscological}
          title="Medical and Psychological Abuse Reporting"
          tel="tel:+1091"
          desc="For any physical or mental abuse, dialing 1091 (Women in Distress Helpline) can connect you to necessary services​"
        />
       
      </div>
    
    </>
  );
};

export default PoliceCard;
