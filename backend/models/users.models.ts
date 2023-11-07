function fetchUserById() {
  const myPromise: Promise<string> = new Promise((resolve, reject) => {
    resolve("hello" + "world");
  });
  return myPromise;
}

function createUser() {}

function removeUserById() {}

function updateUserById() {}

export { fetchUserById, createUser, removeUserById, updateUserById };
