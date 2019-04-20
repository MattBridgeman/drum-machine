import React from "react";

const PatternTimeSignature = ({ children }) => <div className="time-signature">{children}</div>;
const PatternTimeSignatureGroup = ({ children }) => <div className="time-signature-group">{children}</div>;
const PatternTimeSignature44 = ({ children }) => <div className="time-signature-4-4">{children}</div>;

export {
  PatternTimeSignature,
  PatternTimeSignatureGroup,
  PatternTimeSignature44
};
