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
  ClearRefinements,
  Stats,
  SortBy
} from 'react-instantsearch';


import type { Hit } from 'instantsearch.js';
import './App.css';

const searchClient = algoliasearch(
  'UD1VE6KV0J',
  '81bcf3723376714307c21454b8515549'
);

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
                  { value: 'Networking-Book-age-asc', label: 'Oldest to Newest' }
                ]}
              />
              <br />

              
              <div className="filter-el">
                <h4>
                  Tag-em
                </h4>
                <RefinementList attribute="Tags" searchable="true" searchablePlaceholder="Enter a tag..." limit="100" />
              </div>
              <div className="filter-el">
                <h4>
                  Location?
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a location..." attribute="Location" />
              </div>
            </div>
            <div className="col-md-9 p-4">
              <div className="row">
                <div className="col-9">
                  <SearchBox placeholder="Enter a name..." className="searchbox" />

                  <CurrentRefinements title="My custom title" />

                  <br/>
                  {/* <ClearRefinements /> */}
                  
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

function Hit({ hit }: HitProps) {
  return (
    <article>
      <div className="row">
        <div className="col-4">
          <a href={`${hit['LinkedIn']}`} target="_blank">
            <ImageWithFallback hit={hit} width="80" className="compLogo" alt={hit.name} />
          </a>
          <h4>
            <Highlight attribute="FirstName" hit={hit} /> <Highlight attribute="LastName" hit={hit} />
          </h4>
          <p>
            <Highlight attribute="JobTitle" hit={hit} />
          </p>
        </div>
        <div className="col-6">

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
        <div className="col-2">
          <p>
            <Highlight attribute="Company" hit={hit} />
            <br />
            <Highlight attribute="Location" hit={hit} />
          </p>
        </div>
      </div>
    </article>
  );
}
