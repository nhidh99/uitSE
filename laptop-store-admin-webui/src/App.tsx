import React from "react";
import "tailwindcss/tailwind.css";
import Banner from "./components/Banner";
import Routes from "./routes/Routes";

export default function App() {
    return (
        <>
            <Banner />
            <main className="flex flex-grow">
                <Routes />
            </main>
        </>
    );
}
