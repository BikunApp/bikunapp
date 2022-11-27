import {
  DEV_INFORMATION_DATA,
  SUPERVISOR_INFORMATION_DATA,
} from "../../constants";
import { TeamInfoCard } from "../elements";

const About = () => {
  return (
    <section
      className="text-black px-6 py-4 w-full flex flex-col gap-8 z-50 bg-white"
      style={{ height: "3000px" }}
    >
      <article className="flex flex-col gap-2">
        <header className="text-poppins-h4 font-bold">
          <h4>What is Bikun Tracker?</h4>
        </header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut neque
          risus, ullamcorper sit amet nisi a, rhoncus rutrum massa. Fusce sit
          amet felis mauris. Suspendisse potenti. Cras gravida malesuada
          sagittis. Praesent bibendum purus sit amet libero mollis gravida.
          Pellentesque purus nisi, lacinia sed pulvinar at, porta eu turpis.
        </p>
      </article>
      <section className="flex flex-col gap-2">
        <header className="text-poppins-h4 font-bold">
          <h4>Development Team</h4>
        </header>
        <div className="flex flex-col gap-4">
          {DEV_INFORMATION_DATA.map((data, index) => (
            <div key={data?.name} className="p-1">
              <TeamInfoCard
                name={data?.name}
                faculty={data?.faculty}
                photo={data?.photo}
                role={data?.role}
                team={data?.team}
                year={data?.year}
                githubLink={data?.githubLink}
                linkedinLink={data?.linkedinLink}
                websiteLink={data?.websiteLink}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <header className="text-poppins-h4 font-bold">
          <h4>Supervisor</h4>
        </header>
        <div className="flex flex-col gap-4">
          {SUPERVISOR_INFORMATION_DATA.map((data, index) => (
            <div key={data?.name}>
              <TeamInfoCard
                name={data?.name}
                faculty={data?.faculty}
                photo={data?.photo}
                role={data?.role}
                team={data?.team}
                year={data?.year}
                githubLink={data?.githubLink}
                linkedinLink={data?.linkedinLink}
                websiteLink={data?.websiteLink}
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <header className="text-poppins-h4 font-bold">
          <h4>Supported By</h4>
          <div className="flex items-center justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/distp.png`}
              alt="distp"
              width={160}
            />
            <img
              src={`${process.env.PUBLIC_URL}/dopf.png`}
              alt="dopf"
              width={160}
            />
          </div>
        </header>
      </section>
    </section>
  );
};

export default About;
