import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { testCurrentUserRequest } from "../services/users";
import { handleError } from "../utils/handle-error";

const Planets: FC = () => {
  const [planets, setPlanets] = useState([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrltUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanetList = async () => {
      try {
        await testCurrentUserRequest();
      } catch (error) {
        handleError(error);
      }

      try {
        const { data } = await axios.get('https://swapi.dev/api/planets');
        
        setPlanets(data?.results?.map((planet: any) => planet.name) || []);
        setNextUrl(data?.next || null);
        setPreviousUrltUrl(data?.previous || null);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlanetList();
  }, []);

  const handleNavigateClick = async (url: string | null) => {
    if (!url) {
      return;
    }

    const { data } = await axios.get(url);
        
    setPlanets(data?.results?.map((planet: any) => planet.name) || []);
    setNextUrl(data?.next || null);
    setPreviousUrltUrl(data?.previous || null);
  };

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3" style={{ maxWidth: "720px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Planets
                </h3>
                <div className="mt-4">
                  <ul className="list-group">
                    {planets.map((planet, index) => {
                      return (<li className="list-group-item" key={index}>{planet}</li>);
                    })}
                  </ul>
                </div>
                {(previousUrl || nextUrl) && (
                  <div className="container row justify-content-around mt-4">
                    <button
                      className={`btn col-md-4 ${!!previousUrl ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleNavigateClick(previousUrl)}
                      disabled={previousUrl === null}
                    >
                      Previous
                    </button>
                    <button
                      className={`btn col-md-4 ${!!nextUrl ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleNavigateClick(nextUrl)}
                      disabled={nextUrl === null}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planets;
