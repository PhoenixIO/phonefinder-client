import clsx from 'clsx';
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
import * as api from '../../../api';

import styles from './Exams.module.scss';

export function Exams() {
  const dispatch = useDispatch();
  const onExamCreate = () => {
    dispatch(setCabinetPage(CabinetPages.CreateExam));
  };
  const [exams, setExams] = useState<any>([]);

  useEffect(() => {
    api.get(`${api.endpoint}/exams`, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        setExams(data);
      }
    });
  }, []);

  const onExamView = (exam: any) => {
  }
  const onExamDelete = (exam: any, index: number) => {
    if (window.confirm(`Ви впевнені що хочете видалити це тестування?`)) {
      api.post(`${api.endpoint}/exams/delete/${exam._id}`, {}, (data) => {
        if (data.message) {
          toast(data.message, { type: 'error' });
        } else {
          exams.splice(index, 1);
          setExams([...exams]);
          toast('Тестування видалено', { type: 'success' });
        }
      });
    }
  };

  return (
    <div className={styles.exams}>
      <Alert variant='dark' className={styles.alert}>
        Тут ви можете переглянути усі створені тестування.
      </Alert>
      <Button className={styles.createExamButton} onClick={onExamCreate}>
        Створити тестування на основі шаблону
      </Button>

      <Table className={clsx(styles.examsTable, 'text-center align-middle')} variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Назва</th>
            <th>Пройшло учнів</th>
            <th>Дата створення</th>
            <th>Посилання</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {exams.map(({ exam, template }: any, i: number) => {
            const onClick = () => onExamView(exam);
            const onDelete = () => onExamDelete(exam, i);
            const link = window.location.origin + '/exam/' + exam._id;
            const date = new Date(exam.createdAt);
            return (
              <tr key={exam._id}>
                <td>{i + 1}</td>
                <td onClick={onClick} role="button">{template.title}</td>
                <td>{exam.users.length}</td>
                <td>
                  {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                </td>
                <td>
                  <a href={link} target="_blank" rel="noreferrer">Перейти</a>
                </td>
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
