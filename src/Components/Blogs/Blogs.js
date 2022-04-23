import React from "react";
import "./Blogs.css";

const Blogs = () => {
  return (
    <div className="text-justify mt-28 my-24 mx-16">
      <div className="text-center">
        <h1 className="text-4xl text-green-500 md:text-5xl">
          Some Random Questions & Answers❓
        </h1>
        <hr />
      </div>
      <br />
      <br />
      <div>
        <h1 className="text-4xl text-red-500 mb-8">
          What is the difference between authentication and authorization?
        </h1>
        <h1 className="text-2xl text-blue-600">Authentication</h1>
        <p className="text-justify font-medium text-xl">
          1.In authentication process, the identity of users are checked for
          providing the access to the system.
          <br />
          2.In authentication process, users or persons are verified.
          <br />
          3.It is done before the authorization process.
          <br />
          4.It needs usually user’s login details.
          <br />
          <br />
        </p>
        <h1 className="text-2xl text-blue-600">Authorization</h1>
        <p className="text-justify font-medium text-xl">
          1.While in authorization process, person’s or user’s authorities are
          checked for accessing the resources.
          <br />
          2.While in this process, users or persons are validated.
          <br />
          3.While this process is done after the authentication process.
          <br />
          4.While it needs user’s privilege or security levels.
          <br />
        </p>
      </div>
      <br />
      <br />
      <div>
        <h1 className="text-4xl text-red-500 mb-8">
          Why are you using firebase? What other options do you have to
          implement authentication?
        </h1>
        <p className="text-justify font-medium text-xl">
          Firebase manages all data real-time in the database. So, the exchange
          of data to and from the database is easy and quick. Hence, if you are
          looking to develop mobile apps such as live streaming, chat messaging,
          etc., you can use Firebase. Firebase allow syncing the real-time data
          across all the devices- Android, iOS, and the web without refreshing
          the screen Firebase offers integration to Google Ads, AdMob,
          DoubleClick, Play Store, Data Studio, BigQuery, and Slack, to make
          your app development with efficient and accurate management and
          maintenance Everything from databases, analytics to crashing reports
          are included in Firebase. So, the app development teams can stay
          focused on improving the user experience
          <br />
          <br />
          <p className="text-2xl text-cyan-600">
            Here is 10 platforms list to user authentication.
          </p>
          <br />
          <ul className="text-blue-500">
            <li>1)Firebase</li>
            <li>2)Stytch</li>
            <li>3)Ory</li>
            <li>4)Supabase</li>
            <li>5)Okta</li>
            <li>6)PingIdentity</li>
            <li>7)Keycloak</li>
            <li>8)Frontegg</li>
            <li>9)Authress</li>
            <li>10)Auth0</li>
            <li>etc etc</li>
          </ul>
          <br />
        </p>
      </div>
      <div>
        <h1 className="text-4xl text-red-500 mb-8">
          What other services does firebase provide other than authentication?
        </h1>
        <p className="text-justify font-medium text-xl">
          <p className="text-cyan-600">
            Firebase provides lot of services Besides Authentication and
            Authorization. like:
          </p>
          <br />
          <ul className="text-blue-600">
            <li>1)Real time database</li>
            <li>2)Real config</li>
            <li>3)Cloud Function</li>
            <li>4)Cloud messanging .</li>
            <li>5)Hosting</li>
            <li>6)Cloud store</li>
            <li>And so on..</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Blogs;
