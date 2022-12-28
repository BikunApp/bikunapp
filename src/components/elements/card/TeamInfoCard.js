import React from "react";

export const TeamInfoCard = ({
  photo,
  name,
  role,
  githubLink,
  websiteLink,
  linkedinLink,
  faculty,
  year,
  team,
}) => {
  return (
    <section className="shadow-cardTeam flex justify-between gap-6 rounded-lg p-4 overflow-auto">
      <section className="flex gap-3">
        <div className="flex items-center justify-center h-full">
          <div className="relative md:w-24 md:h-24 w-12 h-12">
            <img
              className="rounded-full border border-gray-100 shadow-sm"
              src={
                photo
                  ? process.env.PUBLIC_URL + photo
                  : "https://randomuser.me/api/portraits/women/81.jpg"
              }
              alt="team profile"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <section>
            <p className="text-poppins-p font-bold">{name ?? ""}</p>
            <p className="text-poppins-p-small">{role ?? ""}</p>
          </section>
          <section className="flex gap-4 items-center">
            {githubLink ? (
              <a href={githubLink} target="_blank" rel="noreferrer">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/github.svg`}
                  alt="github"
                />
              </a>
            ) : null}

            {linkedinLink ? (
              <a href={linkedinLink} target="_blank" rel="noreferrer">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/linkedin.svg`}
                  alt="linkedin"
                />
              </a>
            ) : null}

            {websiteLink ? (
              <a href={websiteLink} target="_blank" rel="noreferrer">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/globe.svg`}
                  alt="globe"
                />
              </a>
            ) : null}
          </section>
        </div>
      </section>
      <section className="flex flex-col items-end justify-between gap-4">
        <img
          src={`${process.env.PUBLIC_URL}/icons/${
            team === "ristek" ? "ristek.svg" : "hive.svg"
          } `}
          alt="team"
          width={48}
        />
        <p className="text-poppins-p-small text-[#9B9B9B]">
          {faculty} {year}
        </p>
      </section>
    </section>
  );
};
