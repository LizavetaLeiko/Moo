import styles from './styles/arrows.module.sass';
import prev from '../../../../assets/icons/prev.svg'


function ArrowPrev(props: any) {

  return (
    <button className={styles.prev} onClick={props.onClick}>
      <img src={prev} alt="previous slides" />
    </button>
  );
}

export default ArrowPrev;

