import styles from './styles/arrows.module.sass';
import prev from '../../../../assets/icons/next.svg';


function ArrowNext(props: any) {

  return (
    <button className={styles.next}>
      <img src={prev} alt="previous slides" onClick={props.onClick} />
    </button>
  );
}

export default ArrowNext;

