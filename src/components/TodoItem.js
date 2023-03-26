// import { format } from 'date-fns';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import React, { useEffect, useState } from 'react';
// import { MdDelete, MdEdit } from 'react-icons/md';
// import { useDispatch } from 'react-redux';
// import { deleteTodo, updateTodo } from '../slices/todoSlice';
// import styles from '../styles/modules/todoItem.module.scss';
// import { getClasses } from '../utils/getClasses';
// import CheckButton from './CheckButton';
// import TodoModal from './TodoModal';

// const child = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//   },
// };

// function TodoItem({ todo }) {
//   const dispatch = useDispatch();
//   const [checked, setChecked] = useState(false);
//   const [updateModalOpen, setUpdateModalOpen] = useState(false);

//   useEffect(() => {
//     if (todo.status === 'complete') {
//       setChecked(true);
//     } else {
//       setChecked(false);
//     }
//   }, [todo.status]);

//   const handleCheck = () => {
//     setChecked(!checked);
//     dispatch(
//       updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
//     );
//   };

//   const handleDelete = () => {
//     dispatch(deleteTodo(todo.id));
//     toast.success('Todo Deleted Successfully');
//   };

//   const handleUpdate = () => {
//     setUpdateModalOpen(true);
//   };

//   return (
//     <>
//       <motion.div className={styles.item} variants={child}>
//         <div className={styles.todoDetails}>
//           <CheckButton checked={checked} handleCheck={handleCheck} />
//           <div className={styles.texts}>
//             <p
//               className={getClasses([
//                 styles.todoText,
//                 todo.status === 'complete' && styles['todoText--completed'],
//               ])}
//             >
//               {todo.title}
//             </p>
//             <p className={styles.time}>
//               {format(new Date(todo.time), 'p, MM/dd/yyyy')}
//             </p>
//           </div>
//         </div>
//         <div className={styles.todoActions}>
//           <div
//             className={styles.icon}
//             onClick={() => handleDelete()}
//             onKeyDown={() => handleDelete()}
//             tabIndex={0}
//             role="button"
//           >
//             <MdDelete />
//           </div>
//           <div
//             className={styles.icon}
//             onClick={() => handleUpdate()}
//             onKeyDown={() => handleUpdate()}
//             tabIndex={0}
//             role="button"
//           >
//             <MdEdit />
//           </div>
//         </div>
//       </motion.div>
//       <TodoModal
//         type="update"
//         modalOpen={updateModalOpen}
//         setModalOpen={setUpdateModalOpen}
//         todo={todo}
//       />
//     </>
//   );
// }

// export default TodoItem;

import { format } from 'date-fns';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import TodoModal from './TodoModal';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted successfully');
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  return (
    <div>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          []
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.todoText}>{todo.description}</p>
            <p className={styles.time}>{todo.time}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div className={getClasses([styles.icon, styles['icon--delete']])}>
            <MdDelete
              onClick={handleDelete}
              onKeyDown={handleDelete}
              role="button"
              tabIndex={0}
            />
          </div>
          <div className={getClasses([styles.icon, styles['icon--edit']])}>
            <MdEdit
              onClick={handleUpdate}
              onKeyDown={handleUpdate}
              role="button"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </div>
  );
}

export default TodoItem;
