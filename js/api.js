export const getData = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });

export const postData = (body) =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
    method: 'POST',
    body
  });
