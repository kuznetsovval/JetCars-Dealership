import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/Input";
import '@testing-library/jest-dom';

describe("Input Component", () => {
    test("should render input with correct placeholder", () => {
        render(<Input type="text" placeholder="Enter your name" setState={() => {}} />);

        const inputElement = screen.getByPlaceholderText("Enter your name");
        expect(inputElement).toBeInTheDocument();
    });

    test("should handle text input change", () => {
        const mockSetState = jest.fn();
        render(<Input type="text" placeholder="Enter your name" setState={mockSetState} />);

        const inputElement = screen.getByPlaceholderText("Enter your name");
        fireEvent.change(inputElement, { target: { value: "John Doe" } });

        expect(mockSetState).toHaveBeenCalledWith("John Doe");
    });

    test("should toggle password visibility", () => {
        render(<Input type="password" placeholder="Enter your password" setState={() => {}} />);

        const eyeIcon = screen.getByRole("button");
        expect(eyeIcon).toBeInTheDocument();

        fireEvent.click(eyeIcon);
        expect(eyeIcon).toHaveAttribute("alt", "Приховати пароль");

        fireEvent.click(eyeIcon);
        expect(eyeIcon).toHaveAttribute("alt", "Показати пароль");
    });
});
