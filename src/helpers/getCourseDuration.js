export const getCourseDuration = (duration) => {
  // write your solution here
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const suffix = hours > 1 ? ` hours` : ` hour`;

  return `${hours}:${minutes + suffix}`;
};
