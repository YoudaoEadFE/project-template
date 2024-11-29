import s from './index.module.css';

export default function Custom500() {
  return (
    <div className={s['custom500']}>
      <div className={s['status']}>
        <h1 className={s['status-code']}>500</h1>
        <span className={s['status-message']}>Server-side error occurred</span>
      </div>
    </div>
  );
}
