import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Daria0751</p>
          <p>
            Contact us:
            <a href="darak0751@gmail.com"> Daria Karanda</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;