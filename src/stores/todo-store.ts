import { ITodo } from '@/components/todo-form'
import { create } from 'zustand'

interface IResponse<T> extends Response {
  jsonBody?: T
}
interface IRequestInit<Body> extends Omit<RequestInit, 'body'> {
  body?: Body
}

async function request<T, Body = void>(input: RequestInfo | URL, init?: IRequestInit<Body>): Promise<IResponse<T>> {
  const fetchInit = {
    ...init,
    body: JSON.stringify(init?.body)
  }
  const res = await  fetch(input, fetchInit) as IResponse<T>;
  if (res.ok === false) {
    throw new Error(await res.text());
  }
  res.jsonBody = await res.json() as T;
  return res;
}

export interface ITodoStore {
    todos: ITodo[]
    add: (todo: ITodo) => Promise<void>
    markAsDone: (todo: ITodo) => void
    remove: (todo: ITodo) => void
    load: () => Promise<void>
}
export const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  load: async () => {
    const res = await request<ITodo[]>('https://66dea955de4426916ee1e259.mockapi.io/todos');
    set({ todos: res.jsonBody })
  },
  add: async (todo: ITodo) => {
    const res = await request<ITodo, ITodo>('https://66dea955de4426916ee1e259.mockapi.io/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: todo
    })
    set((state) => ({ todos: [...state.todos, res.jsonBody!] }))
  },
  markAsDone: async (todo: ITodo) => {
    const res = await request<ITodo, ITodo>(`https://66dea955de4426916ee1e259.mockapi.io/todos/${todo.id}`, {
      method: 'PUT',
      body: { ...todo, done: true }
    })
    console.dir(res.jsonBody);
    set((state) => ({ todos: state.todos.map((t) => t === todo ? { ...t, done: true } : t) }))
  },
  remove: async (todo: ITodo) => {
    const res = await request<ITodo>(`https://66dea955de4426916ee1e259.mockapi.io/todos/${todo.id}`, {
      method: 'DELETE',
    })
    console.dir(res.jsonBody);
    set((state) => ({ todos: state.todos.filter((t) => t !== todo) }))
  },
}))