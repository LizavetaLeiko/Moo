import styles from './styles/defaultBtn.module.sass';

interface submitBtn{
  title: string,
  disabled?: boolean,
  onClick?: any,
}

function DefaultBtn( props: submitBtn) {

  return (
    <>
      <button onClick={props.onClick} disabled={props.disabled} className={styles.default_btn}>{props.title}</button>
    </>
  );
}

export default DefaultBtn;