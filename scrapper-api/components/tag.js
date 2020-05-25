const getArtistsNames = (songName) => {
  const featSubstrings = ['ft.', 'Ft.', 'Feat.', '&', ','];

  let artistsName = songName.substring(0, songName.indexOf(' - '));

  if (featSubstrings.some((v) => artistsName.includes(v))) {
    featSubstrings.forEach((element) => {
      if (artistsName.includes(element)) {
        artistsName = artistsName.split(element).map((item) => item.trim());
      }
    });
  }

  if (!Array.isArray(artistsName)) {
    const artist = artistsName;
    artistsName = [artist.trim()];
  }
  return artistsName;
};

const getSongName = (songTitle) => {
  let slug = songTitle.split('-').pop().trim();

  const index = slug.indexOf(' (');
  if (index !== -1) {
    slug = slug.substring(0, index).trim();
  }
  return slug;
};

const getSongMix = (songTitle) => {
  let mix = songTitle.split(' (').pop().trim();
  mix = mix.substring(0, mix.lastIndexOf(')')).trim();
  return mix;
};

const createTags = (songTitle) => {
  const artistsNames = getArtistsNames(songTitle);
  const songName = getSongName(songTitle);
  const songMix = getSongMix(songTitle);

  const tags = [];
  tags.push(songTitle);
  artistsNames.forEach((artist) => tags.push(artist));

  if (artistsNames.length > 1) {
    tags.push(songTitle.substring(0, songTitle.indexOf(' - ')).trim());
  }
  tags.push(songName);

  if (songName !== songTitle.split('-').pop().trim()) {
    tags.push(songTitle.split('-').pop().trim());
  }

  if (songMix.length > 1) {
    tags.push(songMix);

    songMix.split(' ').forEach((item) => tags.push(item));
    tags.push(`${songName} ${songMix}`);
  }

  tags.push('CDeep Music');
  tags.push('Deep House');
  return tags.join(', ');
};

module.exports.createTags = createTags;
