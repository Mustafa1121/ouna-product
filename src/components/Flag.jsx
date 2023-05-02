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
    <CircleFlag countryCode="lb" height="35" onClick={handleToggle} />
  );
  const TunisianFlag = () => <CircleFlag countryCode="tn" height="35" />;
  const MoroccanFlag = () => <CircleFlag countryCode="ma" height="35" />;
  const AlgerianFlag = () => <CircleFlag countryCode="dz" height="35" />;
  const SenegaleseFlag = () => <CircleFlag countryCode="sn" height="35" />;
  const IvorianFlag = () => <CircleFlag countryCode="ci" height="35" />;
  const BenineseFlag = () => <CircleFlag countryCode="bj" height="35" />;

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
      ) : selectedFlag === "Egypt" ? (
        <EgyptianFlag />
      ) : selectedFlag === "Tunisia" ? (
        <TunisianFlag />
      ) : selectedFlag === "Morocco" ? (
        <MoroccanFlag />
      ) : selectedFlag === "Algeria" ? (
        <AlgerianFlag />
      ) : selectedFlag === "Senegal" ? (
        <SenegaleseFlag />
      ) : selectedFlag === "Côte d'Ivoire" ? (
        <IvorianFlag />
      ) : selectedFlag === "Benin" ? (
        <BenineseFlag />
      ) : (
        <LebaneseFlag />
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
          <a
            href="/tn"
            onClick={() => {
              setSelectedFlag("Tunisia");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Tunisia");
            }}
          >
            <TunisianFlag />
            Tunisia
          </a>
          <a
            href="/ma"
            onClick={() => {
              setSelectedFlag("Morocco");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Morocco");
            }}
          >
            <MoroccanFlag />
            Morocco
          </a>
          <a
            href="/dz"
            onClick={() => {
              setSelectedFlag("Algeria");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Algeria");
            }}
          >
            <AlgerianFlag />
            Algeria
          </a>
          <a
            href="/sn"
            onClick={() => {
              setSelectedFlag("Senegal");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Senegal");
            }}
          >
            <SenegaleseFlag />
            Senegal
          </a>
          <a
            href="/ci"
            onClick={() => {
              setSelectedFlag("Côte d'Ivoire");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Côte d'Ivoire");
            }}
          >
            <IvorianFlag />
            Côte d'Ivoire
          </a>
          <a
            href="/bj"
            onClick={() => {
              setSelectedFlag("Benin");
              setIsOpen(false);
              localStorage.setItem("selectedFlag", "Benin");
            }}
          >
            <BenineseFlag />
            Benin
          </a>
        </div>
      )}
    </div>
  );
}

export default Flag;
