import { useDispatch, useSelector } from 'react-redux';
import { selectCabinetPage } from '../../redux/pages/selector';
import { setCabinetPage } from '../../redux/pages/slice';
import { CabinetPages } from '../../redux/pages/types';
import { ExamTemplates } from './ExamTemplates/ExamTemplates';
import { CreateTemplate } from './CreateTemplate/CreateTemplate';
import { CreateExam } from './CreateExam/CreateExam';
import { Exams } from './Exams/Exams';

import styles from './Cabinet.module.scss';
import { logout } from '../../redux/account/slice';

const pages = {
  'Список шаблонів': [CabinetPages.ExamTemplates, CabinetPages.CreateTemplate],
  'Список тестувань': [CabinetPages.Exams, CabinetPages.CreateExam],
};

export function Cabinet() {
  const dispatch = useDispatch();
  const page = useSelector(selectCabinetPage);

  const onLogout = () => {
    dispatch(logout())
  };

  return (
    <div className={styles.cabinet}>
      <div className={styles.menu}>
        <ul>
          {Object.entries(pages).map(([name, pages]) => {
            const pageId = pages[0];
            return (
              <li
                key={pageId}
                className={`${pages.includes(page) ? styles.active : ''}`}
                onClick={() => dispatch(setCabinetPage(pageId as CabinetPages))}
              >
                {name}
              </li>
            );
          })}
          <li className={styles.logout} onClick={onLogout}>Вийти з акаунту</li>
        </ul>
      </div>

      <div className={styles.content}>
        {page === CabinetPages.ExamTemplates && <ExamTemplates />}
        {page === CabinetPages.CreateTemplate && <CreateTemplate />}
        {page === CabinetPages.Exams && <Exams />}
        {page === CabinetPages.CreateExam && <CreateExam />}
      </div>
    </div>
  )
}
