import clsx from 'clsx';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { selectEditingTemplate } from '../../../redux/templates/selector';
import { clearTemplates } from '../../../redux/templates/slice';
import { setCabinetPage } from '../../../redux/pages/slice';
import { CabinetPages } from '../../../redux/pages/types';
import { Line } from '../../../components/Line';
import { Modal } from '../../../components/Modal/Modal';
import * as api from '../../../api';

import styles from './CreateTemplate.module.scss';
import inputStyles from '../../../components/Inputs/InputText.module.scss';
import { SpinnerLoader } from '../../../components/Loaders/Spinner';

export function CreateTemplate() {
  const dispatch = useDispatch();
  const editTemplate = useSelector(selectEditingTemplate);
  const [title, setTitle] = useState(editTemplate ? editTemplate.title : '');
  const [questionEdit, setQuestionEdit] = useState(-1);
  // Deep clone object, because Redux state is read-only.
  const [questions, setQuestions] = useState<any>
    (editTemplate ? JSON.parse(JSON.stringify(editTemplate.questions)) : []);

  const saveTemplate = () => {
    const template = {
      title,
      questions,
    };

    const endpoint = api.endpoint + (editTemplate ? `/templates/edit/${editTemplate._id}` : '/templates/create');
    api.post(endpoint, template, (data) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        toast('Шаблон успішно збережено!', { type: 'success' });
        dispatch(clearTemplates());
        dispatch(setCabinetPage(CabinetPages.ExamTemplates));
      }
    });
  }

  const openQuestionEdit = (index: number) => setQuestionEdit(index);
  const closeQuestionEdit = () => setQuestionEdit(-1);
  const updateQuestion = (question: any, i: number) => {
    if (!question) {
      questions.splice(i, 1);
    } else {
      questions[i] = question;
    }
    setQuestions([...questions]);
  }
  const addQuestion = () => {
    setQuestions([...questions, {
      title: '',
      type: 'checkbox',
      answers: [
        {
          text: '',
          description: '',
          correct: false,
        }
      ],
    }]);
  }

  return (
    <div className={styles.template}>
      <div className={inputStyles.inputGroup}>
        <input type="text" className={inputStyles.input} placeholder="Назва шаблону"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={inputStyles.inputLabel}>Назва шаблону</label>
      </div>

      <Table className={styles.questionsTable} variant="dark" striped bordered>
        <tbody>
          {questions.map((question: any, i: number) => {

            return <TemplateQuestion key={i} index={i}
              question={question}
              openEdit={() => openQuestionEdit(i)}
              updateQuestion={updateQuestion}
            />;
          })}
        </tbody>
      </Table>

      {questionEdit !== -1 && <EditQuestionModal
        question={questions[questionEdit]}
        updateQuestion={(q: any) => updateQuestion(q, questionEdit)}
        close={closeQuestionEdit}
      />}
      <Button variant="light" onClick={addQuestion}>Додати запитання</Button>
      <Line />
      <Button className={styles.save} onClick={saveTemplate}>Зберегти шаблон</Button>
    </div>
  );
}

function TemplateQuestion({ question, index, updateQuestion, openEdit }: any) {
  return (
    <tr className={clsx(styles.question, 'align-middle text-center')} role='button'>
      <td>{index + 1}</td>
      <td onClick={openEdit}>{question.title}</td>
      <td role="button" onClick={() => updateQuestion(null, index)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}

function EditQuestionModal({ question, updateQuestion, close }: any) {
  const addAnswer = () => {
    question.answers = [...question.answers, {
      text: '',
      description: '',
      correct: false,
    }];
    updateQuestion(question);
  }

  return (
    <Modal close={close} className={styles.questionModal}>
      <div className={clsx(inputStyles.inputGroup, styles.question)}>
        <input type="text" className={inputStyles.input} placeholder="Запитання"
          value={question.title}
          onChange={(e) => {
            question.title = e.target.value;
            updateQuestion(question);
          }}
        />
        <label className={inputStyles.inputLabel}>Запитання</label>
      </div>

      <div className={styles.answersList}>
        {question.answers.map((answer: any, i: number) => {
          const updateAnswer = (answer: any) => {
            if (!answer) {
              question.answers.splice(i, 1);
            } else {
              question.answers[i] = answer;
            }
            updateQuestion(question);
          }
          return <TemplateAnswer key={i} index={i}
            question={question}
            answer={answer}
            updateAnswer={updateAnswer}
          />;
        })}
      </div>

      <Button variant="dark" onClick={addAnswer}>Додати відповідь</Button>
      <Line />
      <Button onClick={close} className={styles.save}>Зберегти</Button>
    </Modal>
  );
}


function TemplateAnswer({ question, answer, index, updateAnswer }: any) {
  const [isGenerating, setIsGenerating] = useState(false);
  const generateDescription = () => {
    setIsGenerating(true);

    api.post(`${api.endpoint}/openai/generate/description`, {
      question: question.title,
      answer: answer.text,
    }, (data) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        answer.description = data.result;
        updateAnswer(answer);
      }
      setIsGenerating(false);
    });
  }

  return (
    <div className={styles.answer}>
      <div style={{ flex: '1 1 0' }}>
        <div className={styles.textarea}>
          <label className={styles.textareaLabel}>
            Відповідь {String.fromCharCode(65 + index)} (правильна?
            <input type='checkbox' className={styles.checkbox} checked={answer.correct} onChange={(e) => {
              answer.correct = e.target.checked;
              updateAnswer(answer);
            }} />)
          </label>
          <TextareaAutosize value={answer.text} onChange={(e) => {
            answer.text = e.target.value;
            updateAnswer(answer);
          }} />
        </div>

        <div className={styles.textarea} style={{ marginTop: 15 }}>
          <label className={styles.textareaLabel}>Пояснення</label>
          <div className={styles.description}>
            <TextareaAutosize value={answer.description} spellCheck="false" onChange={(e) => {
              answer.description = e.target.value;
              updateAnswer(answer);
            }} />
            <Button className={styles.generate} onClick={generateDescription} variant='success'>
              {isGenerating ? <SpinnerLoader /> : 'Генерувати'}
            </Button>
          </div>
        </div>
      </div>

      <div role="button" className={styles.delete} onClick={() => updateAnswer(null)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}
