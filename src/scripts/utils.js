import { randomUserMock } from "../data/Lab2-mock";
import { additionalUsers } from "../data/Lab2-mock";

const course = [
  "Mathematics",
  "Physics",
  "English",
  "Chess",
  "Computer Science",
  "Dancing",
  "Bioligy",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];

export const randomCourse = () =>
  course[Math.floor(Math.random() * course.length)];

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const rightRandomUser = randomUserMock.map((user, index) => ({
  ...user,
  id: user.login?.uuid || index + 1,
  favorite: false,
  course: randomCourse(),
  bg_color: randomColor(),
  note: null,
}));

const rightAdditionalUser = additionalUsers.map((user, index) => ({
  ...user,
  id: user.login?.uuid || index + 1,
  favorite: false,
  course: randomCourse(),
  bg_color: randomColor(),
  note: null,
}));

const all = [...rightRandomUser, ...rightAdditionalUser].filter(
  (user, index, self) => index === self.findIndex((t) => t.email === user.email)
);

import _ from "lodash";

export const validate = (user) => {
  if (!_.isObject(user)) return false;

  const stringFields = ["name", "surname", "discipline", "country"];
  const allStringsValid = _.every(stringFields, (field) => {
    const value = _.get(user, field, "");
    return (
      _.isString(value) && !_.isEmpty(value) && _.upperFirst(value) === value
    );
  });

  const ageValid = _.inRange(_.get(user, "age", 0), 18, 100);

  return allStringsValid && ageValid;
};

const filterUser = (users, filtrParam) => {
  return users.filter((user) =>
    Object.entries(filtrParam).every(([key, value]) => {
      return user[key] === value;
    })
  );
};

const sortData = (user, field, sort) => {
  if (typeof user === "string") {
    user.sort((a, b) => a.field.localeCompare(b.field));
  }
};

const searchData = (list, value) => {
  return list.filter((t) => {
    const name = t.name?.toLowerCase() || "";
    const note = t.note?.toLowerCase() || "";
    const age = t.age?.toString() || "";
    const country = t.country?.toLowerCase() || "";
    const discipline = t.discipline?.toLowerCase() || "";

    return (
      name.includes(value) ||
      note.includes(value) ||
      age.includes(value) ||
      country.includes(value) ||
      discipline.includes(value)
    );
  });
};

const percentAll = (users, cond) => {
  const filtreAll = users.filter(cond);
  const percent = (filtreAll.length / users.length) * 100;
  return percent;
};
export {
  rightRandomUser,
  rightAdditionalUser,
  all,
  filterUser,
  sortData,
  searchData,
  percentAll,
};
