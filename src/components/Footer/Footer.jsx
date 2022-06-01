import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p className="footer__text">
        Phone Book App | &copy; 2022 | All Rights Reserved | Developed by{' '}
        <a
          className={s.githubLink}
          href="https://github.com/MykhailoKutsyi"
          noopener="true"
          noreferrer="true"
          rel="noreferrer"
          target="_blank"
        >
          Mykhailo Kutsyi
        </a>
      </p>
    </footer>
  );
}
