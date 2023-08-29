import * as queryString from 'query-string';
import {useEffect, useState} from 'react';
// import logo from './topola.jpg';
import {Card, Grid, Image} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import {Media} from './util/media';
import {getChangelog, updateSeenVersion} from './changelog';

/** Link that loads a GEDCOM file from URL. */
function GedcomLink(props: {url: string; text: string}) {
  return (
    <Link
      to={{pathname: '/view', search: queryString.stringify({url: props.url})}}
    >
      {props.text}
    </Link>
  );
}

function formatBuildDate(dateString: string) {
  return dateString?.slice(0, 16) || '';
}

function Contents() {
  const [changelog, setChangelog] = useState('');
  useEffect(() => {
    (async () => {
      setChangelog(await getChangelog(1));
      updateSeenVersion();
    })();
  });

  return <div></div>;
}

/** The intro page. */
export function Intro() {
  return <div id="content"></div>;
}
