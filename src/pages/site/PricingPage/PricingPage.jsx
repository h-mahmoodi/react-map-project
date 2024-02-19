// Uses the same styles as Product
import styles from "./PricingPage.module.css";
import image from "../../../assets/images/img-2.jpg";

export default function Product() {
  return (
    <main className={styles.product}>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <img src={image} alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
