function fetchUserById() {
     const myPromise: Promise<string> = new Promise((resolve, reject) => {
        resolve('hello' + 'world')
      });
      return myPromise;
}

export {fetchUserById};