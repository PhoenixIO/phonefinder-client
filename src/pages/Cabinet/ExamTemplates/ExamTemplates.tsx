import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { setCabinetPage } from '../../../redux/pages/slice';
import { CabinetPages } from '../../../redux/pages/types';
import { setEditingTemplate } from '../../../redux/templates/slice';
import * as api from '../../../api';

import styles from './ExamTemplates.module.scss';

export function ExamTemplates() {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState<any>([]);

  useEffect(() => {
    api.get(`${api.endpoint}/templates`, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        setTemplates(data);
      }
    });
  }, []);

  const onTemplateEdit = (template: any) => {
    dispatch(setEditingTemplate(template));
    dispatch(setCabinetPage(CabinetPages.CreateTemplate));
  }
  const onTemplateCreate = () => {
    dispatch(setCabinetPage(CabinetPages.CreateTemplate))
  }
  const onTemplateDelete = (template: any, index: number) => {
    if (window.confirm(`Ви впевнені що хочете видалити прекрасний шаблон "${template.title}"?`)) {
      api.post(`${api.endpoint}/templates/delete/${template._id}`, {}, (data) => {
        if (data.message) {
          toast(data.message, { type: 'error' });
        } else {
          templates.splice(index, 1);
          setTemplates([...templates]);
          toast('Шаблон видалено', { type: 'success' });
        }
      });
    }
  }

  return (
    <div className={styles.examTemplates}>
      <Alert variant='dark' className={styles.alert}>
        Тут ви можете переглянути усі створені шаблони. На основі цих шаблонів створюються тестування.
      </Alert>
      <Button className={styles.createTemplateButton} onClick={onTemplateCreate}>
        Створити шаблон для тестування
      </Button>
      {templates.length === 0 && <Alert variant="dark">Немає створених шаблонів</Alert>}
      <Table className={styles.templatesTable} variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Назва</th>
            <th>Кількість запитань</th>
            <th>Дата створення</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {templates.map((template: any, i: number) => {
            const onClick = () => onTemplateEdit(template);
            const onDelete = () => onTemplateDelete(template, i);
            return (
              <tr key={template._id}>
                <td>{i + 1}</td>
                <td onClick={onClick} role="button">{template.title}</td>
                <td>{template.questions.length}</td>
                <td>{new Date(template.createdAt).toLocaleDateString()}</td>
                <td onClick={onDelete} role="button">
                  <FontAwesomeIcon icon={faTrash} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
