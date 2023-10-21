export const protocol = 'http:'; // window.location.protocol
export const endpoint = `${protocol}//${process.env.REACT_APP_BACKEND_ENDPOINT}`;
export const fileHost = `${endpoint}/files/`;

const message = 'Сервер відповів помилкою, ми працюємо над цим :('

export function get(url: string, callback = (data: any) => {}): any {
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': endpoint,
    },
  })
  .then(res => res.json())
  .then(callback)
  .catch(() => callback({ message }));
}

export function post(url: string, body: any, callback = (data: any) => {}): any {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': endpoint,
    },
  })
  .then(res => res.json())
  .then(callback)
  .catch(() => callback({ message }));
}

export function method(url: string, options: {}, callback = (data: any) => {}): any {
  fetch(url, {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': endpoint,
    },
    ...options,
  })
  .then(res => res.json())
  .then(callback)
  .catch(() => callback({ message }));
}
