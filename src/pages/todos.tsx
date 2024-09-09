import DefaultLayout from "@/layouts/default";
import TodoForm from "@/components/todo-form";
import { useTodoStore } from "@/stores/todo-store";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import Todo from "@/components/todo";
import { useEffect, useState } from "react";

export default function TodosPage() {
  const todoStore = useTodoStore();
  useEffect(() => {todoStore.load()}, []);
  const [error, setError] = useState("");
  return (
    <DefaultLayout>
      <Modal isOpen={!!error} onClose={() => setError("")}>
        <ModalContent>
          <ModalHeader className="text-danger-600">Ups, something happened!</ModalHeader>
          <ModalBody> {error}</ModalBody>
          <ModalFooter className="justify-center">
            <Button onClick={() => setError("")} color="danger">
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <section className="max-w-[500px] w-[100%]">
          <h1 className="text-2xl font-bold">Do you need to add a new task?</h1>
        </section>
        <TodoForm onSubmit={(todo) => {
          todoStore.add(todo).catch((err) => setError(err.message));
        }} />
        <Divider />
        <section className="max-w-[500px] w-[100%]">
          <h1 className="text-2xl font-bold">
            These are the things you need to do!
          </h1>
        </section>
        <section className="w-[100%]">
          <div className="flex flex-wrap gap-3">
            {todoStore.todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                onDone={(t) => todoStore.markAsDone(t)}
                onRemove={(t) => todoStore.remove(t)}
              />
            ))}
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
}
