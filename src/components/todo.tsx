import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { ITodo } from "./todo-form";
import cx from 'classnames';

export interface ITodoProps {
  todo: ITodo;
  onDone: (todo: ITodo) => void;
  onRemove: (todo: ITodo) => void;
}

export default function Todo({ todo, onDone, onRemove }: ITodoProps) {
  return (
    <Card className="min-w-[300px] w-fit flex flex-auto">
      <CardHeader className={cx("font-bold text-2xl", { ['line-through']: todo.done })}>{todo.title}</CardHeader>
      <CardBody className="gap-3">
        <p>{todo.description}</p>
      </CardBody>
      <CardFooter className="gap-3 justify-between">
        <div>
          <small className="text-default-400 font-weight">
            {todo.date.toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </small>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="success"
            isDisabled={todo.done}
            onClick={() => onDone(todo)}
          >
            Done
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="danger"
            onClick={() => onRemove(todo)}
          >
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
