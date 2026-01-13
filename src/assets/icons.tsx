import React from 'react';

export const IconProps = (props: React.SVGProps<SVGSVGElement>) => ({
  ...props,
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><path d="m18 15-6-6-6 6"/></svg>
);
export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><path d="m6 9 6 6 6-6"/></svg>
);
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
export const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...IconProps(props)}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);