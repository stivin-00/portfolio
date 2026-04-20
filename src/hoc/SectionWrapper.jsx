import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) => {
    const HOC = (props) => (
        <motion.section
            id={idName}
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="py-20 section-padding"
        >
            <Component {...props} />
        </motion.section>
    );
    HOC.displayName = `SectionWrapper(${Component.displayName || Component.name})`;
    return HOC;
};

export default SectionWrapper;
