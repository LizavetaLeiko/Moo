import styles from './styles/arrows.module.sass';
import prev from '../../../../assets/icons/next.svg'


function ArrowNext(props: any) {

  const onNextClick = ()=>{
    props.onClick();
    props.setLimit(() => props.limit + 5);
  }

  return (
    <button className={styles.next} onClick={onNextClick}>
      <img src={prev} alt="previous slides" />
    </button>
  );
}

export default ArrowNext;

