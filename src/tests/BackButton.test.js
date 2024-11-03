import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("BackButton Component", () => {
    test("should render the back button with correct image", () => {
        render(
            <MemoryRouter>
                <BackButton src="path/to/image.png" />
            </MemoryRouter>
        );

        const imgElement = screen.getByRole("img");
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", "path/to/image.png");
    });

    test("should navigate back when button is clicked", () => {
        const mockNavigate = jest.fn();
        useNavigate.mockImplementation(() => mockNavigate);

        render(
            <MemoryRouter>
                <BackButton src="path/to/image.png" />
            </MemoryRouter>
        );

        const imgElement = screen.getByRole("img");
        fireEvent.click(imgElement);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
