// CustomModal.js
import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, content }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <button className="btn btn-success" onClick={onRequestClose}>
      Find Some Startups &rarr;
    </button>
    <br />
    <div className="row mt-3">
      <div className="offset-0 col-90">
        <h2>
          Why make Techstars Companies Searchable?
        </h2>
        <br />
        <p>
          Data is valuable in itself! Startups need to be intentional about
          how they use their time. This dataset is a good starting
          point for a number of startup related activities; <b>finding investors,
            finding early customers, and learning how to find customers.</b>
        </p>
        <hr className="mt-5" />
        <h3>
          Use Case 1: Investors of Look-A-like Companies
        </h3>
        <p>
          If you are a founder, looking for investors, a good starting point is
          to find other companies that are similar, and ahead of you. Meaning they
          have a product in the marketplace, some form of revenue, and have raised
          venture funding. (Their early investors can be good fit you, now.)
        </p>
        <div className="alertBox">
          <div className="row">
            <div className="col-md-6">
              <p>
                Use your network to get introductions to their founders, ask for
                help, advise and warm intros to their investors. Startup founders know
                the pain of finding investors, so are very willing to help. They
                can walk you in the door and get you visibility that would take
                a lot longer on your own.
              </p>
            </div>
            <div className="col-md-6">
              <ol>
                <li>Filter by company vertical/industry.</li>
                <li>Filter by company age.</li>
                <li>Search funding status on Crunchbase.</li>
                <li>Look for a pattern and then network your way in.</li>
                <li>Build a target list or ICP.</li>
                <li>Start Networking with intention.</li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <b>Pro Tip:</b> The Managing Director (MD) of Techstars program can be very helpful.
              MDs are super connectors, and know everyone in their program ecosystem. You, as a
              new startup founder are their future dealflow. Reach out.
            </div>
          </div>
        </div>
        <hr className="mt-5" />
        <h3>
          Use Case 2: Finding Early Adaptors
        </h3>
        <p>
          If you are testing out a new product or service, startups can be a good
          place to find early adaptors. Startup founders are always looking for
          an advantage. They are <b>time</b>, <b>funding</b> and <b>staff</b> restricted. Early adaptors
          are great beta clients. They give a lot of value, can be bug and UI tolerate,
          and are grateful for perks!
        </p>
        <div className="alertBox">
          <p>
            Startups love free! And know how to help.
          </p>
        </div>
        <br />
        <p>
          Good luck and good hunting. :)
        </p>
      </div>
    </div>
    <div className="alertBox">
      <div className="row">
        <div className="col-md-2">
          <img src="https://stephansmith.solutions/assets/clients/stephan-smith-avatar.png" className="img-thumbnail img-fluid avatar-border" kwidth="200" />
        </div>
        <div className="col-md-10">
          <p className="mt-3">
            Hi, I'm Stephan Smith, a <a href="https://StephanSmith.solutions/what_is_a_fractional_cto">fractional</a> CTO (+CISO). I help CEOs make better technology decisions. I code and 
            think about code, and have found that startups value options for getting <b>perspective</b> and <b>context</b> on 
            they technologies and patterns they use to achieve their revenue goals.
          </p>
          <button className="btn btn-outline-dark btn-sm w-sm-100 justify-content" onClick={() => window.open('https://StephanSmith.solutions/', "_blank")}>
            Learn More..
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

export default CustomModal;