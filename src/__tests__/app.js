import { render,screen } from "@testing-library/react";
import App from "../App";
import { __esModule } from "@testing-library/jest-dom/dist/matchers";

jest.mock('../components/Header',()=>({
    __esModule:true,
    default:()=><div data-testid='header-mock'>Header mock</div>
}))
jest.mock('../components/Footer',()=>({
    __esModule:true,
    default:()=><div data-testid='footer-mock'>Footer mock</div>
}))

describe('app component',()=>{
    test('render app page',async()=>{
        render(<App/>)
        const appRef = await screen.findByTestId('app')
        expect(appRef).toBeInTheDocument()
    })
    test('render header footer menu',async()=>{
        render(<App/>)
        const headerRef = await screen.findByTestId('header-mock')
        expect(headerRef.textContent).toBe("Header mock")

        const footerRef = await screen.findByTestId('footer-mock')
        expect(footerRef.textContent).toBe("Footer mock")
    })
})