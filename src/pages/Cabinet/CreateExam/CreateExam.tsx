import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import * as api from '../../../api';

import styles from './CreateExam.module.scss';
import { setCabinetPage } from '../../../redux/pages/slice';
import { CabinetPages } from '../../../redux/pages/types';

export function CreateExam() {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState<any>([]);
  const [selectedTemplate, setTemplate] = useState('');

  useEffect(() => {
    api.get(`${api.endpoint}/templates`, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        setTemplates(data);
      }
    });
  }, []);

  const createExam = () => {
    api.post(`${api.endpoint}/exams/create`, { template_id: selectedTemplate }, (data) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        toast('Тестування успішно створено! Посилання можете скопіювати у списку.', { type: 'success' });
        dispatch(setCabinetPage(CabinetPages.Exams));
      }
    });
  }

  return (
    <div className={styles.createExam}>
      <select onChange={(e: any) => setTemplate(e.target.value)} defaultValue='Вибрати шаблон'>
        <option disabled>Вибрати шаблон</option>
        {templates.length === 0 && <option disabled>Немає створених шаблонів</option>}
        {templates.map((template: any) => {
          return (
            <option key={template._id} value={template._id}>
              {template.title}
            </option>
          );
        })}
      </select>

      <Button className={styles.save} onClick={createExam}>Створити тестування</Button>
    </div>
  );
}
