import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessIcon = ({ size = 96, className = "" }) => {
  return (
    <div className={`text-emerald-500 ${className}`}>
      <CheckCircle size={size} strokeWidth={1.5} />
    </div>
  );
};

export default SuccessIcon;
