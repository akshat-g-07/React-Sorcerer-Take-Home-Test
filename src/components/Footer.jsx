import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Tooltip } from "@mui/material";

const Footer = () => {
  return (
    <footer className="fixed w-screen cursor-pointer bottom-0 h-auto flex justify-center items-center text-center font-semibold py-1 bg-slate-500 text-white">
      Made By&nbsp;
      <a
        href="https://akshat-garg.netlify.app"
        target="_blank"
        rel="noreferrer"
        className="no-underline"
      >
        <div className="hover:decoration-dotted hover:underline h-full flex items-center text-white">
          Akshat Garg
          <sup className="scale-50 origin-top-left">
            <ArrowOutwardIcon />
          </sup>
        </div>
      </a>
      <div className="animate-pulse">
        <Tooltip title="LinkedIn">
          <a
            href="https://www.linkedin.com/in/akshat-garg-580322241/"
            target="_blank"
            rel="noreferrer"
            className="text-white"
          >
            <LinkedInIcon />
          </a>
        </Tooltip>
        &nbsp; &nbsp;
        <Tooltip title="Github">
          <a
            href="https://github.com/akshat-g-07"
            target="_blank"
            rel="noreferrer"
            className="text-white"
          >
            <GitHubIcon />
          </a>
        </Tooltip>
        &nbsp; &nbsp;
        <Tooltip title="Mail: akshatg805@gmail.com">
          <a
            href="mailto:akshatg805@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="text-white"
          >
            <MailIcon />
          </a>
        </Tooltip>
      </div>
    </footer>
  );
};

export default Footer;
