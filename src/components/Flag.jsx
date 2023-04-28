import React, { useState, useEffect, useRef } from "react";
import { CircleFlag } from "react-circle-flags";

function Flag() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(
    localStorage.getItem("selectedFlag") || "Lebanon"
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const EgyptianFlag = () => <CircleFlag countryCode="eg" height="35" />;
  const LebaneseFlag = () => (
    <CircleFlag
      countryCode="lb"
      height="35"
      onClick={handleToggle}
    />
  );

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (!localStorage.getItem("selectedFlag")) {
      localStorage.setItem("selectedFlag", "Lebanon");
    }
  }, []);

  return (
    <div className="dropdown-flag" onClick={() => setIsOpen(!isOpen)}>
      {selectedFlag === "Lebanon" ? (
        <LebaneseFlag />
      ) : (
        <EgyptianFlag />
      )}

      {isOpen && (
        <div className="dropdown-content-flag show" ref={dropdownRef}>
          <a
            href="/lb"
            onClick={() => {
              setSelectedFlag("Lebanon");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Lebanon");
            }}
          >
            <LebaneseFlag />
            Lebanon
          </a>
          <a
            href="/eg"
            onClick={() => {
              setSelectedFlag("Egypt");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Egypt");
            }}
          >
            <EgyptianFlag />
            Egypt
          </a>
        </div>
      )}
    </div>
  );
}

export default Flag;
