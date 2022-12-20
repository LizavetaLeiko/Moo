
interface IInput {
  error?: boolean,
  error2?: boolean,
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: any,
  stateName?: string,
  // setVisability?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVisability?:any,
  visability?: boolean,
  type?: string,
  placeholder?: string,
  eye?: boolean,
  label?: string,
  // value?: string,
}

export default IInput;
