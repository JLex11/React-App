import { motion } from 'framer-motion';
import 'material-symbols';
import { useSelector } from 'react-redux';
import { useUser } from '../hooks/useUser';
import { Header } from './Header';
import { LoginForm } from './LoginForm';
import { Note } from './Note';
import { NoteForm } from './NoteForm';
import { Notification } from './Notification';

export const App = () => {
  const notes = useSelector(state => state.notes);
  const { user } = useUser();

  const sortCondition = (a, b, noteKey, increment) => {
    noteKey = noteKey || 'date';
    increment = increment || 'desc';
    if (a[noteKey] > b[noteKey]) return increment === 'desc' ? -1 : 1;
    if (a[noteKey] < b[noteKey]) return increment === 'desc' ? 1 : -1;
    return 0;
  };

  return (
    <div className='App'>
      <Header />
      <Notification/>
      {!user
        ? <LoginForm />
        : <NoteForm />
      }
      <motion.div layout className='Notes'>
        {notes.sort((a, b) => sortCondition(a, b, 'date', 'desc'))
          .map((note, i) =>
            <Note
              key={note.id}
              note={note}
              timeTransition={'0.' + i}
            />
          )}
      </motion.div>
    </div>
  );
};