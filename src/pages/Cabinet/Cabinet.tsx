import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as api from '../../api';

import './Cabinet.scss';
import { useSelector } from 'react-redux';
import { selectAccount, selectEmail } from '../../redux/account/selector';

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
});

export function Cabinet() {
  const isAuthorized = useSelector(selectAccount);
  console.log(isAuthorized);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const sendForm = async () => {
    console.log(phoneNumber, description, file);
    let fileSource = '';
    if (file) {
      fileSource = await toBase64(file);
    }
    console.log(fileSource);

    api.post(`${api.endpoint}/reviews/create`, {
      phone: phoneNumber,
      description,
      rating,
      attachments: [fileSource],
      status: 'verified',
    }, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        toast('Відгук успішно надіслано!', { type: 'success' });
      }
      console.log(data);
    });
  }

  return (
    <div className="cabinet">
      <Link to="/">
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 714.6 401.1">
          <path fill="#fff" fillRule="evenodd" d="M502.8 0h211.8l-23 39.7-138.5 240L483 401H342.7L413 279.6 251.4 0h140.3L483 158.1 538.6 62 502.8 0Zm-201 279.6L140.1 0H0l231.7 401 70-121.4Z"/>
        </svg>
      </Link>
      <div className="section">
          <div className="form">
              <div className="text-center">
                  <h4 className="mb-4 pb-3">Залиште свій відгук</h4>
              </div>
              <div className="form-input-1">
                  <input type="tel" name="phone-number" autoComplete="off" placeholder="Номер телефону" className="form-style"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  
                  <i className="input-icon fa fa-phone" style={{fontSize: '24px'}}></i>
              </div>
              <div className="text-left">
                  <p>Введіть опис проблеми</p>
              </div>
              <div className="form-input-2">
                  <textarea name="text" className="form-style-2" id="logpass" autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
              </div>
              <div className="text-left">
                  <p>Оцініть рейтинг</p>
              </div>
              <div className="form-input-2">
                <input type="range" min={1} max={5} onChange={(e) => setRating(Number(e.target.value))} />
              </div>
              <div className="text-left">
                  <p>Додайте докази</p>
              </div>
              <div  className="form-input-3"> 
              <input type="file" className="form-style-3" id="avatar" name="avatar" accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
          </div>
          <div className="button-center">
            <a className="btn mt-4" onClick={sendForm}>відправити</a>
          </div>
          </div>
      </div>
    </div>
  )
}
