import User from "./../../Database/models/user";

async function fetchUserById() {
  try {
    const user = await User.findById("654a18a6ced4e391e30cbb0b");
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

export { fetchUserById };
