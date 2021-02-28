/** @format */

import React, { useState, useEffect } from "react";
import {
  FaAngleDoubleRight,
} from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const jobs = await res.json();
      setJobs(jobs);
      setLoading(false);
      console.log(jobs);
    } catch (error) {
      setLoading(false);
      console.log("network error");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section>
        <h3>Loading...</h3>
      </section>
    );
  }

  const { title, dates, duties, company } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((job, index) => { 
            return (
              <button
                key={job.id}
                onClick={() => setValue(index)}
                className={`job-btn ${
                  index === value && "active-btn"
                }`}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h4>{title}</h4>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}
export default App;
