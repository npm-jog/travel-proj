import { UserDocument } from "../../models/user";

const users: (UserDocument | Partial<UserDocument>)[] = [
  {
    forename: "Tim",
    surname: "Daley",
    username: "TD2382",
    avatar_url:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c3c11a4e-961b-47ec-8f72-acebce4c4562/dg3777p-d1cfdaab-ba29-4254-a99b-931a476c6c0a.png/v1/fill/w_900,h_900,q_80,strp/ragdoll_cat_chilling_in_chaise_lounge_on_a_beach_by_coolarts223_dg3777p-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzYzExYTRlLTk2MWItNDdlYy04ZjcyLWFjZWJjZTRjNDU2MlwvZGczNzc3cC1kMWNmZGFhYi1iYTI5LTQyNTQtYTk5Yi05MzFhNDc2YzZjMGEucG5nIiwiaGVpZ2h0IjoiPD05MDAiLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cL2MzYzExYTRlLTk2MWItNDdlYy04ZjcyLWFjZWJjZTRjNDU2MlwvY29vbGFydHMyMjMtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.e_ManfXyA6MMpTQFbgzAtegFuF2MXCux_Dfd0bYrvkE",
    visited_locations: ["Spain", "Malta", "France", "Greece", "Barbados"],
    wishlist: ["Portugal", "Italy"],
    albums: [],
  },
  {
    forename: "Lauren",
    surname: "Hughes",
    username: "SunshineLoz92",
    avatar_url: "https://as2.ftcdn.net/v2/jpg/01/07/24/47/1000_F_107244704_zUI5rk6tdHnk426DjsjofIAbVD2KYDRO.jpg",
    visited_locations: ["USA", "Italy", "Jamaica", "Mexico", "Spain"],
    wishlist: ["Thailand", "Greece"],
    albums: [],
  },
  {
    forename: "Robert",
    surname: "Davis",
    username: "Backpacker2001",
    avatar_url: "https://c8.alamy.com/zooms/9/436207e7ab8a49dea88a7f84d4c36567/wb1x0y.jpg",
    visited_locations: ["Thailand", "Cambodia", "Laos", "Vietnam", "Spain"],
    wishlist: ["Indonesia", "Phillipines", "Italy"],
    albums: [],
  },
  {
    forename: "Sharon",
    surname: "Davis",
    username: "FoodieShaz",
    avatar_url:
      "https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/dbfaa867-bdab-4b1e-9e84-fb966dab4a63/2023_06_01EOS+M505909-Edit.jpg",
    visited_locations: [],
    wishlist: ["China"],
    albums: [],
  },
  {
    forename: "Paul",
    surname: "Henderson",
    username: "flyawaypaul",
    visited_locations: ["USA"],
    wishlist: [],
    albums: [],
  },
];

export = users;
