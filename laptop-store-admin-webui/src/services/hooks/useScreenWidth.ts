import { useState, useEffect } from "react";

function useScreenWidth() {
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
}

export default useScreenWidth;
