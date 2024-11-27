import { render,screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("footer component",()=>{
    test('render footer',async ()=>{
        render(<Footer/>)
        const footerRef =await screen.findByTestId("footer")
        expect(footerRef).toBeInTheDocument()
    })
    test('footer text',async()=>{
        render(<Footer/>)
        const footer =await screen.findByTestId('footer')
        expect(footer.textContent).toBe("copy rights belongs to sivakumar setti")
    })
})