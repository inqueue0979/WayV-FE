import "../../globals.css";

export const metadata = {
  title: "프로젝트 | 웹브릿지",
  description: "웹브릿지 프로젝트 관리 페이지",
};

export default function ProjectsLayout({ children }) {
  return (
    <section>
        {children}
    </section>
  );
}
