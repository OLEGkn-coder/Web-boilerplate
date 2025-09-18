import { randomUserMock } from "./Lab2-mock";
import { additionalUsers } from "./Lab2-mock";

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

const randomCourse = () => course[Math.floor(Math.random() * course.length)];

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

const fields = ["full_name", "gender", "note", "state", "city", "country"];

const validate = (user) => {
  const textValide = fields.every(
    (field) =>
      typeof user[field] === "string" &&
      user[field][0] === user[field][0].toUpperCase()
  );

  const ageValide = typeof user.age === "number";

  const emailValide =
    typeof user.email === "string" && user.email.includes("@");

  const phoneValide = typeof user.phone === "string";

  return textValide && ageValide && emailValide && phoneValide;
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

const searchData = (users, key, value) => {
  return users.find((user) => user[key] === value) || "Not found";
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
  validate,
  filterUser,
  sortData,
  searchData,
  percentAll,
};
