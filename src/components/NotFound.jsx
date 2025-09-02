import React from 'react';
import notFound from '../assets/notFound.png';


export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <img
        src={notFound}
        alt="404 Not Found"
        className="w-50 h-auto d-inline-block object-fit-contain mt-5"
      />
    </div>
  );
}
