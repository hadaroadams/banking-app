"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div>
      <CountUp end={amount} prefix="GHC" decimals={2} duration={2.75} />
    </div>
  );
};

export default AnimatedCounter;
