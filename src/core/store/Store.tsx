import { Reducer, useReducer } from "react";
import reducer, { Action } from "./reducer";
import { Provider, State, initialState } from "./context";

interface Props {
  children: React.ReactNode;
}

export default function Store({ children }: Props) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  return <Provider value={[state, dispatch]}>{children}</Provider>;
}
