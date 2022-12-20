import styles from './styles/defaultBtn.module.sass';
import IBtn from './interface/IBtn'


function DefaultBtn( props: IBtn) {

  return (
    <>
      <button onClick={props.onClick} disabled={props.disabled} className={styles.default_btn} style={{maxWidth: `${props.maxWidth}`, marginBottom: `${props.marginBottom}`, padding: `${props.padding}`}}>{props.title}</button>
    </>
  );
}

export default DefaultBtn;