import Link from "next/link";

export default function HomePage() {
  return (
    <div className="f1-shell">
      <header className="f1-hero">
        <nav className="f1-topbar" aria-label="F1 test navigation">
          <Link className="f1-brand" href="/">
            F1 Driver Match
          </Link>
          <div className="f1-nav-meta">
            <span className="f1-season">2026 Grid Edition</span>
          </div>
        </nav>

        <section className="f1-hero-content">
          <p className="f1-kicker">Paddock Personality Test</p>
          <h1>你最像哪位 F1 车手？</h1>
          <p>
            回答 40 道比赛情境题，看看你的驾驶人格更接近 Max、Lewis、Charles、Lando、
            Oscar、Fernando，还是今年围场里的另一位车手。
          </p>
          <Link className="f1-start" href="/quiz">
            开始测试
          </Link>
        </section>
      </header>

      <main>
        <section className="f1-intro" aria-label="Test notes">
          <article>
            <strong>40</strong>
            <span>道情境题</span>
          </article>
          <article>
            <strong>22</strong>
            <span>位车手结果</span>
          </article>
          <article>
            <strong>娱乐向</strong>
            <span>不是科学诊断</span>
          </article>
        </section>

        <section className="f1-cover-panel">
          <p className="f1-kicker">Ready Room</p>
          <h2>先上车，再进测试</h2>
          <p>题目会在下一页开始。准备好之后进入答题区，40 道情境题会把你匹配到 22 位车手之一。</p>
          <p>欢迎提供各类建议和想法，请联系 xhs：SYY%</p>
        </section>
      </main>
    </div>
  );
}
