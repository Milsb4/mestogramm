import { Card } from "./types";
import { v4 as uuidv4 } from "uuid";
// Функция для генерации случайных комментариев
const generateRandomComments = () => {
  const comments = [
    "Отличная фотография!",
    "Очень красиво",
    "Интересный ракурс",
    "Прекрасные цвета",
    "Восхитительно!",
    "Отличная работа",
    "Люблю такие пейзажи",
    "Великолепный вид",
    "Завораживает",
    "Невероятно красиво",
    "Отличное качество",
    "Супер!",
    "Очень атмосферно",
    "Потрясающе",
    "Мне нравится",
    "Отличный кадр",
    "Прекрасный пейзаж",
    "Вдохновляет",
    "Необычно",
    "Оригинально"
  ];
  
  const commentCount = Math.floor(Math.random() * 5); // 0-4 комментария
  const randomComments = [];
  
  for (let i = 0; i < commentCount; i++) {
    const randomComment = comments[Math.floor(Math.random() * comments.length)];
    randomComments.push({
      id: `comment-${Math.random().toString(36).substr(2, 9)}`,
      text: randomComment,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      ownerCommmentID: getRandomOwnerId()
    });
  }
  
  return randomComments;
};

// Функция для получения случайного ID владельца
const getRandomOwnerId = () => {
  const owners = ["user1", "user2", "user3", "user4", "user5"];
  return owners[Math.floor(Math.random() * owners.length)];
};

export const card: Card = [
  {
    id: uuidv4(),
    url: "https://img3.akspic.ru/previews/2/9/5/1/8/181592/181592-rozhdestvo-rozhdestvenskie_ogni-elka-osveshhenie-derevo-x750.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "https://img1.akspic.ru/previews/0/6/5/8/78560/78560-elka-rozhdestvenskie_ukrasheniya-rozhdestvenskij_ornament-novyj_god-rozhdestvo-x750.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "https://img3.akspic.ru/previews/6/5/3/6/7/176356/176356-koster-drova-zola-ogon-plamya-x750.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "https://img.goodfon.ru/wallpaper/big/a/d8/art-gory-nebo-ozero.webp",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "/44389-okruzhayushchaya_sreda-derevo-pejzazhi_gor-hvojnye-oblako-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "/102208-prirodnyj_landshaft-otrazhenie-prirodnyj_zapovednik-pustynya-dikaya_mestnost-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "/126653-doroga-gornyj_hrebet-priroda-nebo-gornaya_stanciya-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: uuidv4(),
    url: "/134731-gora-upal-dikaya_mestnost-gornyj_relef-priroda-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id:  uuidv4(),
    url: "/181581-sammit-sammit_v_kalifornii-neveroyatnyj-ezhednevnoe_molitvennoe-ispolzoval-x750.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id: "11",
    url: "/148562-nebo-dikayamestnost-nagore-prirodnyjlandshaft-dolina-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id:  uuidv4(),
    url: "/174478-priroda-gora-dikaya_mestnost-oblako-prirodnyj_landshaft-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
  {
    id:  uuidv4(),
    url: "/171954-nacionalnyj_park_severnyj_jork_murs-priroda-park-nacionalnyj_park-gora-500x.jpg",
    title: "Живописный фон",
    comments: generateRandomComments(),
    ownerCardId: getRandomOwnerId(),
  },
];