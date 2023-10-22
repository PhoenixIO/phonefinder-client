import { useState } from 'react';
import * as api from '../../api';

import './Cabinet.scss';
import { toast } from 'react-toastify';

export function Cabinet() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const sendForm = () => {
    console.log(phoneNumber, description, file);
    const formData = new FormData();
    formData.append("file", file as any);

    api.post(`${api.endpoint}/reviews/create`, {
      phone: phoneNumber,
      description,
      rating,
      attachments: ['hui', '2'],
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
