// import React, { useEffect, useState } from 'react';
// import { v4 as uuid } from 'uuid';
// import { MdOutlineClose } from 'react-icons/md';
// import { useDispatch } from 'react-redux';
// import { AnimatePresence, motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { addTodo, updateTodo } from '../slices/todoSlice';
// import styles from '../styles/modules/modal.module.scss';
// import Button from './Button';

// const dropIn = {
//   hidden: {
//     opacity: 0,
//     transform: 'scale(0.9)',
//   },
//   visible: {
//     transform: 'scale(1)',
//     opacity: 1,
//     transition: {
//       duration: 0.1,
//       type: 'spring',
//       damping: 25,
//       stiffness: 500,
//     },
//   },
//   exit: {
//     transform: 'scale(0.9)',
//     opacity: 0,
//   },
// };

// function TodoModal({ type, modalOpen, setModalOpen, todo }) {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [status, setStatus] = useState('incomplete');

//   useEffect(() => {
//     if (type === 'update' && todo) {
//       setTitle(todo.title);
//       setStatus(todo.status);
//     } else {
//       setTitle('');
//       setStatus('incomplete');
//     }
//   }, [type, todo, modalOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title === '') {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (title && status) {
//       if (type === 'add') {
//         dispatch(
//           addTodo({
//             id: uuid(),
//             title,
//             status,
//             time: new Date().toLocaleString(),
//           })
//         );
//         toast.success('Task added successfully');
//       }
//       if (type === 'update') {
//         if (todo.title !== title || todo.status !== status) {
//           dispatch(updateTodo({ ...todo, title, status }));
//           toast.success('Task Updated successfully');
//         } else {
//           toast.error('No changes made');
//           return;
//         }
//       }
//       setModalOpen(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {modalOpen && (
//         <motion.div
//           className={styles.wrapper}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className={styles.container}
//             variants={dropIn}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <motion.div
//               className={styles.closeButton}
//               onKeyDown={() => setModalOpen(false)}
//               onClick={() => setModalOpen(false)}
//               role="button"
//               tabIndex={0}
//               // animation
//               initial={{ top: 40, opacity: 0 }}
//               animate={{ top: -10, opacity: 1 }}
//               exit={{ top: 40, opacity: 0 }}
//             >
//               <MdOutlineClose />
//             </motion.div>

//             <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
//               <h1 className={styles.formTitle}>
//                 {type === 'add' ? 'Add' : 'Update'} TODO
//               </h1>
//               <label htmlFor="title">
//                 Title
//                 <input
//                   type="text"
//                   id="title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </label>
//               <label htmlFor="type">
//                 Status
//                 <select
//                   id="type"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 >
//                   <option value="incomplete">Incomplete</option>
//                   <option value="complete">Completed</option>
//                 </select>
//               </label>
//               <div className={styles.buttonContainer}>
//                 <Button type="submit" variant="primary">
//                   {type === 'add' ? 'Add Task' : 'Update Task'}
//                 </Button>
//                 <Button variant="secondary" onClick={() => setModalOpen(false)}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export default TodoModal;

import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('please enter a title.');
      return;
    }
    if (title && status && description) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            description,
            status,
            time: new Date().toLocaleDateString(),
          })
        );
        toast.success('Task Added Successfully');
        setModalOpen(false);
      }
      if (type === 'update') {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.description !== description
        ) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              description,
              status,
            })
          );
        } else {
          toast.error('No change made');
        }
      }
      setModalOpen(false);
    }
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {type === 'update' ? 'Update' : 'Add'} task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                type="text"
                id="title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === 'update' ? 'Update' : 'Add'} task
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
