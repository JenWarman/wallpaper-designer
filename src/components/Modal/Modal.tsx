import { useNavigate } from "react-router";
import { dataTestIds } from "../../utils/dataTestIds";
import { Cta } from "../Cta/Cta";
import { PatternDesign } from "../PatternDesign/PatternDesign";
import styles from "./Modal.module.scss";

type ModalProps = {
  url: string;
  design: {
    theme: string;
    motif: string;
    scale: string;
    colour: string;
    repeat: string;
  };
};

export function Modal({ url, design }: ModalProps) {
  const navigate = useNavigate();

  const handleOrderDesign = () => {
    console.log("order me!");
    //navigate to order page with design config
  };
  return (
    <div className={styles.modal__container}>
      <h1 className={styles.modal__heading}>Your Designs</h1>
      <div className={styles.modal__pattern}>
        <PatternDesign design={design} component="saved" />
      </div>

      <div className={styles.modal__ctas}>
        <Cta
          label="Edit"
          ariaLabel="edit your design"
          type="button"
          dataTestId={dataTestIds.cta}
          ctaFunction={() => navigate(`/design?${url}`)}
        />
        <Cta
          label="Order"
          ariaLabel="order your design"
          type="button"
          dataTestId={dataTestIds.cta}
          ctaFunction={handleOrderDesign}
        />
      </div>
    </div>
  );
}
