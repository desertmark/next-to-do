import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { todoTitle } from "./primitives";
import { useTheme } from "@/hooks/use-theme";
export interface ITodo {
  id?: string;
  title: string;
  description: string;
  date: Date;
  done: boolean;
}
export default function TodoForm({
  onSubmit,
}: {
  onSubmit: (todo: ITodo) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleForm = () => {
    onSubmit({
      title,
      description,
      date: new Date(),
      done: false,
    });
  };

  return (
    <Card className="w-[100%] max-w-[500px]">
      <CardHeader
        className={todoTitle({ done: false, isDark: useTheme().isDark })}
      >
        Add a new task
      </CardHeader>
      <CardBody className="gap-3">
        <Input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          value={title}
        />
        <Input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          value={description}
        />
      </CardBody>
      <CardFooter className="gap-3 justify-between">
        <div>
          <small className="text-default-400 font-weight">
            {new Date().toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </small>
        </div>
        <div className="flex gap-3">
          <Button color="primary" onClick={handleForm}>
            Add task
          </Button>
          <Button
            onClick={() => {
              setTitle("");
              setDescription("");
            }}
          >
            Clear
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
