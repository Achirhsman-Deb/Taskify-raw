const router = require('express').Router();
const { createTodo,getTodos,updateTodo,deleteTodo } = require("../controllers/controller");

router.get('/:id', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);



module.exports = router;