import React from "react";
import MedicalHistTable from "./MedicalHistTable";

export default function MedicalHistory() {
  return (
    <div className="flex flex-col mx-14 mt-24">
      <div className="flex items-center justify-between ">
        <h2 className="text-[20px] font-medium">Medical History</h2>
      </div>
      <MedicalHistTable />
    </div>
  );
}
