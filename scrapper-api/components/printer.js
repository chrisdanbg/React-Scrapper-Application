/* eslint-disable no-console */
const { createTags } = require('./tag.js');

const followPrinter = ({ userName, socials }, link) => {
  console.log(' ');
  console.log(' ');
  console.log(`✔️ Follow @ ${userName}`);
  console.log(link);
  socials.forEach((item) => {
    console.log(item);
  });
};

const printTags = (song) => {
  console.log(' ');
  console.log('TAGS: ');
  console.log(' ');
  console.log(createTags(song));
  console.log(' ');
};

module.exports.followPrinter = followPrinter;
module.exports.printTags = printTags;
