import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import fallbackImage from './assets/no-logo.png';
import fallbackAvatarImage from './assets/missing-avatar.jpeg';
import InfoModal from './Modal_Info';
import ExportModal from './Modal_Export';

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  RefinementList,
  CurrentRefinements,
  HierarchicalMenu,
  Stats,
  SortBy
} from 'react-instantsearch';


import type { Hit } from 'instantsearch.js';
import './App.css';

const apiUrl = 'https://us-central1-networking-9a9e0.cloudfunctions.net/api';

const searchClient = {
  search(requests) {
    return fetch(`${apiUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    })
      .then(response => response.json())
      .then(data => {
        return {
          results: data.results,
        };
      });
  },
  searchForFacetValues(requests) {
    return fetch(`${apiUrl}/sffv`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }).then(res => res.json());
  }
};

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const transformItems = (items) => {
  return items.map((item) => ({
    ...item,
    label: item.label.replace(/_/g, ' '),
  }));
};

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openExportModal = () => {
    setIsExportModalOpen(true);
  }

  const closeTheModal = () => {
    localStorage.setItem('alreadySeenModal', 'yes');
    setIsModalOpen(false);
  };

  try {
    setTimeout(() => {
      const alreadySeenModal = localStorage.getItem('alreadySeenModal') || 'no';
      if (alreadySeenModal === 'no') {
        setIsModalOpen(true);
      }
    }, 1000);
  } catch (err) {
    console.log('Small error')
  }

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName="Networking-Book"
        future={future}
        routing={true}
      >
        <header className="header">
          <h1 className="header-title">
            Networking Tools
            <Stats />
          </h1>
          {/* <button className="btn btn-sm btn-outline-dark avatar-btn headerBtn" onClick={openModal}>
            Startup Use Cases!
          </button> */}
        </header>

        <div className="container-fluid">

          <ExportModal
            isOpen={isExportModalOpen}
            onRequestClose={() => setIsExportModalOpen(false)}
          />

          <InfoModal
            isOpen={isModalOpen}
            onRequestClose={() => closeTheModal()}
          />

          <Configure hitsPerPage={25} />
          <div className="row">
            <div className="col-3 d-none d-md-block d-lg-block">
              <SortBy
                items={[
                  { value: 'Networking-Book', label: 'Newest to Oldest' },
                  { value: 'Networking-Book-age-asc', label: 'Oldest to Newest' },
                  { value: 'Networking-Book-calendly-desc', label: 'Last Calendly Mtg' },
                ]}
              />
              <br />

              <div className="filter-el">
                <h4>
                  Locations
                </h4>
                <HierarchicalMenu
                  separator=" > "
                  sortBy={['isRefined', 'count:desc']}
                  searchable="true" 
                  searchablePlaceholder="Enter a location..." 
                  attributes={[ 'Locations.lvl1', 'Locations.lvl2', 'Locations.lvl3'  ]}
                />
              </div>

              <div className="filter-el">
                <h4>
                  Tag-em
                </h4>
                <RefinementList attribute="Tags" searchable="true" searchablePlaceholder="Enter a tag..." limit="100" />
              </div>
              {/* <div className="filter-el">
                <h4>
                  Location?
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a location..." attribute="Location" limit="50" />
              </div> */}
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-12">
                  <SearchBox placeholder="What do you want to know..." className="searchbox" />
                  <CurrentRefinements />
                </div>
                <div className="col-3">
                  {/* <button className="btn btn-outline-dark" onClick={openExportModal}>
                    Export?
                  </button> */}
                </div>
              </div>
              <Hits hitComponent={Hit} />
              <br />
              <Pagination padding={2} />
              <br />
            </div>
            <div className="col-md-5 d-none">
              <div className="right-panel text-center">
                
                <a href="https://www.linkedin.com/in/dr-craig-n-horning-ph-d-41735410/" target="_blank">
                  <img src="https://media.licdn.com/dms/image/C4D03AQHzjOieBG0a-w/profile-displayphoto-shrink_800_800/0/1618580779268?e=1721260800&amp;v=beta&amp;t=YsfM-VcNIWL3NyiK7CFMq-suONaOJlyHZHbdcbJ0iLA" width="300px;" className=" img-thumbnail" />
                </a>

                <h3>
                  Ron Deman
                </h3>
                <p>
                  CEO & Co-Founder
                </p>
                <p>
                  New Startup LLC
                </p>
                <p>
                  Business Development Manager at Vention | Startup Partnerships | Venture 
                  Scout | Helping Founders Engineer Products and Sell Them
                </p>
                <textarea className="form-control">
                  Enter a summary...
                </textarea>
                <br/>
                <textarea className="form-control">
                  Tags
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function ImageWithFallback({ hit, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  // const src = `https://less-code.twic.pics/networking-book/${hit.objectID}.jpeg`;
  const src = hit.ProfilePicture;
  return <img src={src} className={classname} alt={alt} onError={handleError} {...props} />;
}

function AvatarWithFallback({ src, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackAvatarImage;
  };

  return <img src={src || ''} width="80" className={classname} onError={handleError} {...props} />;
}

const YearsBetween = ({ year }) => {
  const currentYear = new Date().getFullYear();
  const yearsBetween = currentYear - year;

  return <span>{yearsBetween} years</span>;
};

function timeAgo(dateString) {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - pastDate) / 1000);

  if (diffInSeconds < 0) return '(Upcoming)'

  const timeIntervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of timeIntervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `(${count} ${interval.label}${count !== 1 ? 's' : ''} ago)`;
    }
  }

  return '';
}

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div className="row">
        <div className="col-4">
          <a href={`${hit['Linkedin']}`} target="_blank">
            <ImageWithFallback hit={hit} width="100" className="compLogo" alt={hit.name} />
          </a>
          <h4>
            <Highlight attribute="FirstName" hit={hit} /> <Highlight attribute="LastName" hit={hit} />
          </h4>
          <p>
            <Highlight attribute="JobTitle" hit={hit} />
          </p>
        </div>
        <div className="col-4">
          <div className="m-2">
            {(hit.Tags || []).map((item, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {item}
              </span>
            ))}
          </div>
          <p>
            <Highlight attribute="Headline" hit={hit} />
          </p>
        </div>
        <div className="col-4">
          <p>
            <b><Highlight attribute="Company" hit={hit} /></b>
            <br />
            <Highlight attribute="Location" hit={hit} />
            <br/>

            {hit.DateConnected ? (
              <>
              <b>Connected:</b> {hit.DateConnectedStr} {timeAgo(hit.DateConnected)}
              </>
            ) : ( 
              <span>&nbsp;</span>
            )}
            
            <br/>

            {hit.calendly_LastMeetingAt ? (
              <>
              <b>Last Mtg:</b> {hit.calendly_LastMeetingAt} {timeAgo(hit.calendly_LastMeetingAt)}
              </>
            ) : ( 
              <span>&nbsp;</span>
            )}
          
          </p>
        </div>
      </div>
    </article>
  );
}
