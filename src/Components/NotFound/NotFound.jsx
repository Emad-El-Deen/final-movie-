import React, { useEffect, useState } from "react";
import Style from "./NotFound.module.css";
export default function NotFound() {
  const [counter, setCounter] = useState();

  return (
    <>
      <div
        className={`d-flex  justify-content-center align-items-center text-center  ${Style.notFound}  `}
      >
        <div className={`${Style.layer} `}>
          <h1 className="display-3">Lost your way ?</h1>
          <div className="my-4">
            <p>
              Sorry, we can &#x27;t find that page. You &#x27;ll find lots to
              explore on the home page
            </p>
            <div className="m-2">
              <a href="/" tabindex="-1">
                <button className="btn btn-outline-light p-2 " type="button">
                  <span className="">MovieMight Home</span>
                </button>
              </a>
            </div>
            <div className="">
              <span id="" data-uia="">
                Error Code <strong>NSES-404</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
