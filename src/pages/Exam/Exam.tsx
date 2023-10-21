import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { TypeAnimation } from 'react-type-animation';
import { Loader } from "../../components/Loaders/Loader";
import * as api from '../../api';

import styles from './Exam.module.scss';
import inputStyles from '../../components/Inputs/InputText.module.scss';
import { Line } from '../../components/Line';
import { Button } from 'react-bootstrap';

export function ExamPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  const postExamData = (data: any) => {
    api.post(`${api.endpoint}/exams/${id}`, data, (data: any) => {
      if (data.message) toast(data.message, { type: 'error' });
      else setData(data);
      setLoading(false);
    });
  };
  const startExam = () => {
    if (username) {
      postExamData({ username });
    } else {
      toast(`Введіть своє прізвище та ім'я 😉`, { type: 'default' });
    }
  };

  useEffect(() => {
    postExamData({});
  }, []);

  if (data === null) {
    return <Loader className={!isLoading ? styles.notFound : ''} />; 
  }
  
  const { examData, progress } = data;
  return (
    <div className={styles.exam}>
      {!progress.started ? (
        <div className={styles.start}>
        <div className={styles.title}>{examData.title}</div>
        <div className={styles.description}>Кількість запитань: {examData.questionsCount}</div>
        <div className={styles.description}>Дата створення: {(new Date(examData.createdAt)).toLocaleDateString()}</div>
        <Line />
        <div className={inputStyles.inputGroup}>
          <input type="text" className={inputStyles.input} placeholder="Ваше прізвище та ім'я"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={inputStyles.inputLabel}>Ваше прізвище та ім'я</label>
        </div>
        <Button className={styles.startButton} onClick={startExam}>Почати тестування</Button>
      </div>
      ) : (<ExamQuestion data={data} postExamData={postExamData} />)}
    </div>
  );
}

function ExamQuestion({ data, postExamData }: any) {
  const [myAnswers, setMyAnswers] = useState<any>({});
  const { question, description } = data.progress;

  const changeAnswer = (index: number, value: boolean) => {
    const newAnswers = {
      ...myAnswers,
      [index]: value,
    };
    console.log(newAnswers)
    setMyAnswers(newAnswers);
  };
  const next = () => {
    postExamData({ answers: myAnswers });
    setMyAnswers({});
  }

  if (data.progress.ended) {
    return (
      <div className={styles.ended}>
        <TypeAnimation repeat={Infinity} style={{ fontWeight: 'bold', fontSize: '30px' }} sequence={[
          'Ви пройшли тестування! Ваші відповіді записані. 😎',
          1500,
          'Наші нано-хом\'ячки наполегливо працюють над проектом 🧐',
          1500,
          'Найближчим часом буде доступна статистика, детальні налаштування та багато іншого! 😉',
          1500,
        ]} speed={50} deletionSpeed={70} />
      </div>
    );
  }
  if (description) {
    return (
      <div className={styles.answersDescription}>
        {Object.entries(description).map(([answerIndex, desc]: any, index: number) => {
          return (
            <div className={styles.answerText}>
              <div className={styles.answerIndex}>Відповідь {String.fromCharCode(65 + Number(answerIndex))}</div>
              <TypeAnimation sequence={[
                index * 5000,
                desc,
              ]} speed={80} cursor={false} />
            </div>
          )})}
        <Button onClick={() => postExamData({ next: true })}>Продовжити</Button>
      </div>
    );
  }
  return (
    <div className={styles.question}>
      <div className={styles.questionTitle}>{question.title}</div>
      <div className={styles.answersList}>
        {question.answers.map((answer: any, index: number) => {
          return (
            <div key={index} className={styles.answer}>
              <input type="checkbox"
                checked={!!myAnswers[index]}
                onChange={(e) => changeAnswer(index, e.target.checked)}
              />
              {answer.text}
            </div>
          );
        })}
      </div>
      <Button onClick={next}>Продовжити</Button>
    </div>
  );
}
