import React, { useState, useEffect } from 'react'
import { MdOutlineDownloadDone } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import axios from "axios";
let id = sessionStorage.getItem("id");
console.log(id);

const Todo1 = () => {
    const [IsCompleted, setIsCompleted] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [CompletedTodo, setCompletedTodo] = useState([]);
    const [currentEdit, setCurrentEdit] = useState([]);
    const [currentEditedItem, setCurrentEditedItem] = useState("");

    const handleComplete = async(index,cid) => {
        let completed = { ...allTodos[index] }
        let UpdateCompletedTodo = [...CompletedTodo];
        UpdateCompletedTodo.push(completed);
        setCompletedTodo(UpdateCompletedTodo);
        localStorage.setItem('completed',JSON.stringify(UpdateCompletedTodo));
        handleDelete(cid);
    }

    const handleDeleteComplete = async(did) => {
        let reduceCompletedTodo = [...CompletedTodo];
        reduceCompletedTodo.splice(did, 1);
        localStorage.setItem('completed',JSON.stringify(reduceCompletedTodo));
        setCompletedTodo(reduceCompletedTodo);
    }

    const handleDelete = async (cardid) => {
        if (id) {
            await axios.delete(`${window.location.origin}/api/todo/${cardid}`, { data: { id: id }, }).then((response) => { console.log(response) })
            let reducedTodo = [...allTodos];
            reducedTodo.splice(cardid, 1);
            setTodos(reducedTodo);
        } else {
            console.error("Please Login first");
        }

    }

    const handleAddTodo = async () => {
        if (id) {
            let newTodoItem = {
                title: newTitle,
                body: newDescription
            }

            let updatedTodoArr = [...allTodos];
            updatedTodoArr.push(newTodoItem)
            setTodos(updatedTodoArr);
            await axios.post(`${window.location.origin}/api/todo`, { title: newTodoItem.title, body: newTodoItem.body, id: id }).then((Response) => { console.log(Response) });
        } else {
            console.error("Please Login first");
        }

    }

    const handleEdit = (index, item) => {
        setCurrentEdit(index);
        setCurrentEditedItem(item);
    }

    const handleUpdateTitle = (value) => {
        setCurrentEditedItem((prev) => {
            return { ...prev, title: value }
        })
    }

    const handleUpdateDescription = (value) => {
        setCurrentEditedItem((prev) => {
            return { ...prev, body: value }
        })
    }

    const handleUpdateTodo = async (tid) => {
        let newtodo = [...allTodos];
        newtodo[currentEdit] = currentEditedItem;
        setTodos(newtodo);
        await axios.patch(`${window.location.origin}/api/todo/${tid}`, { title: currentEditedItem.title, body: currentEditedItem.body, id: id }).then((response) => { console.log(response) })
        setCurrentEdit("");
    }
    useEffect(() => {
        let completedtodo = JSON.parse(localStorage.getItem('completed'));
        if(completedtodo){
            setCompletedTodo(completedtodo);
        }else{
            console.log("lol 2")
        }

    }, [])
    

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get(`${window.location.origin}/api/todo/${id}`)
                .then(
                    (response) => {
                        if (response.data.message == "No Todos") {
                            console.log("lol")
                        } else {
                            setTodos(response.data);
                        }
                    });
        };
        if (id) {
            fetch();
        }
    }, [handleAddTodo])
    return (
        <section className='h-[100vh] flex justify-center items-center flex-col bg-gray-900'>
            <div className='border-2 border-[#574cf3] rounded-lg bg-transparent flex justify-center items-center md:w-[40vw] p-[20px] etxt-white'>
                <div className='flex flex-col justify-center items-center'>
                    <input
                        type="text"
                        className='border border-[#302899] text-black text-sm rounded-lg block w-[30vw] p-2.5'
                        placeholder='Title'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className='border border-[#302899] text-black text-sm rounded-lg block w-[30vw] mt-[20px] p-2.5'
                        placeholder='Description'
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </div>
                <button className='text-white bg-[#4a7cfa] rounded-[20px] ml-[10px] w-[100px] p-[10px]' onClick={handleAddTodo}>New Todo</button>
            </div>
            <div className='mt-[3vh] space-x-4 flex justify-center items-center text-white'>
                <button className={`md:h-[30px] md:w-[50px] h-auto w-[60px] rounded-lg border-2 ${IsCompleted === true ? 'bg-transparent' : 'bg-[#574cf3] text-white'} border-[#574cf3]`} onClick={() => setIsCompleted(false)}>Todo</button>
                <button className={`md:h-[30px] md:w-[100px] h-auto w-[110px] rounded-lg border-2 ${IsCompleted === false ? 'bg-transparent' : 'bg-[#574cf3] text-white'} border-[#574cf3]`} onClick={() => setIsCompleted(true)}>Completed</button>
            </div>
            <div className='border-2 border-[#574cf3] rounded-lg bg-transparent m-[3vh] h-auto w-[75vw] p-4 flex flex-col justify-center items-center gap-4'>
                {IsCompleted === false && (
                    <>
                        {allTodos.length === 0 ? (
                            <div className='text-white'>No todos yet</div>
                        ) : (
                            allTodos.map((item, index) => (
                                <div key={index}>
                                    {currentEdit === index ? (
                                        <div>
                                            <div className='flex items-center justify-start space-x-10 rounded-lg flex-row h-auto w-[70vw] bg-[#f5f5f5] shadow-lg p-[20px] break-all'>
                                                <div className='flex justify-center items-start flex-col w-[50vw]'>
                                                    <input type="text" className='border border-[#302899] text-black text-sm rounded-lg block w-[50vw] p-2.5' placeholder='Title Update' onChange={(e) => handleUpdateTitle(e.target.value)} value={currentEditedItem.title} />
                                                    <div className='border-1 border-t-[#574cf3] border-transparent relative flex items-start justify-center p-[1vw]'>
                                                        <input type="text" className='border border-[#302899] text-black text-sm rounded-lg block w-[50vw] p-2.5' placeholder='Description Update' onChange={(e) => handleUpdateDescription(e.target.value)} value={currentEditedItem.description} />
                                                    </div>
                                                </div>
                                                <div className='p-[2vw]'>
                                                    <button onClick={() => handleUpdateTodo(item._id)}><MdOutlineDownloadDone size={30} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className='flex items-center justify-start space-x-2 rounded-lg flex-row h-auto w-[70vw] bg-[#f5f5f5] shadow-lg p-[20px] break-all transform hover:scale-105 transition duration-300 ease-in-out'>
                                                <div className='flex justify-center items-start flex-col w-[50vw]'>
                                                    <p className='font-semibold'>{item.title}</p>
                                                    <div className='flex items-start justify-center p-[1vw]'>
                                                        {item.body}
                                                    </div>
                                                </div>
                                                <div className='space-x-6 space-y-3 flex justify-center items-center'>
                                                    <button className='text-white bg-[#4a7cfa] mt-[10px] rounded-[20px] w-[100px] p-[10px]' onClick={() => handleEdit(index, item)}>Edit</button>

                                                    <button className="flex justify-center items-center h-3" onClick={() => handleComplete(index,item._id)}><MdOutlineDownloadDone size={35} /></button>

                                                    <button onClick={() => handleDelete(item._id)}><FaTrashCan size={30} /></button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </>
                )}

                {IsCompleted === true && (
                    <>
                        {CompletedTodo.length === 0 ? (
                            <div className='text-white'>No completions yet</div>
                        ) : (
                            CompletedTodo.map((item, index) => (
                                <div key={index}>
                                    <div className='flex items-center justify-start space-x-2 rounded-lg flex-row h-auto w-[70vw] bg-[#f5f5f5] shadow-lg p-[20px] break-all transform hover:scale-105 transition duration-300 ease-in-out'>
                                        <div className='flex justify-center items-start flex-col w-[50vw]'>
                                            <div className='font-semibold'>{item.title}</div>
                                            <div className='flex items-start justify-center p-[1vw]'>
                                                {item.body}
                                            </div>
                                        </div>
                                        <div className='space-x-6 space-y-3 flex justify-center items-center'>
                                        <button onClick={() => handleDeleteComplete(index)}><FaTrashCan size={30} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default Todo1