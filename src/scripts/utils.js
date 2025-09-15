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

const validate = all.map(
  (user) =>
    typeof user.full_name === "string" &&
    user.full_name[0] === user.full_name[0].toUpperCase()
);
console.log(all);

export { all };
