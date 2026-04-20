import { BrowserRouter } from "react-router-dom";
import {
    Navbar,
    Hero,
    About,
    Skills,
    Projects,
    Experience,
    Contact,
    Footer,
} from "./components";

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[var(--color-primary)] transition-colors duration-300">
                {/* Fixed navbar */}
                <Navbar />

                {/* Main content */}
                <main>
                    {/* Hero — full viewport, no section padding wrapper */}
                    <Hero />

                    {/* Wrapped sections */}
                    <About />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Contact />
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
