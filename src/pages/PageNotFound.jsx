import SiteNav from "../components/site/SiteNav/SiteNav";

export default function PageNotFound() {
  return (
    <section>
      <SiteNav />
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "black",
          fontSize: "22px",
        }}
      >
        <h1>Page not found 😢</h1>
      </div>
    </section>
  );
}
