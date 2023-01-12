import styles from './styles/arrows.module.sass';
import prev from '../../../../assets/icons/next.svg'


function ArrowNext(props: any) {

  return (
    <button className={styles.next} onClick={props.onClick}>
      <img src={prev} alt="previous slides" />
    </button>
  );
}

export default ArrowNext;

