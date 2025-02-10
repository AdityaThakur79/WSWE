import React, { useState, useEffect } from "react";

const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button
      onClick={handleInstall}
      className="px-4 py-2 bg-[#FAA845] text-white rounded-md mt-4"
    >
      Add to Home Screen
    </button>
  );
};

export default AddToHomeScreen;
