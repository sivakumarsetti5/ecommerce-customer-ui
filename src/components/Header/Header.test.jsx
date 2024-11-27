import { render,screen } from "@testing-library/react";
import { Header } from "./Header";

describe("header component",()=>{
    test('render header',async()=>{
        render(<Header/>)
        const headerRef = await screen.findByTestId("header")
        expect(headerRef).toBeInTheDocument()
    })
    test('image checking',async()=>{
        render(<Header/>)
        const logoRef = await screen.getByRole("img",{src:"eCart_logo.png"})
        expect(logoRef).toBeInTheDocument()
    })
})