import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import style from './Page404.module.scss';

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>404 Page not found</title>
      </Helmet>
      <section className={style.page}>
        <h1 className={style.title}>PAGE NOT FOUND</h1>
        <span className={style.code}>404</span>
        <Link className={style.backBtn} to={'/'}>
          <span className={style.backBtn__text}>GO TO MAIN</span>
        </Link>
      </section>
    </>
  );
};

export default Page404;
